/**
 * @module Defines a web-component for handling user controls.
 * @file src/components/user-controls.js
 */

import { template } from "./user-controls-template"
import { DataParser } from "../utils/dataParser"

customElements.define("user-controls",
	class extends HTMLElement {
		#datasets
		#filters
		#buttons
		#options = {
			dataset: null,
			filter: null,
			chart: null,
		}
		#datasetButton
		#filterButton

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.#datasets = this.shadowRoot.querySelectorAll("#dataset p")
			this.#filters = this.shadowRoot.querySelectorAll("#filter p")
			this.#buttons = this.shadowRoot.querySelectorAll(".chartbtn")

			this.#datasetButton = this.shadowRoot.querySelector("#datasetbtn")
			this.#filterButton = this.shadowRoot.querySelector("#filterbtn")

			this.dataParser = new DataParser()
			this.abortController = new AbortController()
		}

		connectedCallback() {
			this.#datasets.forEach((dataset) => {
				dataset.addEventListener("click", (event) => {
					this.#saveUserChoice("dataset", event.target)
					this.#updateDisplay(this.#datasetButton, event.target)
				}, { signal: this.abortController.signal })})
			
			this.#filters.forEach((filter) => { 
				filter.addEventListener("click", (event) => {
					this.#saveUserChoice("filter", event.target)
					this.#updateDisplay(this.#filterButton, event.target)
				}, { signal: this.abortController.signal })})

			this.#buttons.forEach((button) => {
				button.addEventListener("click", (event) => {
					this.#saveUserChoice("chart", event.target, )
					this.#validateUserChoices()
			}, { signal: this.abortController.signal })})
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#saveUserChoice(option, choice) {
			this.#options[option] = choice.innerText
		}

		#updateDisplay(button, choice) {
			button.innerText = choice.innerText
		}

		#validateUserChoices() {
			if (this.#choicesAreValid()) {
				this.#processChoices()
			}
		}

		#choicesAreValid() {
			for (const option in this.#options) {
				if (!this.#options[option]) {
					alert(`Please choose a ${option}.`)
					return false
				}
			}
			return true
		}

		async #processChoices() {
			const data = await this.dataParser.getParsedData(this.#options)
			const title = `${this.#options.dataset}: ${this.#options.filter}`
			const chart = this.#options.chart

			this.#emitEvent({
				data,
				title,
				chart
			})
		}

		#emitEvent(chartData) {
			const event = new CustomEvent("choices-submitted", {
				detail: chartData,
				bubbles: true
			})

			this.dispatchEvent(event)
		}
	}
)