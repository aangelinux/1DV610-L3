/**
 * @module Defines a web-component for handling user controls.
 */

import { template } from "./user-controls-template"

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
				this.#emitChoices()
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

		#emitChoices() {
			const event = new CustomEvent("choices-submitted", {
				detail: {
					dataset: this.#options.dataset,
					filter: this.#options.filter,
					chartType: this.#options.chart
				},
				bubbles: true })

			this.dispatchEvent(event)
		}
	}
)