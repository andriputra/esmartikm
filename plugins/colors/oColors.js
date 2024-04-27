const _ = require('lodash')
const plugin = require('tailwindcss/plugin')
const colorable = require('colorable')
const flattenColorPalette = require('./flattenColorPalette')
const withAlphaVariable = require('./withAlphaVariable')
const toColorValue = require('./toColorValue')

module.exports = plugin(function ({
  theme,
  addComponents,
  corePlugins,
  variants,
}) {
  const colors = flattenColorPalette(theme('colors'))
  delete colors.transparent
  delete colors.current

  const getProperties = (value, key, colors) => {
    let bgProp = { 'background-color': toColorValue('transparent') }
    let borderProp = { 'border-color': toColorValue(value) }
    let colorProp = { color: toColorValue(value) }

    if (corePlugins('borderOpacity')) {
      bgProp = withAlphaVariable({
        color: value,
        property: 'background-color',
        variable: '--tw-bg-opacity',
      })

      borderProp = withAlphaVariable({
        color: value,
        property: 'border-color',
        variable: '--tw-border-opacity',
      })

      colorProp = withAlphaVariable({
        color: value,
        property: 'color',
        variable: '--tw-text-opacity',
      })
    }

    const props = {
      ...bgProp,
      '--tw-bg-opacity': 0,
      'border-width': 1,
      ...borderProp,
      ...colorProp,
    }

    return props
  }

  const newComponents = _.mapKeys(
    _.mapValues(colors, function (val, key) {
      return getProperties(val, key, theme('colors'))
    }),
    function (val, key) {
      return `.o-${key}`
    }
  )

  addComponents(newComponents, variants('borderColor'))
})
