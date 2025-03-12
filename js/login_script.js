let customer_selected = false;

document.addEventListener("DOMContentLoaded", function () {
    const staffBtn = document.querySelector(".staff");
    const customerBtn = document.querySelector(".customer");

    function setActive(selected, unselected, isCustomer) {
        selected.classList.add("active");
        selected.classList.remove("inactive");
        unselected.classList.add("inactive");
        unselected.classList.remove("active");

        window.customer_selected = isCustomer;
    }

    // Default selection
    setActive(customerBtn, staffBtn, true);
    staffBtn.addEventListener("click", function () {
        setActive(staffBtn, customerBtn, false);
    });

    customerBtn.addEventListener("click", function () {
        setActive(customerBtn, staffBtn, true);
    });
});

document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let passw = document.getElementById('password').value;

    if (window.customer_selected === false){
        let staffID = document.getElementById('ID').value;
        console.log(staffID);

        toJson(passw, staffID, 'https://nbvjzlfi5h.execute-api.us-east-2.amazonaws.com/default/StaffGetItem');
    } 
    else {
        let customerID = document.getElementById('ID').value;
        console.log(customerID);

        toJson(passw, customerID, 'https://70wqhxka6b.execute-api.us-east-2.amazonaws.com/default/CustomerGetItem');
    }
});

function toJson(passw, id, url){
    newUser = {
        pwd: passw,
        ID: id
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('jwt_token', data.token);
            window.location.href = data.redirect_url;  
        } else {
            alert(data.message); 
        }
    })
    .catch(error => {
        console.log(error);
    });
}