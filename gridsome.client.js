import VueSegmentAnalytics from 'vue-segment-analytics'
export default (Vue, options, { isClient, router }) => {
  const { trackPage = false, pageCategory, prodKey, devKey } = options

  if (isClient) {
    // ensures Segment write key is present
    if (!prodKey || prodKey.length < 10) { console.error('segment prodKey must be at least 10 char in length') }

    // if dev key is present, ensures it is at least 10 car in length
    if (devKey && devKey.length < 10) { console.error('if present, devKey must be at least 10 char in length') }

    // use prod write key when in prod env, else use dev write key
    // note below, snippet wont render unless writeKey is truthy
    const writeKey = process.env.NODE_ENV === 'production' || !devKey ? prodKey : devKey

    Vue.use(VueSegmentAnalytics, { id: writeKey })
    
    if (trackPage) {
      router.afterEach((to, from) => {
        setTimeout(() => this.$segment.page(pageCategory, to.name || '', {
          path: to.fullPath,
          referrer: from.fullPath
        }), 1500)
      })
    }
  }
}

export const defaultOptions = () => ({
  prodKey: '',
  devKey: '',
  trackPage: true
})
