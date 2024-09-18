import { Controller } from '@hotwired/stimulus'

export class Button extends Controller {
    static values = {
        loading: {
            default: true
        }
    }

    loadingAttribute = 'data-loading'
    spinnerSelector = '.spinner-absolute'
    spinnerHTML = `<span class="spinner spinner-absolute"></span>`

    connect() {
        this.observer = new MutationObserver(() => {
            if (this.element.hasAttribute(this.loadingAttribute)) {
                this.element.insertAdjacentHTML('beforeend', this.spinnerHTML)
            } else {
                this.element.querySelector(this.spinnerSelector).remove()
            }
        })

        this.loadingValue && this.observer.observe(this.element, {
            attributeFilter: [this.loadingAttribute]
        })
    }

    disconnect() {
        this.observer.disconnect()
    }

    async ripple({ currentTarget, offsetX, offsetY }) {
        const { showRipple } = await import('winduum/src/utilities/ripple')

        showRipple({
            element: currentTarget,
            x: offsetX,
            y: offsetY
        })
    }
}
