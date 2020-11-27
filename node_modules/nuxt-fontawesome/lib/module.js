const { resolve } = require('path')

module.exports = async function module (moduleOptions) {
  const defaults = {
    component: '',
    suffix: '',
    imports: []
  }
  const options = Object.assign(defaults, this.options.fontawesome, moduleOptions)

  if (!options.component || options.suffix) {
    options.suffix = '-icon'
  }
  options.component = options.component || 'font-awesome'

  this.options.css.unshift('@fortawesome/fontawesome-svg-core/styles.css')
  this.addPlugin({
    src: resolve(__dirname, './templates/plugin.js'),
    options
  })
}
