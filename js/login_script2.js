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
    let email = document.getElementById('ID').value;
    let type = "Customer";

    if (window.customer_selected === false){
        type = "Staff";
        console.log(type);
        toJson(passw, id, type);
    } else {
        let type = "Customer";
        console.log(type);
        toJson(passw, email, type);
    }
});

function toJson(passw, email, type){
    newUser = {
        Email: email,
        pwd: passw,
        Type: type
    };

    console.log("Sending Data:", newUser);

    fetch("https://i183horz37.execute-api.us-east-1.amazonaws.com/default/CustGetIt", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response Data:", data);
        if (data.success) {
            if (data.token) {
                localStorage.setItem('jwt_token', data.token);
            }
            window.location.href = data.redirect_url;  
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error("Fetch Error:", error);
    });
}