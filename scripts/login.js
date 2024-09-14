if (CurrentUser) location = 'index.html'

const formLogin = document.getElementById('form-login')
const quip = document.getElementById('quip')
const helperText = document.getElementsByClassName('helper-mssg')

const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target.closest('form');

    flag = true;

    for (element of form.elements) {
        const inp = document.querySelector(`[name="${element.name}"]`)
        if (!inp) continue

        if (!element.value) {
            showErrors(inp, `${element.name} is required`)
            flag = false
        }
    }


    if (flag) {
        const username = form.username.value
        const password = form.password.value

        const checkUser = users.find(user => user.email === username || user.customerID === parseInt(username))
        if (!checkUser) {
            showErrors(form.username, "No record found")
            return
        }

        if (checkUser && checkUser.password !== password) {
            showErrors(form.password, "Incorrect Password")
            return
        }



        localStorage.setItem('CurrentUser',checkUser.email)
        location = 'index.html'
    }
}