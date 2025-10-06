/**
 * @module Defines a web-component for handling user controls.
 * @file src/components/user-controls.js
 */

import { template } from "./user-controls-template"

customElements.define("user-controls",
	class extends HTMLElement {
		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
		}
	}
)