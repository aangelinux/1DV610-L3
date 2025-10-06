/**
 * @module Handles components and event-driven interactions.
 * @file src/index.js
 */

import './components/user-controls.js'
import './components/chart-display.js'

const body = document.querySelector("body")

const userControls = document.createElement("user-controls")
body.appendChild(userControls)