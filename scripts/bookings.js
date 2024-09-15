if (!CurrentUser) location = 'login.html'

const bookingsTable = document.getElementById('bookings-table')
const bookingsTableBody = document.getElementById('bookings-table-body')

const user = users.find(u => u.email === CurrentUser)
const reservation = user.reservation || [];

if (!reservation.length) {
    document.querySelector('section').innerHTML = 'You haven\'t booked any reservations !!!'
}
else {
    for (res of reservation) {


        const tableRow = document.createElement('tr')
        const bookingID = document.createElement('td')
        const guestName = document.createElement('td')
        const checkIn = document.createElement('td')
        const checkOut = document.createElement('td')
        const roomNuber = document.createElement('td')
        const roomType = document.createElement('td')
        const price = document.createElement('td')
        const payment = document.createElement('td')
        const status = document.createElement('td')

        bookingID.textContent = `#${res.bookingID || '---'}`
        guestName.textContent = `${res.rsFname || '---'} ${res.rsLname || ''}`
        checkIn.textContent = `${res.checkIn || '---'}`
        checkOut.textContent = `${res.checkOut || '---'}`
        roomNuber.textContent = `${res.roomNuber || '---'}`
        roomType.textContent = `${res.roomType || '---'}`
        price.textContent = `${res.total || '---'}`
        status.textContent = `${res.status || '---'}`

        bookingID.setAttribute('data-label', 'bookingID')
        guestName.setAttribute('data-label', 'guestName')
        checkIn.setAttribute('data-label', 'checkIn')
        checkOut.setAttribute('data-label', 'checkOut')
        roomNuber.setAttribute('data-label', 'roomNuber')
        roomType.setAttribute('data-label', 'roomType')
        price.setAttribute('data-label', 'price')
        payment.setAttribute('data-label', 'payment')
        status.setAttribute('data-label', 'status')

        if (res.paymentStatus === 'pending') {
            const bill = document.createElement('a')
            bill.href = `bill.html?bookingID=${parseInt(bookingID.textContent.replace('#',''))}`
            bill.textContent = 'pending'
            payment.appendChild(bill)
        }
        else payment.textContent = `${res.paymentStatus}`

        switch (res.status) {
            case 'accepted':
                status.style.color = 'yellowgreen';
            case 'rejected':
                status.style.color = 'orangered';
            default:
                status.style.color = 'black';
        }

        tableRow.appendChild(bookingID)
        tableRow.appendChild(guestName)
        tableRow.appendChild(checkIn)
        tableRow.appendChild(checkOut)
        tableRow.appendChild(roomNuber)
        tableRow.appendChild(roomType)
        tableRow.appendChild(price)
        tableRow.appendChild(payment)
        tableRow.appendChild(status)

        if (res.paymentStatus !== 'pending') {
            view = document.createElement('div')
            view.innerHTML = `<i class="fa-solid fa-download"></i>`
            view.classList.add('view')
            tableRow.appendChild(view)
        }

        bookingsTableBody.appendChild(tableRow)

        tableRow.addEventListener('click', (e) => {
            if (payment.textContent === "pending") return

            id = parseInt(bookingID.textContent.replace('#', ''))
            open(`invoice.html?bookingID=${id}`)
        })
    }
}