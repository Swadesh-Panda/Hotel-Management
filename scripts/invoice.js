if (!currentUser) location = 'login.html'

const invoice = document.getElementById('invoice')
const bookingID = parseInt(new URLSearchParams(location.search).get('bookingID'))

const user = users.find(u => u.customerID === currentUser)
const reservation = user.reservation || [];
const currentRes = reservation.find(res => res.bookingID === bookingID)

for (element of invoice.elements) {
    const inp = document.querySelector(`[name="${element.name}"]`)
    if (!inp) continue;

    element.value = currentRes[element.name];
}

const bookingHeader = document.getElementById('reset-button')
bookingHeader.textContent = `#${bookingID}`

const billTotal = document.querySelector('#bill-total')
billTotal.textContent = `${currentRes['total']}`