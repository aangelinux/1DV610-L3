/**
 * @module Defines a web-component for displaying charts.
 * @file src/components/chart-display.js
 */

import { template } from "./chart-display-template"
import { Chart } from "@aangelinux/charts"
import { ChartConfig } from "../config/charts.js"

customElements.define("chart-display",
  class extends HTMLElement {
		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))
    }
  }
)