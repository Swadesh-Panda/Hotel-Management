if (!CurrentUser) location = 'login.html'

const formBill = document.getElementById('form-bill')

const user = users.find(u => u.email === CurrentUser)
const reservation = user.reservation || [];
const bookingID = parseInt(new URLSearchParams(location.search).get('bookingID'))
pendingRes = reservation.slice().reverse().find(res => res.paymentStatus === 'pending')

if (bookingID)
{
    pendingRes = reservation.find(res => res.bookingID === bookingID)
    if (pendingRes.paymentStatus !== 'pending')
        showModal('Error', `Payment for #${bookingID} is already resolved`, () => history.back())

}

if (!pendingRes) {
    showModal('Message', 'No Pending Reservations', () => history.back())
}

for (element of formBill.elements) {
    if (element.name in pendingRes) element.value = pendingRes[element.name];
}


const roomCharges = (Math.floor(Math.random() * (99 - 10 + 1)) + 10) * 10;
const additionalCharges = (Math.floor(Math.random() * (9 - 1 + 1)) + 1) * 10;

formBill.roomCharges.value = roomCharges;
formBill.additionalCharges.value = additionalCharges;

const billTotal = document.querySelector('#bill-total')
total = roomCharges + additionalCharges + (parseInt(formBill.tip.value) || 0);
billTotal.textContent = `${total}`

formBill.tip.addEventListener('input', (e) => {
    total = roomCharges + additionalCharges + (parseInt(formBill.tip.value) || 0);
    billTotal.textContent = `${total}`
});

const handleBilling = (e) => {
    e.preventDefault();

    pendingRes['roomCharges'] = roomCharges;
    pendingRes['additionalCharges'] = additionalCharges;
    pendingRes['tip'] = parseInt(formBill.tip.value) || 0;
    pendingRes['total'] = pendingRes['roomCharges'] + pendingRes['additionalCharges'] + pendingRes['tip'];
    pendingRes['paymentMode'] = formBill.paymentMode.value;
    pendingRes['paymentStatus'] = pendingRes['paymentMode'] === 'card' ? "completed" : "cash";
    pendingRes['status'] = "requested";

    reservation.forEach((r, i) => { if (r.bookingID === pendingRes.bookingID) reservation[i] = pendingRes })
    user.reservation = reservation
    users.forEach((u, i) => { if (u.email === user.email) users[i] = user })
    saveJson('users', users)

    formBill.reset();
    showModal('Payment Successful', `Booking Id : ${pendingRes['bookingID']}`, () => {
        open(`invoice.html?bookingID=${pendingRes['bookingID']}`)
        location = 'bookings.html'
    })
}


