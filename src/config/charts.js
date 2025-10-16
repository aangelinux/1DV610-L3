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

	constructor() {
	}

	get radial() {
		return this.#RADIAL
	}

	get linear() {
		return this.#LINEAR
	}

	set title(content) {
		this.#LINEAR.title = content
		this.#RADIAL.title = content
	}
}