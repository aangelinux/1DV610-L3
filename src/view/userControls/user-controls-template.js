export const template = document.createElement("template")
template.innerHTML =
`
<style>
	:host {
		font-family: "Lexend Light";
		color: black;
	}

	.dropdown-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.dropdown {
		position: relative;
	}

	.dropbtn {
		background-color: #3F5734;
		color: white;
		padding: 13px;
		font-family: "Lexend Light";
		font-size: 16px;
		border: none;
		cursor: pointer;
		min-width: 200px;
		border-radius: 4px;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		background-color: #f9f9f9;
		min-width: 200px;
		box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	}

	.dropdown-content p {
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		cursor: pointer;
	}

	.dropdown-content p:hover {
		background-color: #f1f1f1;
	}

	.dropdown:hover .dropdown-content {
		display: block;
	}

	.dropdown:hover .dropbtn {
		background-color: #577748ff;
	}

	/* -------------- Buttons --------------- */

	.button-container {
		margin-top: 40px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 15px;
		justify-content: center;
	}

	.chartbtn {
		background-color: white;
		color: #3F5734;
		padding: 10px;
		font-family: "Lexend Light";
		font-size: 16px;
		border: 2px solid #3F5734;
		cursor: pointer;
		min-width: 150px;
		border-radius: 5px;
	}

	.chartbtn:hover {
		background-color: #3F5734;
		color: white;
	}

	/* -------------- Errors --------------- */

	#error {
		max-width: 700px;
		display: none;
		margin-top: 40px;
		justify-self: center;
	}

	#error p {
		justify-self: center;
	}

	#error img {
		margin: auto;
		display: block;
		width: 50%;
	}
</style>


<div class="dropdown-container">
	<div class="dropdown">
		<p>Choose a dataset ...</p>
		<button class="dropbtn" id="datasetbtn">Dataset</button>
		<div class="dropdown-content" id="dataset">
			<p>Population</p>
			<p>GDP</p>
			<p>Emissions (CO2)</p>
		</div>
	</div>

	<div class="dropdown">
		<p>Choose a filter ...</p>
		<button class="dropbtn" id="filterbtn">Filter</button>
		<div class="dropdown-content" id="filter">
			<p>Global</p>
			<p>East Asia & Pacific</p>
			<p>Europe & Central Asia</p>
			<p>Latin America & Caribbean</p>
			<p>Middle East & North Africa</p>
			<p>North America</p>
			<p>South Asia</p>
			<p>Sub-Saharan Africa</p>
		</div>
	</div>
</div>

<div class="button-container">
	<button class="chartbtn" id="bar">Bar Chart</button>
	<button class="chartbtn" id="line">Line Graph</button>
	<button class="chartbtn" id="pie">Pie Chart</button>
</div>

<div id="error">
	<p>Something went wrong... Please accept this cat as a token of my regret.</p>
	<img src="/images/cat.webp" alt="Cat"/>
</div>
`