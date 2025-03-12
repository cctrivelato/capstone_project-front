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
    let randomnum = Math.floor(Math.random() * 90000) + 10000;

    if (window.customer_selected === false){
        let staffID = randomnum.toString();
        let url = 'https://n0etr3vh16.execute-api.us-east-2.amazonaws.com/default/StaffPutItem';
        console.log(staffID);

        toJson(fname, lname, phone, e_add, passw, staffID, url);
    } 
    else {
        let customerID = randomnum.toString();
        let url = 'https://gwgd0snx2l.execute-api.us-east-2.amazonaws.com/default/CustomerPutItem';
        console.log(customerID);

        toJson(fname, lname, phone, e_add, passw, customerID, url);
    }
});

function toJson(fname, lname, phone, e_add, passw, id, url){
    newUser = {
        firstname: fname,
        lastname: lname,
        phoneNum: phone,
        email_add: e_add,
        pwd: passw,
        ID: id
    };

    fetch(url, {
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
    .then(data => console.log("Success:", data))
    .catch(error => {
        console.log(error);
    });
}
