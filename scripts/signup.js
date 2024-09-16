if (CurrentUser) location = 'index.html'

const formPersonal = document.getElementById('form-personal')
const formSignup = document.getElementById('form-signup')

const user = {}

const customerID = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
formSignup.customerID.value = customerID;

const handlePersonalData = (e) => {
    e.preventDefault();

    const form = e.target.closest('form');

    for (element of form.elements) {
        const inp = document.querySelector(`[name="${element.name}"]`)
        if (!inp) continue;

        if (!element.value) {
            showErrors(inp, `*${element.parentNode.querySelector('label').textContent} is required`)
            return
        }

        user[element.name] = element.value;
    }

    const dupEmailUser = users.find(u => u.email === user.email)
    if (dupEmailUser) {
        showErrors(document.querySelector(`#email`), "email already exists")
        return;
    }

    const dupContactUser = users.find(u => u.contact === user.contact)
    if (dupContactUser) {
        showErrors(document.querySelector('#contact'), "contact already exists")
        return
    }

    formSignup.style.display = 'inherit'
    formPersonal.style.display = 'none'
}

const handleSignup = (e) => {
    e.preventDefault()
    const form = e.target.closest('form')

    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
        form.newPassword.value = ''
        form.confirmPassword.value = ''
        showErrors(form.newPassword, "passwords don't match")
        showErrors(form.confirmPassword, "passwords don't match")
        return
    }

    user.customerID = customerID
    user.password = newPassword
    users.push(user)
    saveJson('users', users)
    localStorage.setItem('CurrentUser', user.email)

    showModal('Registration Successful', `Customer Id : ${customerID}`, () => { location = 'index.html' })
}