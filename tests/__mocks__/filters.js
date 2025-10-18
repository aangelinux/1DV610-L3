export class MockFilterConfig {
	#AFRICA = [
		"Burundi",
		"Burkina Faso",
		"Cabo Verde"
	]

	constructor() {
	}

	get filters() {
		return {
			"Africa": this.#AFRICA
		}
	}
}