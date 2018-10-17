# vue2-interact

> Interact wrapper component for Vue.js apps

## Installation

```bash
yarn add vue2-interact
```

## Usage

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import Vue2Interact from 'vue2-interact'

export default {
  components: {
    Vue2Interact
  }
}
```

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<script src="vue2-interact/dist/vue2-interact.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/vue2-interact"></script>
```

## Development

### Launch visual tests

```bash
yarn watch
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
yarn build
```


## Publishing

The `prepare` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License

[MIT](http://opensource.org/licenses/MIT)
