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