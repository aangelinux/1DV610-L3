/**
 * @module Defines a web-component for displaying tables.
 * @file src/components/table-display.js
 */

import { template } from "./table-display-template.js"

customElements.define("table-display",
  class extends HTMLElement {
		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
		}
	}
)