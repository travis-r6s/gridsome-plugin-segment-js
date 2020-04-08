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
        devKey: <segment-dev-key>,
        trackPage: true # Defaults to false - will automatically send page views,
        pageCategory: 'some-category' # Optional category value
      }
    }
  ]
}
```

You can also use `this.$segment` methods, for example `this.$segment.identify('user-id')` in a mounted hook.

## Configuration

This plugin can hook into Vue router to automatically track pages - you can enable this by setting the `trackPage` option to true.
Bear in mind that Gridsome does not add any page meta info to the router config, so it will use `document.title` etc in the track page options.

```js
...
  options: {
    trackPage: true
  }
...
```

If you want to manually track pages, you can use methods such as the below to track pages in the mounted hook:

```js
mounted () {
  this.$segment.page(this.$page.post.category, this.$page.post.title, {
    title: this.$metaInfo.title
  })
}
```

**Note**: Due to the way Gridsome navigates, `document.title` may show the title of the _previous_ page if you just use `this.$segment.page()`. Therefore it is suggested you either use a data property (i.e. `this.$page.post.title`), the `metaInfo` title (if specified: `this.$metaInfo.title`) or set a timeout to allow the page title time to change (`setTimeout(() => this.$segment.page(), 1500)`).
