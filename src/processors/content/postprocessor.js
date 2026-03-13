const getRelativeFormatParameters = (value) => {
    if (Math.abs(value) >= 365 * 24 * 60 * 60 * 1000)
        return [Math.ceil(value / (365 * 24 * 60 * 60 * 1000)), 'years']
    
    if (Math.abs(value) >= 30 * 24 * 60 * 60 * 1000)
        return [Math.ceil(value / (30 * 24 * 60 * 60 * 1000)), 'months']

    if (Math.abs(value) >= 7 * 24 * 60 * 60 * 1000)
        return [Math.ceil(value / (7 * 24 * 60 * 60 * 1000)), 'weeks']

    if (Math.abs(value) >= 24 * 60 * 60 * 1000)
        return [Math.ceil(value / (24 * 60 * 60 * 1000)), 'days']

    if (Math.abs(value) >= 60 * 60 * 1000)
        return [Math.ceil(value / (60 * 60 * 1000)), 'hours']

    if (Math.abs(value) >= 60 * 1000)
        return [Math.ceil(value / (60 * 1000)), 'minutes']

    return [Math.ceil(value / 1000), 'seconds']
}

const processors = {
    age(e) {
        const birthdayCounter = document.createElement('span')
        birthdayCounter.classList.toggle('timestamp', true)
        birthdayCounter.textContent = `birthday ${
            new Intl.RelativeTimeFormat(undefined, {
                numeric: 'auto'
            })
                .format(...getRelativeFormatParameters(
                    Date.UTC(new Date().getFullYear() + 1, 1, 9, 17) - Date.now()
                ))
        }`
        birthdayCounter.title = new Intl.DateTimeFormat(undefined, {
            dateStyle: 'full',
            timeStyle: 'short'
        })
            .format(Date.UTC(new Date().getFullYear() + 1, 1, 9, 17))

        e.replaceChildren(
            new Date().getFullYear() - new Date(1171040400000).getFullYear(),
            ' years old ',
            birthdayCounter
        )
    },

    timestamp(e) {
        const value = Number(e.getAttribute('value'))
        const display = e.getAttribute('display') || 'short'

        e.classList.toggle('timestamp', true)

        if (Number.isNaN(value))
            e.textContent = 'invalid timestamp'
        else {
            let label = ''
            const title = new Intl.DateTimeFormat(undefined, {
                dateStyle: 'long',
                timeStyle: 'short'
            })
                .format(value)

            switch (display) {
                case 'long':
                    label = title
                    break

                case 'relative':
                    label = new Intl.RelativeTimeFormat(undefined, {
                        numeric: 'auto'
                    })
                        .format(...getRelativeFormatParameters(value - Date.now()))

                case 'short':
                default:
                    label = new Intl.DateTimeFormat(undefined, {
                        timeStyle: 'short'
                    })
                        .format(value)
                    break
            }

            e.textContent = label
            e.title = title
        }
    },

    go_back(e) {
        e.href = '/'
        e.textContent = '[history: go back]'
        e.addEventListener('click', (ev) => {
            ev.stopPropagation()
            ev.preventDefault()

            history.back()
        })
    },

	destroy(e) {
		e.remove()
	}
}

export default content => {
    const fakeMain = document.createElement('div')
    fakeMain.innerHTML = content

	fakeMain
		.querySelectorAll('[_special]')
		.forEach(e => {
			const type = e.getAttribute('_special')

			if (type in processors)
				processors[type](e)
		})

    return [...fakeMain.childNodes]
}