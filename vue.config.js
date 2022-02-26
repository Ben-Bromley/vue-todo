module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuetilities/'
    : '/',
  assetsDir: process.env.NODE_ENV === 'production'
    ? '/vuetilities/'
    : '/'
}