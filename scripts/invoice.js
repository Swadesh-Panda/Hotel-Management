if(!CurrentUser) location = 'login.html'

const invoice = document.getElementById('invoice')
const bookingID = new URLSearchParams(location.search).get('bookingID')

const user = users.find(u => u.email === CurrentUser)
const reservation = user.reservation || [];
const currentRes = reservation.find(res => res.bookingID === parseInt(bookingID))

for (element of invoice.elements) {
    const inp = document.querySelector(`[name="${element.name}"]`)
    if (!inp) continue;

    element.value = currentRes[element.name];
}

const bookingHeader = document.getElementById('reset-button')
bookingHeader.textContent = `#${bookingID}`

const billTotal = document.querySelector('#bill-total')
billTotal.textContent = `${currentRes['total']}`