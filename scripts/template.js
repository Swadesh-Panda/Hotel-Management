const nav = `
<nav>
    <div class='nav-container'>
        <a class="home-link" href="index.html">
            <img src="https://cdn-icons-png.flaticon.com/512/3729/3729184.png" height="50px" alt="home_logo">
            BarelyBnB
        </a>
    </div>
    
    <div class="nav-container">

        <a class="nav-link" href="bookings.html">My bookings </a>
        <a class="nav-link" href="reservation.html">Reservations</a>
        <a class="nav-link" href="history.html">Order history</a>

        <div class="user-container">
            <button onclick='{location = "bill.html"}' class="outline-button">
                Bill
                <i class="fa-solid fa-file-invoice"></i>
            </button>
            
            <button onclick='{location = "login.html"}' id="user-button">
                Sign in
                <i class="fa-regular fa-circle-user"></i>
            </button>
            
            <ul id="user-options">  
                <li><button onclick='{location = "support.html"}' >Contact Us</button></li>
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

const search = `
<span class='search'>
    <input type="text" placeholder='Search...'/>
    <button onclick='handleSearch(event)'><i class="fas fa-search"></i></button>
</span>
`

document.body.insertAdjacentHTML('afterbegin', nav)
document.body.insertAdjacentHTML('beforeend', modal)
document.body.insertAdjacentHTML('beforeend', footer)