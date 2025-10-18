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
		margin: 5px;
	}

	#error img {
		margin: auto;
		display: block;
		width: 40%;
		margin-top: 25px;
	}
</style>

<div id="error">
	<p>Something went wrong.</p>
	<p>Please accept this cat as a token of my regret.</p>
	<img src="/images/cat.webp" alt="Cat"/>
</div>
` 