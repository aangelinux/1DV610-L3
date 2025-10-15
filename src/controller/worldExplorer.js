/**
 * @module Orchestrates application flow and delegates actions.
 */

import "../index.js"
import { DataParser } from "../model/dataParser.js"

class WorldExplorer extends EventTarget {
	// TODO need to write out that population values are in thousands
	// and GDP in billions
	// and emissions in .. something

	constructor() {
		super()

		this.dataParser = new DataParser()

		this.container = document.body.querySelector("div")
		this.init()
	}

	init() {
		this.#displayControls()
		this.#displayChart()
		this.#displayTable()

		document.addEventListener("choices-submitted", (event) => this.#choicesUpdated(event.detail))
		document.addEventListener("error", (event) => this.#displayError(event.detail))
	}

	#displayControls() {
		const controls = document.createElement("user-controls")
		this.container.appendChild(controls)
	}

	#displayChart() {
		const chart = document.createElement("chart-display")
		this.container.appendChild(chart)
	}

	#displayTable() {
		const table = document.createElement("table-display")
		this.container.appendChild(table)
	}

	#choicesUpdated(choices) {
		this.#removeError()
		
		const parsedData = this.#getData(choices)
		this.#emitDataEvent({
			data: parsedData,
			title: choices.title,
			chartType: choices.chartType,
			dataset: choices.dataset
		})
	}

	#getData(choices) {
		try {
			return this.dataParser.getParsedData(choices)
		} catch (e) {
			return this.#displayError()
		}
	}

	#emitDataEvent(choicesData) {
		const event = new CustomEvent("data-parsed", {
			detail: choicesData,
			bubbles: true
		})

		this.dispatchEvent(event)
	}

	#displayError(message) {
		const error = document.createElement("error-display")
		this.container.appendChild(error)
		
		error.show(message)
	}

	#removeError() {
		const error = this.container.getElementsByTagName("error-display")
		error.remove()
	}
}

new WorldExplorer()