/**
 * @module Defines a web-component for displaying charts.
 */

import { template } from "./chart-display-template.js"
import { Chart } from "@aangelinux/charts"
import { ChartConfig } from "../../config/charts.js"

customElements.define("chart-display",
  class extends HTMLElement {
		#chartConfig
		#chartContainer
		#infoContainer

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.#chartContainer = this.shadowRoot.querySelector("#chart")
			this.#infoContainer = this.shadowRoot.querySelector("#info")

			this.#chartConfig = new ChartConfig()
			this.chart = new Chart()
			this.abortController = new AbortController()
    }

		connectedCallback() {
			document.addEventListener("data-parsed", (event) => {
				this.#setTitle(event.detail)
				this.#update(event.detail)
			}, { signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#setTitle(choices) {
			const dataset = choices.dataset
			const scale = this.#chartConfig.scales[dataset]
			const filter = choices.filter

			const title = `${dataset} ${scale}: ${filter}`
			this.#chartConfig.title = title
		}

		#update(choices) {
			try {
				this.#renderChart(choices)
				this.#show()
			} catch (error) {
				console.error(error)
				this.#hide()
				this.#emitError()
			}
		}

		#renderChart(choices) {
			let chart
			if (choices.chartType === "Bar Chart") {
				chart = this.chart.createBarChart(choices.data, this.#chartConfig.linear)
			} else if (choices.chartType === "Line Graph") {
				chart = this.chart.createLineGraph(choices.data, this.#chartConfig.linear)
			} else if (choices.chartType === "Pie Chart") {
				chart = this.chart.createPieChart(choices.data, this.#chartConfig.radial)
			}
			this.#chartContainer.appendChild(chart)
  	}

		#show() {
			this.#chartContainer.style.display = "block"
			this.#infoContainer.style.display = "block"
		}

		#hide() {
			this.#chartContainer.style.display = "none"
			this.#infoContainer.style.display = "none"
		}

		#emitError() {
			const event = new CustomEvent("error", {
				detail: "Chart could not be rendered.",
				bubbles: true
			})
			this.dispatchEvent(event)
		}
	}
)