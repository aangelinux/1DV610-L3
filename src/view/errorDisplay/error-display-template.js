export const template = document.createElement("template")
template.innerHTML = 
`
<style>
	#error {
		display: none;
		width: 700px;
	}

	#error p {
		justify-self: center;
	}

	#error img {
		margin: auto;
		display: block;
		width: 40%;
	}
</style>

<div id="error">
	<p></p>
	<img src="/images/cat.webp" alt="Cat"/>
</div>
` 