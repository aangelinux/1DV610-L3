/**
 * @module Defines a web-component for displaying tables.
 * @file src/components/table-display.js
 */

import { template } from "./table-display-template.js"

customElements.define("table-display",
  class extends HTMLElement {
		#table
		#tableBody

		constructor() {
			super()

			this.attachShadow({ mode: 'open' })
				.appendChild(template.content.cloneNode(true))

			this.#table = this.shadowRoot.querySelector("#table")
			this.#tableBody = this.shadowRoot.querySelector("tbody")
			this.abortController = new AbortController()
		}

		connectedCallback() {
			document.addEventListener("data-parsed", (event) => {
				this.#update(event.detail)
			}, { signal: this.abortController.signal })
		}

		disconnectedCallback() {
			this.abortController.abort()
		}

		#update(choices) {
			this.#clear()
			this.#setHeader(choices.dataset)

			choices.data.forEach((object) => {
				const row = this.#createRow()
				const nameCell = this.#createNameCell(object.name)
				const valueCell = this.#createValueCell(object.value)

				row.appendChild(nameCell)
				row.appendChild(valueCell)
				this.#tableBody.appendChild(row)
			})

			this.#show()
		}

		#clear() {
			const children = Array.from(this.#tableBody.childNodes)
			for (const child of children) {
				if (child != this.#tableBody.firstChild) { // Don't remove header
					child.remove()
				}
			}
		}

		#setHeader(dataset) {
			this.#table.querySelector("#dataset").innerHTML = dataset
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

		#show() {
			this.#table.style.display = "block"
		}
	}
)