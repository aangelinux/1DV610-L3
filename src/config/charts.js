/**
 * @module Defines style configurations for the charts.
 */

export class ChartConfig {
	#RADIAL = {
		radius: 150,
		title: "",
		font: "Monaco, monospace"
	}

	#LINEAR = {
		height: 350,
		width: 500,
		title: "",
		color: "darkred",
		font: "Monaco, monospace"
	}

	constructor() {
	}

	get radial() {
		return this.#RADIAL
	}

	get linear() {
		return this.#LINEAR
	}
}