/**
 * @module Defines a web-component for displaying charts.
 * @file src/components/chart-display.js
 */

import { template } from "./chart-display-template"
import { Chart } from "@aangelinux/charts"
import { ChartConfig } from "../config/charts.js"

customElements.define("chart-display",
  class extends HTMLElement {
		#chartConfig
		#chartContainer

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.#chartConfig = new ChartConfig()
			this.chart = new Chart()
			this.abortController = new AbortController()

			this.#chartContainer = this.shadowRoot.querySelector("#chart")
    }

		connectedCallback() {
			document.addEventListener("options-submitted", (event) => {
				this.#setTitle(event.detail.title)
				this.#renderChart(event.detail)
			}, { signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#setTitle(content) {
			this.#chartConfig.title = content
		}

		#renderChart(options) {
			let chart
			switch (options.chart) {
				default: case "Bar Chart":
					chart = this.chart.createBarChart(options.data, this.#chartConfig.linear)
					break
				case "Line Graph":
					chart = this.chart.createLineGraph(options.data, this.#chartConfig.linear)
					break
				case "Pie Chart":
					chart = this.chart.createPieChart(options.data, this.#chartConfig.radial)
					break
			}

			this.#chartContainer.appendChild(chart)
			this.#addInfo()
  	}

		#addInfo() {
			this.shadowRoot.querySelector("#info").style.display = "block"
		}
	}
)