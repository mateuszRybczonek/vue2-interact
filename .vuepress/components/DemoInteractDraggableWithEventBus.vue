<template>
  <div class="container">
    <section class="draggable-container">
      <Vue2InteractDraggable
        v-if="isShowing"
        class="card"
        @draggedDown="draggedDown"
        @draggedLeft="draggedLeft"
        @draggedRight="draggedRight"
        @draggedUp="draggedUp"
        :interact-event-bus-events="$options.static.interactEventBusEvents"
      >
        <div>
          <h3 class="card__title">Drag me!</h3>
        </div>
      </Vue2InteractDraggable>
    </section>
    <section class="buttons">
      <BaseButton
        class="event-button"
        @click="dragLeft"
        label="⇦"
      />

      <BaseButton
        class="event-button"
        @click="dragDown"
        label="⇩"
      />

      <BaseButton
        class="event-button"
        @click="dragRight"
        label="⇨"
      />
        
      <BaseButton
        class="event-button"
        @click="dragUp"
        label="⇧"
      />
    </section>
  </div>
</template>

<script>
import InteractEventBus from '../../src/interact-event-bus.js';

export default {
  static: {
    interactEventBusEvents: {
      draggedDown: 'INTERACT_DRAGGED_DOWN',
      draggedLeft: 'INTERACT_DRAGGED_LEFT',
      draggedRight: 'INTERACT_DRAGGED_RIGHT',
      draggedUp: 'INTERACT_DRAGGED_UP',
    },
  },

  data() {
    return { 
      isShowing: true,
    }
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
    },

    dragDown() {
      InteractEventBus.$emit(this.$options.static.interactEventBusEvents.draggedDown);
    },

    dragLeft() {
      InteractEventBus.$emit(this.$options.static.interactEventBusEvents.draggedLeft);
    },

    dragRight() {
      InteractEventBus.$emit(this.$options.static.interactEventBusEvents.draggedRight);
    },

    dragUp() {
      InteractEventBus.$emit(this.$options.static.interactEventBusEvents.draggedUp);
    },
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
  margin: auto;
}

.card {
  @include card();
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.event-button {
  margin: 0 20px;
}
</style>