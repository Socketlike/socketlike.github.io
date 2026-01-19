(() => {
  const CONTENTS = {
    main: "/content/index.md",
    "not-found": "/content/not-found.md"
  }

  const marked = window.marked

  const main = document.querySelector('main')

  const path = location.pathname.slice(1).split('/')
  const content = path?.[0]
    ? path.reduce((prev, cur) => prev?.[cur], CONTENTS) || CONTENTS['not-found']
    : CONTENTS.main

  if (content)
    fetch(content)
      .then(async (r) => {
        main.innerHTML = marked.parse(await r.text())

        const age = (Date.now() / 1000 - 1171040400) / 31536000
        const agePlaceholder = `${Math.floor(age)}${age - Math.floor(age) >= .8 ? ` (almost ${Math.ceil(age)})` : ''}`
        main.querySelectorAll('[placeholder=age]').forEach((e) => {
          e.textContent = agePlaceholder
        })
      })
      .catch(console.error)

  const sidebar = document.querySelector('nav')

  sidebar.style.display = 'block'
  sidebar.style.width = `calc(${main.getBoundingClientRect().x}px - 32px - 32px)`

  window.onresize = () => {
    sidebar.style.width = `calc(${main.getBoundingClientRect().x}px - 32px - 32px)`
  }
})()