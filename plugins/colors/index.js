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
    const result = colorable({ bg: value, white: 'white', black: 'black' })
    const [white, black] = _.first(result).combinations

    let contrastColor = '#fff'

    if (white.contrast > 2.5) {
      contrastColor = '#fff'
    } else if (black.contrast > 4.5) {
      const [color] = key.split('-')
      contrastColor = `${color}-700` in colors ? colors[`${color}-700`] : '#000'
    }

    let props = {
      '--text-color': toColorValue(value),
      '--border-color': toColorValue(value),
      '--background-color': toColorValue(value),
    }

    if (contrastColor) {
      Object.assign(props, {
        '--contrast-text-color': toColorValue(contrastColor),
        '--contrast-border-color': toColorValue(contrastColor),
        '--contrast-background-color': toColorValue(contrastColor),
      })
    }

    if (corePlugins('backgroundOpacity')) {
      props = {
        ...withAlphaVariable({
          color: value,
          property: '--text-color',
          variable: '--tw-text-opacity',
        }),
        ...withAlphaVariable({
          color: value,
          property: '--border-color',
          variable: '--tw-border-opacity',
        }),
        ...withAlphaVariable({
          color: value,
          property: '--background-color',
          variable: '--tw-bg-opacity',
        }),
      }

      if (contrastColor) {
        Object.assign(props, {
          ...withAlphaVariable({
            color: contrastColor,
            property: '--contrast-text-color',
            variable: '--tw-text-opacity',
          }),
          ...withAlphaVariable({
            color: contrastColor,
            property: '--contrast-border-color',
            variable: '--tw-border-opacity',
          }),
          ...withAlphaVariable({
            color: contrastColor,
            property: '--contrast-background-color',
            variable: '--tw-bg-opacity',
          }),
        })
      }
    }

    return props
  }

  const newComponents = _.mapKeys(
    _.mapValues(colors, function (val, key) {
      return getProperties(val, key, colors)
    }),
    function (val, key) {
      return `.${key}`
    }
  )

  addComponents(newComponents, variants('backgroundColor'))
})
