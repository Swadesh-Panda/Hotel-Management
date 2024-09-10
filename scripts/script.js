const setItem = localStorage.setItem.bind(localStorage)
const getItem = localStorage.getItem.bind(localStorage)

const username = getItem('username')
const loggedIn = getItem('loggedIn')

const userButton = document.querySelector('#user-button')
const userOptions = document.querySelector('#user-options')
const logOutButton = document.querySelector('#logOut-button')

const navLinks = document.querySelectorAll('.nav_link')
const pathName = location.pathname

const path = pathName.split('/')
const page = path[path.length - 1].slice(0, -5)

switch (page) {
    case '':
    case 'index':
        document.title += ' - Barely any Bed n Breakfast'
        break;
    default:
        document.title += ' | ' + page
        break;
}


navLinks.forEach(link => {
    href = new URL(link).pathname
    if (pathName === href) link.classList.add('active_link')
})

userOptions.style.display = 'none'

if (username) {
    userButton.innerHTML = `Welcome, ${username}`

    userButton.addEventListener('click', (e) => {
        e.stopPropagation()
        userOptions.style.display = userOptions.style.display === 'block' ? 'none' : 'block'
    })

    document.addEventListener('click', (e) => {
        if (userOptions.style.display === 'block' && !userOptions.contains(e.target)) userOptions.style.display = 'none';
    })

    userOptions.addEventListener('click', (e) => {
        e.stopPropagation()
    })

    logOutButton.addEventListener('click', (e) => {
        localStorage.clear()
        location = 'index.html'
    })
}

const showErrors = (ipElement, mssg) => {
    const err = document.createElement('div')
    err.className = 'err-mssgs'
    err.textContent = mssg

    const oldErrors = ipElement.parentNode.querySelectorAll('.err-mssgs')
    oldErrors.forEach(element => element.remove())

    
    ipElement.parentNode.appendChild(err)
}