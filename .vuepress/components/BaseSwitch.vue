<template>
  <div class="switch-container">
    <span class="switch-label" :class="{ isSelected: checked }">{{ label }}</span>
    <span
      class="switch"
    >
      <input
        class="switchInput"
        :checked="checked"
        type="checkbox"
      >
      <span
        ref="interactElement"
        class="switchHandle"
      />
    </span>
  </div>
</template>

<script>
import interact from 'interact.js';

export default {
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: ''
    },
  },

  data() {
    return {
      value: null,
    };
  },

  watch: {
    value(value) {
      this.$emit('change', value);
    },
    checked(value) {
      this.value = value;
    },
  },

  beforeMount() {
    this.value = this.checked;
  },

  mounted() {
    this.$emit('change', this.value);

    interact(this.$refs.interactElement)
      .draggable({
        onmove: (event) => {
          if (event.dx > 0 && this.value !== true) this.value = true;
          if (event.dx < 0 && this.value !== false) this.value = false;
        },
      })
      .on('tap', () => { this.value = !this.value; });
  },
};
</script>

<style lang="scss" scoped>
@import "./styles/index.scss";

.switch-container {
  display: flex;
  align-items: center;
  max-width: 300px;
  justify-content: space-between;
}

.switch-label {
  margin-right: 10px;
  font-size: 14px;

  &.isSelected {
    color: $primary-gradient-end;
  }
}

.switch {
  @include sizing(52px 31px);

  position: relative;
  display: inline-block;

  &Handle {
    @include absolute(top 0 right 0 bottom 0 left 0);

    cursor: pointer;
    border-radius: 18px;
    background: grey;
    transition: 0.4s;

    @include before() {
      @include circle(26px);
      @include absolute(top 1px left 0);

      border: 1px solid $c-white;
      background-color: $c-white;
      transform: translateX(2px);
      transition: all 0.4s;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.5);
    }
  }

  &Input {
    display: none;

    &:checked + .switchHandle {
      background-color: $primary-gradient-end;
    }

    &:focus + .switchHandle {
      box-shadow: 0;
    }

    &:checked + .switchHandle::before {
      transform: translateX(22px);
    }
  }
}
</style>
