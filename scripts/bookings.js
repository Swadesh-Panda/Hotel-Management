if (!currentUser) location = 'login.html'

const bookingsTable = document.getElementById('bookings-table')
const bookingsTableBody = document.getElementById('bookings-table-body')
const bookingsTableHead = document.getElementById('bookings-table-head')

const user = users.find(u => u.customerID === currentUser)
const reservation = currentUser === 1 ? users.flatMap(user => user.reservation) : user.reservation || [];

const handleStatus = (status) => {
    const modalHeader = document.querySelector('#modal-header')
    bookingID = parseInt(modalHeader.textContent.split('#')[1])

    reservation.forEach((r, i) => {
        if (r.bookingID === bookingID) {
            roomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
            reservation[i]['status'] = status
            reservation[i]['roomNumber'] = roomNumber

            let resUser = users.find(u => u.reservation.find(res => res.bookingID === bookingID))
            resUser.reservation.forEach((res, j) => {
                if (res.bookingID === bookingID) {
                    resUser.reservation[j] = reservation[i]
                }
            })


            users.forEach((u, i) => { if (u.customerID === resUser.customerID) users[i] = resUser })
            saveJson('users', users)
        }
    })

    location.reload()
}

const navHome = document.getElementsByClassName('nav-container')[0]
navHome.insertAdjacentHTML('beforeend', search)

const searchBar = navHome.querySelector('.search')
const searchButton = navHome.querySelector('button')
const searchInput = searchBar.querySelector('input')

const handleSearch = () => {
    for (row of bookingsTableBody.rows) {
        flag = false
        for (cell of row.cells) {
            if (cell.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
                flag = true;
                break
            }
        }

        if (!flag) {
            row.style.visibility = 'collapse'
        }
        else row.style.visibility = 'visible'
    }

    // bookingsTableBody.innerHTML = 'no reservations found'

    const faSearch = `<i class="fas fa-search"></i>`
    const faTimes = `<i class="fas fa-times"></i>`

    if (searchInput.value) {
        searchButton.innerHTML = faTimes
        searchButton.onclick = () => { clearSearch() }
    }
    else {
        searchButton.innerHTML = faSearch
        searchButton.onclick = () => { handleSearch() }
    }
}

const clearSearch = () => {
    searchInput.value = ''
    handleSearch()
}

searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSearch() })


if (!reservation.length) document.querySelector('section').innerHTML = 'You haven\'t booked any reservations !!!'
else {
    for (res of reservation) {
        if (page === 'bookings' && new Date() > new Date(res.checkIn)) continue
        else if (page === 'history' && new Date() < new Date(res.checkIn)) continue


        let tableRow = document.createElement('tr')
        let bookingID = document.createElement('td')
        let guestName = document.createElement('td')
        let checkIn = document.createElement('td')
        let checkOut = document.createElement('td')
        let roomNumber = document.createElement('td')
        let roomType = document.createElement('td')
        let price = document.createElement('td')
        let payment = document.createElement('td')
        let status = document.createElement('td')

        bookingID.textContent = `#${res.bookingID || '---'}`
        guestName.textContent = `${res.rsFname || '---'} ${res.rsLname || ''}`
        checkIn.textContent = `${res.checkIn || '---'}`
        checkOut.textContent = `${res.checkOut || '---'}`
        roomNumber.textContent = `${res.roomNumber || '---'}`
        roomType.textContent = `${res.roomType || '---'}`
        price.textContent = `${res.total || '---'}`

        if (res.paymentStatus === 'pending' && currentUser !== 1) {
            const bill = document.createElement('a')
            bill.href = `bill.html?bookingID=${parseInt(bookingID.textContent.replace('#', ''))}`
            bill.textContent = 'pending'
            payment.appendChild(bill)
        }
        else payment.textContent = `${res.paymentStatus || '---'}`

        if (res.status === 'requested' && currentUser === 1) {
            const statusButton = document.createElement('a')
            statusButton.onclick = () => {
                showModal(`Reservation ${bookingID.textContent}`,
                    `<span id='status-container' style='display: inline-flex; gap: 50px'>
                        <button onclick="handleStatus('accepted')" class='outline-button'><i class="fa-solid fa-check"></i> ACCEPT</button>
                        <button onclick="handleStatus('rejected')" class='outline-button'><i class="fa-solid fa-times"></i> REJECT</button>
                        </span>`)
            }
            statusButton.textContent = 'requested'
            status.appendChild(statusButton)
        }
        else status.textContent = `${res.status || '---'}`

        bookingID.setAttribute('data-label', 'bookingID')
        guestName.setAttribute('data-label', 'guestName')
        checkIn.setAttribute('data-label', 'checkIn')
        checkOut.setAttribute('data-label', 'checkOut')
        roomNumber.setAttribute('data-label', 'roomNumber')
        roomType.setAttribute('data-label', 'roomType')
        price.setAttribute('data-label', 'price')
        payment.setAttribute('data-label', 'payment')
        status.setAttribute('data-label', 'status')

        tableRow.appendChild(bookingID)
        tableRow.appendChild(guestName)
        tableRow.appendChild(checkIn)
        tableRow.appendChild(checkOut)
        tableRow.appendChild(roomNumber)
        tableRow.appendChild(roomType)
        tableRow.appendChild(price)
        tableRow.appendChild(payment)
        tableRow.appendChild(status)

        if(status.textContent === 'accepted') status.style.color = 'yellowgreen';
        if(status.textContent === 'rejected') status.style.color = 'orangered';

        if ((res.paymentStatus !== 'pending' && currentUser !== 1) || (res.status === 'accepted' && currentUser === 1)) {
            view = document.createElement('div')
            view.innerHTML = `<i class="fa-solid fa-download"></i>`
            view.classList.add('view')
            tableRow.appendChild(view)
        }

        bookingsTableBody.insertBefore(tableRow, bookingsTableBody.firstChild)

        tableRow.addEventListener('click', (e) => {
            if (payment.textContent === "pending") return

            if (currentUser === 1)
                if (status.textContent !== 'accepted') return

            id = parseInt(bookingID.textContent.replace('#', ''))
            open(`invoice.html?bookingID=${id}`)
        })
    }
}