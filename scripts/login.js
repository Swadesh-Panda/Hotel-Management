if (username) location = 'index.html'

const formLogin = document.getElementById('form-login')
const formPersonal = document.getElementById('form-personal')
const formSignup = document.getElementById('form-signup')
const quip = document.getElementById('quip')
const helperText = document.getElementsByClassName('helper-mssg')

formLogin.style.display = 'inherit'
quip.style.display = 'initial'
formPersonal.style.display = 'none'
formSignup.style.display = 'none'

const displaySignup = () => {
    formLogin.style.display = 'none'
    formPersonal.style.display = 'inherit'
    quip.style.display = 'none'
}

const handleLogin = (e) => {
    e.preventDefault();

    const credentials = e.target.closest('form');

    flag = true;
    
    for (element of credentials.elements) {

        const inp = document.querySelector(`[name="${element.name}"]`)
        if (!inp) continue

        const val = getItem(element.name)

        if (!element.value) {
            showErrors(inp, "Field value cannot be empty")
            flag = false
        }
        else if (!val || val !== element.val) {
            showErrors(inp, "No Record Found")
            flag = false
        }
    }

    if (flag) location = 'index.html'
}

const handlePersonalData = (e) => {
    e.preventDefault();

    const formData = e.target.closest('form');

    for (element of formData.elements) {
        setItem(element.name, element.value)
    }

    formSignup.style.display = 'inherit'
    formPersonal.style.display = 'none'
}

const handleSignup = (e) => {
    e.preventDefault()
    const newCredentials = e.target.closest('form')

    const newUsername = newCredentials.newUsername.value;
    const newPassword = newCredentials.newPassword.value;
    const confirmPassword = newCredentials.confirmPassword.value;

    if (newPassword === confirmPassword) {
        setItem('username', newUsername)
        setItem('password', newPassword)
        location = 'index.html'
    }
}