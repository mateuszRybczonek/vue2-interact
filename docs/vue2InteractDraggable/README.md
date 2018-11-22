# vue2-interact-draggable

> interact.js draggable wrapper component for Vue.js

## Basic usage

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
  :interact-max-rotation="15"
  :interact-out-of-sight-x-coordinate="500"
  :interact-x-threshold="200"
>
  <div>
    <h3>Drag me!</h3>
  </div>
</Vue2InteractDraggable>
```

### 3. Demo

<DemoInteractDraggable />

[Sandbox demo](https://codesandbox.io/s/n34kv9n2wp)

## Event bus usage
Using event bus allows us to fire the `Vue2InteractDraggable` component methods from the outside of the component. 

The component accepts `interact-event-bus-events` property tells `Vue2InteractDraggable` component to listen to those events and fire appropriate method when needed.

Available events:
  - `draggedDown`
  - `draggedLeft`
  - `draggedRight`
  - `draggedUp`

By emitting appropriate event in the event bus we can trigger the method from anywhere in the application.

### 1. Import component and event bus
```js
import Vue from 'vue'
import { Vue2InteractDraggable, InteractEventBus } from 'vue2-interact'

export default {
  components: {
    Vue2InteractDraggable
  }
}
```

### 2. Use component
```html
<Vue2InteractDraggable
  @draggedLeft="draggedLeft"
  :interact-event-bus-events="interactEventBusEvents"
  v-if="isShowing"
  class="card isCurrent"
>
  <div>
    <h3 class="cardTitle">Drag me!</h3>
  </div>
</Vue2InteractDraggable>

<BaseButton @click="dragLeft" label="⇦" />
```

```js
<script>
const INTERACT_DRAGGED_LEFT = 'INTERACT_DRAGGED_LEFT';

export default {
  data() {
    return {
      isShowing: true,
      interactEventBusEvents: {
        draggedLeft: INTERACT_DRAGGED_LEFT,
      },
    };
  },

  methods: {
    dragLeft() {
      InteractEventBus.$emit(INTERACT_DRAGGED_LEFT);
    },
  }
};
</script>
```

### 3. Demo

<DemoInteractDraggableWithEventBus />

[Sandbox demo](https://codesandbox.io/s/5wo373kqwk)

## Listeners

### draggedRight

Function fired when element is dragged right from its original position by distance specified in `interact-x-threshold` property.

### draggedLeft

Function fired when element is dragged left from its original position by distance specified in `interact-x-threshold` property.

### draggedUp

Function fired when element is dragged up from its original position by distance specified in `interact-y-threshold` property.

### draggedDown

Function fired when element is dragged down from its original position by distance specified in `interact-y-threshold` property.

## Properties

### interact-block

- type: Boolean
- default: false

- available types:
  - `interact-block-drag-down`
  - `interact-block-drag-up`
  - `interact-block-drag-left`
  - `interact-block-drag-right`

Prevent an event from being fired when the element is dragged in certain direction.

### interact-max-rotation

- type: Number
- default: 0

Specify maximum rotation in degrees to which the element is rotated during horizontal drag.

### interact-lock

- type: Boolean
- default: false

- available types:
  - `interact-lock-x-axis`
  - `interact-lock-y-axis`
  - `interact-lock-swipe-down`
  - `interact-lock-swipe-up`
  - `interact-lock-swipe-left`
  - `interact-lock-swipe-right`

Prevent swiping in specified axis or direction.

### interact-x-threshold

- type: Number
- default: 200

Horizontal (X) distance to which the element must be dragged to fire the appropriate event.

### interact-y-threshold

- type: Number
- default: 300

Vertical (Y) distance to which the element must be dragged to fire the appropriate event.

### interact-out-of-sight-x-coordinate

- type: Number
- default: 500

Horizontal (X) distance to which the element will be moved when horizontal (X) threshold is met at the end of drag.

### interact-out-of-sight-y-coordinate

- type: Number
- default: 1000

Vertical (Y) distance to which the element will be moved when vertical (Y) threshold is met at the end of drag.

### interactEventBusEvents

- type: Object
- default: {}

Allows to fire the `Vue2InteractDraggable` component methods from the outside of the component.
