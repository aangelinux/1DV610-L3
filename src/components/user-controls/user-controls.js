/**
 * @module Defines a web-component for handling user controls.
 * @file src/components/user-controls.js
 */

import { template } from "./user-controls-template"
import { DataParser } from "../../utils/dataParser"

customElements.define("user-controls",
	class extends HTMLElement {
		#datasets
		#datasetButton
		#filters
		#filterButton
		#chartButtons
		#options = {
			dataset: null,
			filter: null,
			chart: null,
		}

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.#datasets = this.shadowRoot.querySelectorAll("#dataset p")
			this.#datasetButton = this.shadowRoot.querySelector("#datasetbtn")
			this.#filters = this.shadowRoot.querySelectorAll("#filter p")
			this.#filterButton = this.shadowRoot.querySelector("#filterbtn")
			this.#chartButtons = this.shadowRoot.querySelectorAll(".chartbtn")

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

			this.#chartButtons.forEach((button) => {
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
				this.#getData()
				this.#removeErrorMessage()
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

		async #getData() {
			try {
				const data = await this.dataParser.getParsedData(this.#options)
				this.#processChoices(data)
			} catch (e) {
				this.#showErrorMessage()
				return console.error(e.message)
			}
		}

		async #processChoices(data) {
			const title = `${this.#options.dataset}: ${this.#options.filter}`
			const chartType = this.#options.chart

			this.#emitEvent({
				data,
				title,
				chartType
			})
		}

		#emitEvent(choicesData) {
			const event = new CustomEvent("choices-submitted", {
				detail: choicesData,
				bubbles: true
			})

			this.dispatchEvent(event)
		}

		#showErrorMessage() {
			this.shadowRoot.querySelector("#error").style.display = "block"
		}

		#removeErrorMessage() {
			this.shadowRoot.querySelector("#error").style.display = "none"
		}
	}
)