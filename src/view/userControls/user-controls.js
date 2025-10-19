/**
 * @module Defines a web-component for handling user choices.
 */

import { template } from "./user-controls-template"

customElements.define("user-controls",
	class extends HTMLElement {
		#datasets
		#datasetButton
		#filters
		#filterButton
		#chartButtons
		#userChoices = {
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

		#saveUserChoice(key, choice) {
			this.#userChoices[key] = choice.innerText
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
			for (const key in this.#userChoices) {
				if (!this.#userChoices[key]) {
					alert(`Please choose a ${key}.`)
					return false
				}
			}
			return true
		}

		#emitChoices() {
			const event = new CustomEvent("choices-submitted", {
				detail: {
					dataset: this.#userChoices.dataset,
					filter: this.#userChoices.filter,
					chartType: this.#userChoices.chart
				},
				bubbles: true })

			this.dispatchEvent(event)
		}
	}
)