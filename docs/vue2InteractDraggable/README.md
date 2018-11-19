# vue2-interact-draggable

> interact.js draggable wrapper component for Vue.js

## Usage

### 1. Import component
```js
import Vue from 'vue'
import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  components: {
    Vue2InteractDraggable
  }
}
```

### 2. Use component
```html
<Vue2InteractDraggable
  @draggedRight="draggedRight"
  :interact-block-drag-down="isDragDownDisabled"
  :interact-max-rotation="15"
  :interact-event-bus-events="isCurrent ? interactEventBusEvents : null"
  :interact-lock-y-axis="true"
  :interact-lock-swipe-down="true"
  :interact-out-of-sight-x-coordinate="1000"
  :interact-x-threshold="200"
>
  <div>
    <h3>Element Title</h3>
  </div>
</Vue2InteractDraggable>
```
