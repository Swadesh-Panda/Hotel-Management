if(!CurrentUser) location = 'login.html'

const formReservation = document.getElementById('form-reservation')

const user = users.find(u => u.email === CurrentUser)
const reservation = user.reservation || [];

const pendingRes = reservation.find(res => res.paymentStatus === "pending")
if (pendingRes) {
    showModal('Message', 'Pending reservations must be resolved.', () => {location='bill.html'})
}

const bookingID = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
const rsDetails = {'bookingID' : bookingID}

const handleReservation = (e) => {
    e.preventDefault();
    
    const form = e.target.closest('form');

    for (element of form.elements)
    {
        const inp = document.querySelector(`[name="${element.name}"]`)
        if (!inp) continue;
                
        if (!element.value)
        {
            showErrors(inp, `${element.name} is required`)
            return
        }
            
        rsDetails[element.name] = element.value;
    }
   
   rsDetails['paymentStatus'] = 'pending';
   reservation.push(rsDetails)
   user.reservation = reservation
   users.forEach((u,i) => {if(u.email === user.email) users[i] = user})
   saveJson('users', users)
   
   form.reset();
    showModal('Reservation Successful', `Booking Id : ${bookingID}`, () => { location = 'bill.html' })
}