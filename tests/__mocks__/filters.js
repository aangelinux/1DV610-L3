export class MockFilterConfig {
	#AFRICA = [
		"Burundi",
		"Burkina Faso",
		"Cabo Verde"
	]

	constructor() {
	}

	get regions() {
		return {
			"Africa": this.#AFRICA
		}
	}
}