/**
 * @module Defines a web-component for displaying tables.
 * @file src/components/table-display.js
 */

import { template } from "./table-display-template.js"

customElements.define("table-display",
  class extends HTMLElement {
		#table
		#tbody

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.#table = this.shadowRoot.querySelector("#table")
			this.#tbody = this.shadowRoot.querySelector("tbody")
			this.abortController = new AbortController()
		}

		connectedCallback() {
			document.addEventListener("choices-submitted", (event) => {
				this.#showTable()
				this.#renderTable(event.detail)
			}, { signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#showTable() {
			this.#table.style.display = "block"
		}

		#renderTable(details) {
			this.#clearTBody()
			this.#setTableHeader(details.dataset)

			details.data.forEach((object) => {
				const row = this.#createRow()
				const nameCell = this.#createNameCell(object.name)
				const valueCell = this.#createValueCell(object.value)

				row.appendChild(nameCell)
				row.appendChild(valueCell)
				this.#tbody.appendChild(row)
			})
		}

		#clearTBody() {
			const children = Array.from(this.#tbody.childNodes)
			for (const child of children) {
				if (child != this.#tbody.firstChild) { // don't remove table header
					child.remove()
				}
			}
		}

		#setTableHeader(dataset) {
			this.shadowRoot.querySelector("#dataset").innerHTML = dataset
		}

		#createRow() {
			const row = document.createElement("tr")
			return row
		}

		#createNameCell(name) {
			const nameCell = document.createElement("td")
			nameCell.innerHTML = name
			return nameCell
		}

		#createValueCell(value) {
			const valueCell = document.createElement("td")
			valueCell.innerHTML = value
			return valueCell
		}
	}
)