<template>
  <div class="container">
    <section class="draggable-container">
      <Vue2InteractDraggable
        class="card"
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
      >
        <div>
          <h3 class="card__title">Drag me!</h3>
        </div>
      </Vue2InteractDraggable>
    </section>
    <h3>Available properties:</h3>
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
  data() {
    return {
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

$cardsWidth: 200px;
$fs-card-title: 1.125em;

.container {
  margin-top: 100px;
}

.draggable-container {
  @include sizing($cardsWidth);

  display: flex;
  margin: auto auto 100px;
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
}
</style>