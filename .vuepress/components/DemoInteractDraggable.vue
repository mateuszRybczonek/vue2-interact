<template>
  <div class="container">
    <section class="draggable-container">
      <Vue2InteractDraggable
        ref="vue2-interact-draggable"
        @draggedDown="draggedDown"
        @draggedLeft="draggedLeft"
        @draggedRight="draggedRight"
        @draggedUp="draggedUp"
        :interact-block-drag-down="interactBlockDragDown"
        :interact-block-drag-left="interactBlockDragLeft"
        :interact-block-drag-right="interactBlockDragRight"
        :interact-block-drag-up="interactBlockDragUp"
        :interact-max-rotation="15"
        :interact-lock-x-axis="interactLockXAxis"
        :interact-lock-y-axis="interactLockYAxis"
        :interact-lock-swipe-down="interactLockSwipeDown"
        :interact-lock-swipe-left="interactLockSwipeLeft"
        :interact-lock-swipe-right="interactLockSwipeRight"
        :interact-lock-swipe-up="interactLockSwipeUp"
        :interact-out-of-sight-x-coordinate="500"
        :interact-x-threshold="200"
        v-if="isShowing"
        class="card isCurrent"
      >
        <div>
          <h3 class="cardTitle">Drag me!</h3>
        </div>
      </Vue2InteractDraggable>
    </section>
    <h3>Properties:</h3>
    <section class="switches">
      <article class="switches__article">
        <h4>interact-block</h4>
        <BaseSwitch
          class="property-switch"
          label="interact-block-drag-down"
          :checked="interactBlockDragDown === true"
          @change="interactBlockDragDown = $event"
        />
        <BaseSwitch
          class="property-switch"
          label="interact-block-drag-left"
          :checked="interactBlockDragLeft === true"
          @change="interactBlockDragLeft = $event"
        />
        <BaseSwitch
          class="property-switch"
          label="interact-block-drag-right"
          :checked="interactBlockDragRight === true"
          @change="interactBlockDragRight = $event"
        />
        <BaseSwitch
          class="property-switch"
          label="interact-block-drag-up"
          :checked="interactBlockDragUp === true"
          @change="interactBlockDragUp = $event"
        />
      </article>
      <article class="switches__article">
        <h4>interact-lock</h4>
        <BaseSwitch
          class="property-switch"
          label="interact-lock-x-axis"
          :checked="interactLockXAxis === true"
          @change="interactLockXAxis = $event"
        />
        <BaseSwitch
          class="property-switch"
          label="interact-lock-y-axis"
          :checked="interactLockYAxis === true"
          @change="interactLockYAxis = $event"
        />
      </article>
      <article class="switches__article">
        <h4>interact-lock-swipe</h4>
        <BaseSwitch
          class="property-switch"
          label="interact-lock-swipe-down"
          :checked="interactLockSwipeDown === true"
          @change="interactLockSwipeDown = $event"
        />
        <BaseSwitch
          class="property-switch"
          label="interact-lock-swipe-left"
          :checked="interactLockSwipeLeft === true"
          @change="interactLockSwipeLeft = $event"
        />
        <BaseSwitch
          class="property-switch"
          label="interact-lock-swipe-right"
          :checked="interactLockSwipeRight === true"
          @change="interactLockSwipeRight = $event"
        />
        <BaseSwitch
          class="property-switch"
          label="interact-lock-swipe-up"
          :checked="interactLockSwipeUp === true"
          @change="interactLockSwipeUp = $event"
        />
      </article>
    </section>
  </div>

</template>

<script>
export default {
  props: {
    isSkipDisabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isShowing: true,
      interactBlockDragDown: false,
      interactBlockDragLeft: false,
      interactBlockDragRight: false,
      interactBlockDragUp: false,
      interactLockXAxis: false,
      interactLockYAxis: false,
      interactLockSwipeDown: false,
      interactLockSwipeLeft: false,
      interactLockSwipeRight: false,
      interactLockSwipeUp: false,
    };
  },

  methods: {
    draggedDown() {
      console.log('dragged down!')
      this.hideCard();
    },

    draggedLeft() {
      console.log('dragged left!')
      this.hideCard();
    },

    draggedRight() {
      console.log('dragged right!')
      this.hideCard();
    },

    draggedUp() {
      console.log('dragged down!')
      this.hideCard();
    },

    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
      }, 200);
      setTimeout(() => {
        this.isShowing = true;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";

$cardsTotal: 3;
$cardsWidth: 300px;
$cardsPositionOffset: 55vh * 0.06;
$cardsScaleOffset: 0.08;
$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
$fs-card-title: 1.125em;

.container {
  margin-top: 100px;
}

.draggable-container {
  @include sizing(300px);

  display: flex;
  margin: auto;
}

.switches {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &__article {
    margin-right: 30px;
  }
}

.property-switch {
  margin-top: 5px;
}

.card {
  @include card();
  @include absolute(0);
  @include sizing(200px);
  @include flex-center();

  display: flex;
  max-height: 200px;
  margin: auto;
  font-size: $fs-h2;
  font-weight: $fw-bold;
  color: $c-white;
  background-image: linear-gradient(
    -180deg,
    $primary-gradient-start 2%,
    $primary-gradient-end 100%
  );
  opacity: 1;
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;

  height: 100vw;

  &.isCurrent {
    pointer-events: auto;
  }

  &.isAnimating {
    transition: transform 0.7s $ease-out-back;
  }
}

.cardTitle {
  margin: 0 0 15px;
  font-size: $fs-card-title;
}

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    z-index: $cardsTotal - $index;
    opacity: 1;
    transform: translateY($translation) scale($scale);

    @if $i == 3 {
      color: $c-red-25;
      background-color: $c-red-25;
    } @else if $i == 2 {
      color: $c-red-50;
      background-color: $c-red-50;
    }

    @if $i != 1 {
      background-image: none;

      @include after() {
        @include sizing(0 0);
      }
    }
  }
}
</style>