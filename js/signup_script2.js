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
    let fname = document.getElementById('first-name').value;
    let lname = document.getElementById('last-name').value;
    let phone = document.getElementById('phone').value;
    let e_add = document.getElementById('email').value;
    let passw = document.getElementById('password').value;

    if (window.customer_selected === false){
        let type = "Staff";
        console.log(type);
    } 
    else {
        let type = "Customer";
        console.log(type);
    }

    toJson(fname, lname, phone, e_add, passw, type);
});

function toJson(fname, lname, phone, e_add, passw, type){
    newUser = {
        firstname: fname,
        lastname: lname,
        phoneNum: phone,
        email_add: e_add,
        pwd: passw,
        Type: type
    };

    fetch("https://1zts1kxmh0.execute-api.us-east-1.amazonaws.com/default/SignupUser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(res => {
        if (!res.ok) {
            console.log('Problem');
            return;
        }

        return res.json();
    })
    .then(data => {
        document.getElementById("message-text").innerText = data.message;
        document.getElementById("message-box").style.display = "block";
        setTimeout(() => {
            window.location.href = "index.html";
        }, 3000);
    })
    .catch(error => {
        console.log(error);
    });
}