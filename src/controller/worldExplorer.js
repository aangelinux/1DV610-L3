/**
 * @module Orchestrates application flow and delegates actions.
 */

import "../index.js"

class WorldExplorer extends EventTarget {
	// TODO need to write out that population values are in thousands
	// and GDP in billions
	// and emissions in .. something

	constructor() {
		super()

		this.container = document.body.querySelector("div")
		this.init()
	}

	init() {
		this.#appendUserControls()
		this.#appendChart()
		this.#appendTable()

		document.addEventListener("error-thrown", () => this.#handleError())
	}

	#appendUserControls() {
		const controls = document.createElement("user-controls")
		this.container.appendChild(controls)
	}

	#appendChart() {
		const chart = document.createElement("chart-display")
		this.container.appendChild(chart)
	}

	#appendTable() {
		const table = document.createElement("table-display")
		this.container.appendChild(table)
	}

	#getData() {

	}

	#emitData() {

	}

	#handleError() {
		const error = document.createElement("error-display")
		this.container.appendChild(error)
	}
}

new WorldExplorer()