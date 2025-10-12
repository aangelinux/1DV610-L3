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
			document.addEventListener("choices-submitted", (event) => {
				this.#setTitle(event.detail.title)
				this.#displayChart(event.detail)
			}, { signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#setTitle(content) {
			this.#chartConfig.title = content
		}

		#displayChart(options) {
			try {
				this.#chartContainer.appendChild(this.#createChart(options))
				this.#hideError()
				this.#showInfo()
			} catch (error) {
				console.error(error.message)
				this.#hideInfo()
				this.#showError()
			}
		}

		#createChart(options) {
			let chart
			if (options.chart === "Bar Chart") {
				chart = this.chart.createBarChart(options.data, this.#chartConfig.linear)
			} else if (options.chart === "Line Graph") {
				chart = this.chart.createLineGraph(options.data, this.#chartConfig.linear)
			} else if (options.chart === "Pie Chart") {
				chart = this.chart.createPieChart(options.data, this.#chartConfig.radial)
			}
			return chart
  	}

		#showInfo() {
			this.shadowRoot.querySelector("#info").style.display = "block"
		}

		#hideInfo() {
			this.shadowRoot.querySelector("#info").style.display = "none"
		}

		#showError() {
			this.shadowRoot.querySelector("#error").style.display = "block"
		}

		#hideError() {
			this.shadowRoot.querySelector("#error").style.display = "none"
		}
	}
)