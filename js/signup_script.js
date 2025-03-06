document.addEventListener("DOMContentLoaded", function () {
    const staffBtn = document.querySelector(".staff");
    const customerBtn = document.querySelector(".customer");

    function setActive(selected, unselected) {
        selected.classList.add("active");
        selected.classList.remove("inactive");
        unselected.classList.add("inactive");
        unselected.classList.remove("active");
    }

    // Default selection
    setActive(customerBtn, staffBtn);

    staffBtn.addEventListener("click", function () {
        setActive(staffBtn, customerBtn);
    });

    customerBtn.addEventListener("click", function () {
        setActive(customerBtn, staffBtn);
    });
});

const newUser = {
    firstname: getElementById('first-name'),
    lastname: getElementById('last-name'),
    phoneNum: getElementById('phone'),
    email_add: getElementById('email'),
    pwd: getElementById('password'),
};

// URL to be added
fetch('url', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: newUser
}).then(res => {
    if (!res.ok) {
        console.log('Problem');
        return;
    }

    return res.json();
})
.catch(error => {
    console.log(error);
});
