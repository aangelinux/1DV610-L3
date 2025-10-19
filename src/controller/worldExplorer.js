/**
 * @module Orchestrates application flow via events.
 */

import "../view/userControls/user-controls.js"
import "../view/chartDisplay/chart-display.js"
import "../view/tableDisplay/table-display.js"
import "../view/errorDisplay/error-display.js"

export class WorldExplorer extends EventTarget {
	// TODO
	// Finish README (GIF, link)
	// Add jsdocs to public methods
	// Change .toFixed() to Math.round()
	// Add pipeline for automatic unit tests
	// Create 1-2 unit tests for controller
	// Add coverage report
	// Refactor L2, update reflections
	
	constructor(dependencies) {
		super()

		this.dataExtractor = dependencies.extractor
		this.dataFilter = dependencies.filter
		this.dataParser = dependencies.parser
		
		this.container = document.querySelector("#container")

		this.init()
	}

	init() {
		this.#addControls()
		this.#addChart()
		this.#addTable()

		document.addEventListener("choices-submitted", (event) => {
			this.#removeError() 
			this.#process(event.detail)})
		document.addEventListener("error", () => this.#showError())
	}

	#addControls() {
		const controls = document.createElement("user-controls")
		this.container.appendChild(controls)
	}

	#addChart() {
		const chart = document.createElement("chart-display")
		this.container.appendChild(chart)
	}

	#addTable() {
		const table = document.createElement("table-display")
		this.container.appendChild(table)
	}

	async #process(choices) {
		const { dataset, filter, chartType } = choices
		
		const fetchedData = await this.dataExtractor.extract(dataset)
		if (!fetchedData) {
			return this.#showError()
		}
		const data = this.#parse(fetchedData, choices)
		this.#emitData({ data, dataset, filter, chartType })
	}

	#parse(fetchedData, choices) {
		const filteredData = this.dataFilter.filter(fetchedData, choices.filter)
		const parsedData = this.dataParser.parse(filteredData, choices.dataset)
		return parsedData
	}

	#emitData(data) {
		const event = new CustomEvent("data-parsed", {
			detail: data,
			bubbles: true
		})
		document.dispatchEvent(event)
	}

	#showError() {
		const errorDisplay = document.createElement("error-display")
		this.container.querySelector("user-controls").after(errorDisplay)
	}

	#removeError() {
		const errorDisplay = this.container.querySelector("error-display")
		if (errorDisplay) {
			errorDisplay.remove()
		}
	}
}