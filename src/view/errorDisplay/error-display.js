/**
 * @module Defines a web-component for displaying user-friendly errors.
 */

import { template } from "./error-display-template.js"

customElements.define("error-display",
  class extends HTMLElement {
		#errorDisplay

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.#errorDisplay = this.shadowRoot.querySelector("#error")
		}

		connectedCallback() {
			this.#show()
		}

		disconnectedCallback() {
		}

		#show() {
			this.#errorDisplay.style.display = "block"
		}
	}
)