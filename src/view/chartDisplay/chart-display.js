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
			document.addEventListener("data-parsed", (event) => {
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

		#displayChart(choices) { //Change name
			try {
				this.#chartContainer.appendChild(this.#createChart(choices)) //Fix
				this.#showChartInfo()
			} catch (error) {
				this.#chartContainer.style.display = "none"
				this.#emitErrorEvent()
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

		#showChart() {

		}

		#showChartInfo() {
			this.shadowRoot.querySelector("#info").style.display = "block"
		}

		#hideChart() {

		}

		#hideChartInfo() {
			
		}

		#emitErrorEvent() {
			const event = new CustomEvent("error", {
				detail: "Chart could not be rendered.",
				bubbles: true
			})

			this.dispatchEvent(event)
		}
	}
)