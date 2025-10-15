/**
 * @module Defines a web-component for displaying charts.
 * @file src/components/chart-display.js
 */

import { template } from "./chart-display-template.js"
import { Chart } from "@aangelinux/charts"
import { ChartConfig } from "../../config/charts.js"

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

		#displayChart(choices) {
			try {
				this.#chartContainer.appendChild(this.#createChart(choices))
				this.#removeErrorMessage()
				this.#showChartInfo()
			} catch (error) {
				console.error(error.message)
				this.#removeChartInfo()
				this.#showErrorMessage()
			}
		}

		#createChart(choices) {
			let chart
			if (choices.chartType === "Bar Chart") {
				chart = this.chart.createBarChart(choices.data, this.#chartConfig.linear)
			} else if (choices.chartType === "Line Graph") {
				chart = this.chart.createLineGraph(choices.data, this.#chartConfig.linear)
			} else if (choices.chartType === "Pie Chart") {
				chart = this.chart.createPieChart(choices.data, this.#chartConfig.radial)
			}
			return chart
  	}

		#showChartInfo() {
			this.shadowRoot.querySelector("#info").style.display = "block"
		}

		#removeChartInfo() {
			this.shadowRoot.querySelector("#info").style.display = "none"
		}

		#showErrorMessage() {
			this.shadowRoot.querySelector("#error").style.display = "block"
		}

		#removeErrorMessage() {
			this.shadowRoot.querySelector("#error").style.display = "none"
		}
	}
)