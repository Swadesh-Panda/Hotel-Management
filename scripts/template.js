const nav = `
<nav>
    <a class="home_link" href="index.html">
        <img src="https://cdn-icons-png.flaticon.com/512/3729/3729184.png" height="50px" alt="home_logo">
        BarelyBnB
    </a>
    <div class="nav_container">

        <a class="nav_link" href="bookings.html">My bookings </a>
        <a class="nav_link" href="reservation.html">Reservations</a>
        <a class="nav_link" href="history.html">Order history</a>

        <div class="user-container">
                <a href="bill.html">
                    <button class="outline-button">
                        Bill
                        <i class="fa-solid fa-file-invoice"></i>
                    </button>
                </a>
                
                <a id='login-link' href="login.html">
                <button id="user-button">
                        Sign in
                        <i class="fa-regular fa-circle-user"></i>
                </button>
                </a>
                
                <ul id="user-options">
                    <a href="customer_support.html">
                    <li><button>Customer Support</button></li>
                    </a>
                    <li><button id='logOut-button' onclick='handleLogout(event)'>Log Out</button></li>
                </ul>
        </div>
    </div>
</nav>
`

const footer = `<footer>All Rights Reserved. Copyright © BarelyBnB Ltd.</footer>`

const modal = `
<div id='modal'>
  <div id='modal-container'>
    <header id='modal-header'>
    	Title
    </header>
    <div id='modal-content'>
        Message
    </div>
  </div>
</div>`

document.body.insertAdjacentHTML('afterbegin', nav)
document.body.insertAdjacentHTML('beforeend', modal)
document.body.insertAdjacentHTML('beforeend', footer)