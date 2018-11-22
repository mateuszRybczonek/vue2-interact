<template>
  <button
    class="button"
    :class="{ animate: clicked }"
    @click="click"
  >
    <span class="button__label">
      {{ label }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      clicked: false,
    };
  },

  methods: {
    click() {
      this.clicked = true;
      this.$emit('click');

      setTimeout(() => {
        this.clicked = false;
      }, 600);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";

.button {
  @include circle(50px);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  outline: none;
  justify-content: center;
  border: 1px solid $primary-gradient-end;
  background-color: transparent;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: $primary-gradient-end;

    .button__label {
      color: $c-white;
    }
  }

  &:global(.animate) {
    pointer-events: none;
    animation: scaleUpAndDown 0.6s;
    animation-timing-function: ease-in-out;
  }

  &__label {
    min-width: 50px;
    font-size: 32px;
    color: $primary-gradient-end;
  }
}
</style>
