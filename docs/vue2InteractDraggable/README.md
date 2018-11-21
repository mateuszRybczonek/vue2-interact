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

[Sandbox example](https://codesandbox.io/s/241qzvq41y)

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
