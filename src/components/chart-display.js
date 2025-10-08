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
			document.addEventListener("choices-submitted", (event) => this.#renderChart(event.detail),
				{ signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#renderTitle(data) {
			
		}

		#renderChart(data) {
			let chart
			const dataObjects = data.data
			const chartType = data.chart

			switch (chartType) {
				case "Bar Chart":
					chart = this.chart.createBarChart(dataObjects, this.#chartConfig.linear)
					break
				case "Line Graph":
					chart = this.chart.createLineGraph(dataObjects, this.#chartConfig.linear)
					break
				case "Pie Chart":
					chart = this.chart.createPieChart(dataObjects, this.#chartConfig.radial)
					break
			}

			this.#chartContainer.appendChild(chart)
		}
  }
)