const saveJson = (key, val) => localStorage.setItem(key, JSON.stringify(val))
const getJson = (key) => JSON.parse(localStorage.getItem(key))
const delItem = (key) => localStorage.removeItem(key)

const setAdmin = () => {
    username = 'admin'
    password = 'Password123@'
    customerID = 1

    adminObj = { username, password, customerID }
    saveJson('admin', adminObj)

    return adminObj
}
const admin = getJson('admin') || setAdmin()

const users = getJson('users') || []
const currentUser = parseInt(localStorage.getItem('currentUser'))

const userButton = document.querySelector('#user-button')
const userOptions = document.querySelector('#user-options')
const logOutButton = document.querySelector('#logOut-button')

const navLinks = document.querySelectorAll('.nav-link')
const pathName = location.pathname

const path = pathName.split('/')
const page = path[path.length - 1].slice(0, -5)


switch (page) {
    case '':
    case 'index':
        document.title += ' - Barely any Bed n Breakfast'
        break;
    default:
        document.title += ' - ' + page.charAt(0).toUpperCase() + page.slice(1)
        break;
}

navLinks.forEach(link => {
    href = new URL(link).pathname
    if (pathName === href) link.classList.add('active_link')
})

const handleUser = (e) => {
    e.stopPropagation()
    userOptions.style.display = userOptions.style.display === 'block' ? 'none' : 'block'
}

if (currentUser) {
    userButton.textContent = `Hello, ${currentUser === 1 ? 'admin' : users.find(user => user.customerID === currentUser).fname}`
    userButton.onclick = (e) => { handleUser(e) }

    document.addEventListener('click', (e) => {
        if (userOptions.style.display === 'block' && !userOptions.contains(e.target)) userOptions.style.display = 'none';
    })

    userOptions.addEventListener('click', (e) => {
        e.stopPropagation()
    })

    logOutButton.addEventListener('click', (e) => {
        delItem('currentUser')
        location = 'index.html'
    })
}

if (currentUser === 1)
{
    document.querySelector('.user-container').querySelector('button').setAttribute('disabled',true)
    document.querySelector('.user-container').querySelector('button').style.pointerEvents = 'none'
    document.querySelectorAll('.nav-link')[1].style.pointerEvents = 'none'
    document.querySelectorAll('.nav-link')[1].style.color = '#ebebeb'
    document.querySelectorAll('.nav-link')[0].textContent = 'Bookings'
    document.querySelectorAll('.nav-link')[2].textContent = 'History'
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
const modalHeader = document.getElementById('modal-header')
const modalContent = document.getElementById('modal-content')

const showModal = (title, mssg, action) => {
    modalElement.style.display = 'flex'
    modalHeader.textContent = title
    modalContent.innerHTML = mssg


    modalElement.addEventListener('click', (e) => {
        modalElement.style.display = 'none'

        if(action)action();
    })
}