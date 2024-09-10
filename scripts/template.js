const nav = `
<nav>
    <a class="home_link" href="index.html">
        <img src="https://cdn-icons-png.flaticon.com/512/3729/3729184.png" height="50px" alt="home_logo">
        BarelyBnB
    </a>
    <div class="nav_container">

        <a class="nav_link" href="bookings.html">My bookings </a>
        <a class="nav_link" href="reservations.html">Reservations</a>
        <a class="nav_link" href="history.html">Order history</a>

        <div class="user_container">
                <a href="bill.html">
                <button id="bill_button">
                    Bill
                    <i class="fa-solid fa-file-invoice"></i>
                </button>
                </a>

                <button id="user-button">
                    <a href="login.html">
                        Sign in
                        <i class="fa-regular fa-circle-user"></i>
                    </a>
                </button>
                
                <div id="user-options">
                    <li>
                    <a class="nav_link" href="customer_support.html">Customer Support</a></li>
                    <button id="logOut-button">
                    <li> Log Out</li>
                    </button>
                </div>
        </div>
    </div>
</nav>
`

const footer = `<footer>All Rights Reserved. Copyright © BarelyBnB Ltd.</footer>`

document.body.insertAdjacentHTML('afterbegin', nav)
document.body.insertAdjacentHTML('beforeend', footer)