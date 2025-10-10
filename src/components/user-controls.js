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
					this.#set("dataset", event.target)
					this.#display(event.target, this.#datasetButton)
				}, { signal: this.abortController.signal })})
			
			this.#filters.forEach((filter) => { 
				filter.addEventListener("click", (event) => {
					this.#set("filter", event.target)
					this.#display(event.target, this.#filterButton)
				}, { signal: this.abortController.signal })})

			this.#buttons.forEach((button) => {
				button.addEventListener("click", (event) => {
					this.#set("chart", event.target)
					this.#processOptions()
			}, { signal: this.abortController.signal })})
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#set(option, choice) {
			this.#options[option] = choice.innerText
		}

		#display(choice, button) {
			button.innerText = choice.innerText
		}

		#processOptions() {
			if (this.#optionsAreValid()) {
				this.#processEvent()
			}
		}

		#optionsAreValid() {
			for (const option in this.#options) {
				if (this.#options[option] === null) {
					alert(`Please choose a ${option}!`)
					return false
				}
			}
			return true
		}

		async #processEvent() {
			const data = await this.dataParser.process(this.#options)
			const title = `${this.#options.dataset}: ${this.#options.filter}`
			const chart = this.#options.chart

			this.#emitEvent({
				data,
				title,
				chart
			})
		}

		#emitEvent(details) {
			const event = new CustomEvent("options-submitted", {
				detail: details,
				bubbles: true
			})

			this.dispatchEvent(event)
		}
	}
)