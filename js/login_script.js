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
    let id = document.getElementById('ID').value;

    if (window.customer_selected === false){
        let url = 'https://2tx0i6zwla.execute-api.us-east-1.amazonaws.com/default/StaffGetIt';
        console.log("Selected Type:", window.customer_selected ? "Customer" : "Staff");
        console.log("ID:", id);
        toJson(passw, id, url);
    } else {
        let url = 'https://i183horz37.execute-api.us-east-1.amazonaws.com/default/CustGetIt';
        console.log("Selected Type:", window.customer_selected ? "Customer" : "Staff");
        console.log("ID:", id);
        toJson(passw, id, url);
    }
});

function toJson(passw, id, url){
    newUser = {
        ID: id,
        pwd: passw
    };

    console.log("Sending Data:", newUser);

    fetch(url, {
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