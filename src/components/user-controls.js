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
		#regions
		#regionDropdown
		#buttons
		#choices = {
			dataset: "",
			filter: "",
			chart: ""
		}

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.#datasets = this.shadowRoot.querySelectorAll("#dataset p")
			this.#filters = this.shadowRoot.querySelectorAll("#filter p")
			this.#regions = this.shadowRoot.querySelectorAll("#region p")
			this.#regionDropdown = this.shadowRoot.querySelector("#regionDropdown")

			this.#buttons = this.shadowRoot.querySelectorAll(".chartbtn")

			this.dataParser = new DataParser()
			this.abortController = new AbortController()
		}

		connectedCallback() {
			this.#datasets.forEach((dataset) => {
				dataset.addEventListener("click", (event) => this.#choices.dataset = event.target.innerText,
			{ signal: this.abortController.signal })})
			
			this.#filters.forEach((filter) => { 
				filter.addEventListener("click", (event) => {  // TODO extract into separate method
					if (event.target.innerText === "Region") {
						this.#regionDropdown.style.display = "block"
					} else {
						this.#choices.filter = event.target.innerText
					}}, { signal: this.abortController.signal })})

			this.#regions.forEach((region) => {
				region.addEventListener("click", (event) => this.#choices.filter = event.target.innerText,
			{ signal: this.abortController.signal })})

			this.#buttons.forEach((button) => {
				button.addEventListener("click", (event) => {  // TODO extract into separate method
					this.#choices.chart = event.target.innerText,
					this.#getData()
				}, { signal: this.abortController.signal })})
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#getData() {
			// TODO make sure methods are not called if dataset or filter is undefined

			this.dataParser.getDataFrom(this.#choices)
		}

		#emitEvent() {
			console.log(this.#choices)

			const event = new CustomEvent("choices-submitted", {
				detail: {
					data,
					chartType
				}})

			this.dispatchEvent(event)
		}
	}
)