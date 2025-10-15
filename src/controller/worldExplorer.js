/**
 * @module Orchestrates application flow and delegates actions.
 */

import "../view/userControls/user-controls.js"
import "../view/chartDisplay/chart-display.js"
import "../view/tableDisplay/table-display.js"
import "../view/errorDisplay/error-display.js"

import { DataParser } from "../model/dataParser.js"
import { DataExtractor } from "../model/dataExtractor.js"

export class WorldExplorer extends EventTarget {
	// TODO need to write out that population values are in thousands
	// and GDP in billions
	// and emissions in .. something

	constructor() {
		super()

		this.dataExtractor = new DataExtractor()
		this.dataParser = new DataParser()
		this.container = document.querySelector("#container")

		this.init()
	}

	init() {
		this.#addControls()
		this.#addChart()
		this.#addTable()

		document.addEventListener("choices-submitted", (event) => this.#choicesUpdated(event.detail))
		document.addEventListener("error", (event) => this.#displayError(event.detail))
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

	async #choicesUpdated(choices) {
		this.#removeError()
		
		const parsedData = await this.#getData(choices)
		this.#emitDataEvent({
			data: parsedData,
			title: choices.title,
			chartType: choices.chartType,
			dataset: choices.dataset
		})
	}

	async #getData(choices) {
		try {
			return await this.dataParser.getParsedData(choices)
		} catch (e) {
			this.#displayError(e.message)
		}
	}

	#emitDataEvent(choicesData) {
		const event = new CustomEvent("data-parsed", {
			detail: choicesData,
			bubbles: true
		})
		document.dispatchEvent(event)
	}

	#displayError(message) {
		const error = document.createElement("error-display")
		this.container.children[1].before(error) // Below user controls
		error.show(message)
	}

	#removeError() {
		const error = this.container.querySelector("error-display")
		if (error) {
			error.remove()
		}
	}
}