export default (Vue, options, { head, router }) => {
  const { trackPage = true, prodKey, devKey, debug } = options

  if (process.isClient) {
    // ensures Segment write key is present
    if (!prodKey || prodKey.length < 10) { console.error('segment prodKey must be at least 10 char in length') }

    // if dev key is present, ensures it is at least 10 car in length
    if (devKey && devKey.length < 10) { console.error('if present, devKey must be at least 10 char in length') }

    // use prod write key when in prod env, else use dev write key
    // note below, snippet wont render unless writeKey is truthy
    const writeKey = process.env.NODE_ENV === 'production' ? prodKey : devKey
    head.script.push({
      src: `https://cdn.segment.com/analytics.js/v1/${writeKey}/analytics.min.js`,
      body: true
    })

    const analytics = window.analytics = window.analytics || []
    if (!analytics.initialize) {
      if (analytics.invoked) window.console && console.error && console.error('Segment snippet included twice.')
      else {
        analytics.invoked = true
        analytics.methods = ['trackSubmit', 'trackClick', 'trackLink', 'trackForm', 'pageview', 'identify', 'reset', 'group', 'track', 'ready', 'alias', 'debug', 'page', 'once', 'off', 'on']
        analytics.factory = function (t) {
          return function () {
            var e = Array.prototype.slice.call(arguments)
            e.unshift(t)
            analytics.push(e)
            return analytics
          }
        }
        for (var t = 0; t < analytics.methods.length; t++) {
          var e = analytics.methods[ t ]
          analytics[ e ] = analytics.factory(e)
        }

        analytics.SNIPPET_VERSION = '4.1.0'
      }
    }

    if (trackPage) {
      router.afterEach((to, from) => {
        window.analytics.page(to.path || '', {
          path: to.fullPath,
          referrer: from.fullPath
        })
      })
    }
  }
}

export const defaultOptions = () => ({
  prodKey: '',
  devKey: '',
  trackPage: true,
  debug: false
})
