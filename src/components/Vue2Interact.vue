<template>
  <div
    ref="interactElement"
    :class="{ 'vue-interact-animated': interactIsAnimating }"
    :style="{
      transform: interactTransformString,
      transition: interactTransitionString
    }"
  >
    <slot />
  </div>
</template>

<script>
import interact from 'interact.js';
import InteractEventBus from '../interact-event-bus';

export default {
  interactOutOfSightXCoordinate: 500,
  interactOutOfSightYCoordinate: 1000,
  interactYThreshold: 300,
  interactXThreshold: 200,

  props: {
    interactBlockDragDown: {
      type: Boolean,
      default: false,
    },
    interactBlockDragLeft: {
      type: Boolean,
      default: false,
    },
    interactBlockDragRight: {
      type: Boolean,
      default: false,
    },
    interactBlockDragUp: {
      type: Boolean,
      default: false,
    },
    interactEventBusEvents: {
      type: Object,
      default: () => {},
    },
    interactIsCurrent: {
      type: Boolean,
      default: true,
    },
    interactMaxRotation: {
      type: Number,
      default: 0,
    },
    interactLockXAxis: {
      type: Boolean,
      default: false,
    },
    interactLockYAxis: {
      type: Boolean,
      default: false,
    },
    interactLockSwipeDown: {
      type: Boolean,
      default: false,
    },
    interactLockSwipeLeft: {
      type: Boolean,
      default: false,
    },
    interactLockSwipeRight: {
      type: Boolean,
      default: false,
    },
    interactLockSwipeUp: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      interactIsAnimating: true,
      interactDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0,
      },
    };
  },

  computed: {
    interactTransformString() {
      if (!this.interactIsAnimating || this.interactDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    },

    interactTransitionString() {
      if (this.interactIsAnimating) return 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      return null;
    },
  },

  watch: {
    interactEventBusEvents(val) {
      this.interactSetEventBusEvents();
    },
  },

  mounted() {
    this.interactSetEventBusEvents();

    const element = this.$refs.interactElement;

    interact(element).draggable({
      onstart: () => {
        this.interactIsAnimating = false;
      },

      onmove: (event) => {
        let x = 0;
        let y = 0;

        if (this.interactLockSwipeLeft && event.dx < 0) x = 0;
        else if (this.interactLockSwipeRight && event.dx > 0) x = 0;
        else x = this.interactLockXAxis ? 0 : (this.interactPosition.x || 0) + event.dx;

        if (this.interactLockSwipeUp && event.dy < 0) y = 0;
        else if (this.interactLockSwipeDown && event.dy > 0) y = 0;
        else y = this.interactLockYAxis ? 0 : (this.interactPosition.y || 0) + event.dy;

        let rotation = this.interactMaxRotation * (x / this.$options.interactXThreshold);

        if (rotation > this.interactMaxRotation) rotation = this.interactMaxRotation;
        else if (rotation < -this.interactMaxRotation) rotation = -this.interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x: cardPositionX, y: cardPositionY } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this.$options;
        this.interactIsAnimating = true;

        if (cardPositionX > interactXThreshold) this.interactDraggedRight();
        else if (cardPositionX < -interactXThreshold) this.interactDraggedLeft();
        else if (cardPositionY > interactYThreshold) this.interactDraggedDown();
        else this.interactResetCardPosition();
      },
    });
  },

  beforeDestroy() {
    this.interactUnsetEventBusEvents();
  },

  methods: {
    interactDraggedDown() {
      if (!this.interactIsCurrent) return;
      if (this.interactBlockDragDown) {
        this.interactResetCardPosition();
        return;
      }
      this.interactUnsetElement();
      this.interactSetPosition({ y: this.$options.interactOutOfSightYCoordinate });
      this.$emit('draggedDown');
    },

    interactDraggedLeft() {
      if (!this.interactIsCurrent) return;
      if (this.interactBlockDragLeft) {
        this.interactResetCardPosition();
        return;
      }
      this.interactUnsetElement();
      this.interactSetPosition({
        x: -this.$options.interactOutOfSightXCoordinate,
        rotation: -this.interactMaxRotation,
      });
      this.$emit('draggedLeft');
    },

    interactDraggedRight() {
      if (!this.interactIsCurrent) return;
      if (this.interactBlockDragRight) {
        this.interactResetCardPosition();
        return;
      }
      this.interactUnsetElement();
      this.interactSetPosition({
        x: this.$options.interactOutOfSightXCoordinate,
        rotation: this.interactMaxRotation,
      });
      this.$emit('draggedRight');
    },

    interactDraggedUp() {
      if (!this.interactIsCurrent) return;
      if (this.interactBlockDragUp) {
        this.interactResetCardPosition();
        return;
      }
      this.interactUnsetElement();
      this.interactSetPosition({ y: -this.$options.interactOutOfSightYCoordinate });
      this.$emit('draggedUp');
    },

    interactSetEventBusEvents() {
      if (this.interactEventBusEvents) {
        if (this.interactEventBusEvents.draggedDown) {
          InteractEventBus.$on(this.interactEventBusEvents.draggedDown, this.interactDraggedDown);
        };

        if (this.interactEventBusEvents.draggedLeft) {
          InteractEventBus.$on(this.interactEventBusEvents.draggedLeft, this.interactDraggedLeft);
        };

        if (this.interactEventBusEvents.draggedRight) {
          InteractEventBus.$on(this.interactEventBusEvents.draggedRight, this.interactDraggedRight);
        };

        if (this.interactEventBusEvents.draggedUp) {
          InteractEventBus.$on(this.interactEventBusEvents.draggedUp, this.interactDraggedUp);
        };
      }
    },

    interactSetPosition(coordinates) {
      const { x, y, rotation } = coordinates;

      if (Number.isFinite(x)) this.interactPosition.x = x;
      if (Number.isFinite(y)) this.interactPosition.y = y;
      if (Number.isFinite(rotation)) this.interactPosition.rotation = rotation;
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.interactDragged = true;
    },

    interactUnsetEventBusEvents() {
      if (this.interactEventBusEvents) {
        if (this.interactEventBusEvents.draggedDown) {
          InteractEventBus.$off(this.interactEventBusEvents.draggedDown, this.draggedDown);
        };

        if (this.interactEventBusEvents.draggedLeft) {
          InteractEventBus.$off(this.interactEventBusEvents.draggedLeft, this.draggedLeft);
        };

        if (this.interactEventBusEvents.draggedRight) {
          InteractEventBus.$off(this.interactEventBusEvents.draggedRight, this.draggedRight);
        };

        if (this.interactEventBusEvents.draggedUp) {
          InteractEventBus.$off(this.interactEventBusEvents.draggedUp, this.draggedUp);
        };
      }
    },

    interactResetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    }
  },
};
</script>
