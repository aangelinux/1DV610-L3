/**
 * @module Configures style rules for the charts.
 */

export class ChartConfig {
	#RADIAL = {
		radius: 150,
		title: "",
		font: "Lexend Light"
	}

	#LINEAR = {
		height: 350,
		width: 700,
		title: "",
		color: "darkolivegreen",
		font: "Lexend Light"
	}

	#SCALES = {  // For the chart title
		"Population": "(thousands)",
		"GDP per capita": "",
		"Emissions (CO2)": ""
	}

	constructor() {
	}

	get radial() {
		return this.#RADIAL
	}

	get linear() {
		return this.#LINEAR
	}

	get scales() {
		return this.#SCALES
	}

	set title(content) {
		this.#LINEAR.title = content
		this.#RADIAL.title = content
	}
}