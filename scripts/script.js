const saveJson = (key, val) => localStorage.setItem(key, JSON.stringify(val))
const getJson = (key) => JSON.parse(localStorage.getItem(key))
const delItem = (key) => localStorage.removeItem(key)

const users = getJson('users') || []
const CurrentUser = localStorage.getItem('CurrentUser')

const userButton = document.querySelector('#user-button')
const userOptions = document.querySelector('#user-options')
const logOutButton = document.querySelector('#logOut-button')
const loginLink = document.querySelector('#login-link')

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

if (CurrentUser) {
    loginLink.removeAttribute('href')

    userButton.innerHTML = `Welcome, ${users.find(user => user.email === CurrentUser).fname}`

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
        delItem('CurrentUser')
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

const modalElement = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')

const showModal = (mssg) => {
    modalElement.style.display = 'flex'
    modalContent.textContent = mssg
}

modalContent.addEventListener('click', (e) => {
    alert.style.display = 'none'
})