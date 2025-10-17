/**
 * @module Orchestrates application flow via events.
 */

import "../view/userControls/user-controls.js"
import "../view/chartDisplay/chart-display.js"
import "../view/tableDisplay/table-display.js"
import "../view/errorDisplay/error-display.js"

export class WorldExplorer extends EventTarget {
	constructor(dependencies) {
		super()

		const { extractor, filter, parser } = dependencies
		this.dataExtractor = extractor
		this.dataFilter = filter
		this.dataParser = parser
		
		this.container = document.querySelector("#container")

		this.init()
	}

	init() {
		this.#addControls()
		this.#addChart()
		this.#addTable()

		document.addEventListener("choices-submitted", (event) => {
			this.#removeError() 
			this.#update(event.detail)})
		document.addEventListener("error", (event) => this.#showError(event.detail))
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

	async #update(choices) {
		const { dataset, filter, chartType } = choices

		const rawData = await this.#tryToExtract(dataset)
		const filteredData = this.dataFilter.filter(rawData, filter)
		const data = this.dataParser.parse(filteredData, dataset)
		
		this.#emitParsedData({ data, dataset, filter, chartType })
	}

	async #tryToExtract(dataset) {
		try {
			return await this.dataExtractor.extract(dataset)
		} catch (e) {
			this.#showError(e.message)
		}
	}

	#emitParsedData(data) {
		const event = new CustomEvent("data-parsed", {
			detail: data,
			bubbles: true
		})
		document.dispatchEvent(event)
	}

	#showError(message) {
		const error = document.createElement("error-display")
		this.container.children[1].before(error) // TODO fix
		error.show(message)
	}

	#removeError() {
		const error = this.container.querySelector("error-display")
		if (error) {
			error.remove()
		}
	}
}