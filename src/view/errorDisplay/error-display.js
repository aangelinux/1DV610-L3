/**
 * @module Defines a web-component for displaying user-friendly errors.
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
			this.#show()
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#show() {
			this.shadowRoot.querySelector("#error").style.display = "block"
		}
	}
)