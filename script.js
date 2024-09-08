console.log("Hello BarelyBnB");

const navLinks = document.querySelectorAll('.nav_link')
const pathName = location.pathname
console.log(pathName);

const path = pathName.split('/')
const page = path[path.length - 1].slice(0,-5)

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