/**
 * @module Defines a web-component for displaying user-friendly errors.
 * @file src/components/error-display.js
 */

import { template } from "./error-display-template.js"

customElements.define("error-display",
  class extends HTMLElement {
		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.abortController = new AbortController()
		}

		connectedCallback() {
			document.addEventListener("error", (event) => {
				this.#displayError(event.detail)
			}, { signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#displayError(message) {
			
		}
	}
)