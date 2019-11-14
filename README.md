# gridsome-plugin-segment-js

> Add the Segment JS snippet to your Gridsome site.

## Installation

`yarn add gridsome-plugin-segment-js`

## Usage

`gridsome.config.js`
```js
module.exports = {
  plugins: [
    {
      use: 'gridsome-plugin-segment-js',
      options: {
        prodKey: <segment-prod-key>,
        devKey: <segment-dev-key>
      }
    }
  ]
}
```

You can also use `this.$segment` methods, for example `this.$segment.identify('user-id')` in a mounted hook.

## Configuration

By default `VueSegmentAnalytics` hooks into Vue router to automatically track pages, but you can disable this by setting the `trackPage` option to false.

```js
...
  options: {
    trackPage: false
  }
...
```
