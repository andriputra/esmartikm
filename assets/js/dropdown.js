import tippy from 'tippy.js'
import isFunction from './utils/is-function'

/**
 * Constants
 */
const DEFAULT = {
  label: 'prev',
  showClass: 'dropdown--show',
  trigger: 'click',
  animation: 'shift-away',
  placement: 'bottom-start',
  offset: [0, 10],
  appendTo: '',
  onShown: '',
}

class Dropdown {
  constructor(element, options) {
    element =
      typeof element === 'string' ? document.querySelector(element) : element

    if (!element) {
      return
    }

    this._element = element
    this._options = { ...DEFAULT, ...options }
    this._labelElement = this.getLabelElement()
    this._tippy = tippy(this._labelElement, {
      content: this._element,
      theme: 'dropdown',
      interactive: true,
      trigger: this._options.trigger,
      animation: this._options.animation,
      placement: this._options.placement,
      offset: Array.isArray(this._options.offset)
        ? this._options.offset
        : this._options.offset.split(',').map(Number),
      ...(this._options.appendTo
        ? { appendTo: () => document.querySelector(this._options.appendTo) }
        : {}),
      ignoreAttributes: true,
      onShow: this.onShowHandler.bind(this),
      ...(isFunction(this._options.onShown)
        ? { onShown: this._options.onShown.bind(this) }
        : {}),
      onHide: this.onHideHandler.bind(this),
    })
  }

  getLabelElement() {
    if (this._options.label) {
      if (this._options.label === 'prev') {
        return this._element.previousElementSibling
      }

      return typeof this._options.label === 'string'
        ? document.querySelector(this._options.label)
        : this._options.label
    }
  }

  toggle() {
    // let's trust tippyJS to handle it
  }

  show() {
    this._tippy.show()
  }

  hide() {
    this._tippy.hide()
  }

  onShowHandler() {
    this._labelElement.classList.add('expanded')
    this._element.classList.add(this._options.showClass)
  }

  onHideHandler() {
    this._labelElement.classList.remove('expanded')
    this._element.classList.remove(this._options.showClass)
  }
}

export default Dropdown
