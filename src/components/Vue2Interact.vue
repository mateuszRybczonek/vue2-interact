<template>
  <div
    ref="interactElement"
    :class="{ 'vue-interact-animated': interactAnimating }"
    :style="{ transform: interactTransformString, transition: interactTransitionString }"
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
    interactEventBusEvents: {
      type: Object,
      default: () => {},
    }
  },

  data() {
    return {
      interactAnimating: true,
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
      if (!this.interactAnimating || this.interactDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    },

    interactTransitionString() {
      if (this.interactAnimating) return 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      return null;
    },
  },

  mounted() {
    if (this.interactEventBusEvents && Object.keys(this.interactEventBusEvents).length === 0) {
      if (this.interactEventBusEvents.draggedDown) {
        InteractEventBus.$on(this.interactEventBusEvents.draggedDown, this.draggedDown);
      };

      if (this.interactEventBusEvents.draggedDown) {
        InteractEventBus.$on(this.interactEventBusEvents.draggedLeft, this.draggedLeft);
      };

      if (this.interactEventBusEvents.draggedDown) {
        InteractEventBus.$on(this.interactEventBusEvents.draggedRight, this.draggedRight);
      };

      if (this.interactEventBusEvents.draggedDown) {
        InteractEventBus.$on(this.interactEventBusEvents.draggedUp, this.draggedUp);
      };
    }

    const element = this.$refs.interactElement;

    interact(element).draggable({
      onstart: () => {
        this.interactAnimating = false;
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
        const cardPositionX = this.interactPosition.x;
        const { interactXThreshold, interactYThreshold } = this.$options;
        this.interactAnimating = true;

        if (cardPositionX > interactXThreshold) this.draggedRight();
        else if (cardPositionX < -interactXThreshold) this.draggedLeft();
        else if (this.interactPosition.y > interactYThreshold) this.draggedDown();
        else this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
      },
    });
  },

  beforeDestroy() {
    if (this.interactEventBusEvents && Object.keys(this.interactEventBusEvents).length === 0) {
      if (this.interactEventBusEvents.draggedDown) {
        InteractEventBus.$off(this.interactEventBusEvents.draggedDown, this.draggedDown);
      };

      if (this.interactEventBusEvents.draggedDown) {
        InteractEventBus.$off(this.interactEventBusEvents.draggedLeft, this.draggedLeft);
      };

      if (this.interactEventBusEvents.draggedDown) {
        InteractEventBus.$off(this.interactEventBusEvents.draggedRight, this.draggedRight);
      };

      if (this.interactEventBusEvents.draggedDown) {
        InteractEventBus.$off(this.interactEventBusEvents.draggedUp, this.draggedUp);
      };
    }
  },

  methods: {
    draggedDown() {
      if (!this.interactIsCurrent) return;
      this.interactUnsetElement();
      this.interactSetPosition({ y: this.$options.interactOutOfSightYCoordinate });
      this.$emit('draggedDown');
    },

    draggedLeft() {
      if (!this.interactIsCurrent) return;
      this.interactUnsetElement();
      this.interactSetPosition({
        x: -this.$options.interactOutOfSightXCoordinate,
        rotation: -this.interactMaxRotation,
      });
      this.$emit('draggedLeft');
    },

    draggedRight() {
      if (!this.interactIsCurrent) return;
      this.interactUnsetElement();
      this.interactSetPosition({
        x: this.$options.interactOutOfSightXCoordinate,
        rotation: this.interactMaxRotation,
      });
      this.$emit('draggedRight');
    },

    draggedUp() {
      if (!this.interactIsCurrent) return;
      this.interactUnsetElement();
      this.interactSetPosition({ y: -this.$options.interactOutOfSightYCoordinate });
      this.$emit('draggedUp');
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
  },
};
</script>
