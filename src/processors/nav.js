export default contents => Object
	.entries(contents)
	.filter(([_, { delisted }]) => !delisted)
	.flatMap(([_, { title, path }]) => {
		const e = document.createElement('a')
		e.classList.add('no-default')
		e.innerText = title
		e.href = path.startsWith('/') ? path : '/' + path
		
		return [e, ' ']
	})