const orderListWpr = document.querySelector(".orderList");
const orderList = document.querySelectorAll(".orderList .order");
const deliverBtn = document.querySelector(".deliverBtn");
deliverBtn.disabled = true;

const handleOrderClick = (order) => {
    const radio = order.querySelector("input");
    radio.checked = !radio.checked;
    const clickedOrderedId = order.querySelector(".orderId").innerHTML.split(":")[1].trim();

    if (radio.checked) {
        deliverBtn.disabled = false;
    } else {
        deliverBtn.disabled = true;
    }

    for (let order of orderList) {
        const currentOrderId = order.querySelector(".orderId").innerHTML.split(":")[1].trim();
        if (clickedOrderedId !== currentOrderId) {
            const radio = order.querySelector("input");
            radio.checked = false;
        }
    }
};

const handleDelivery = async () => {
    let deliverId = "";
    for (let order of orderList) {
        const radio = order.querySelector("input");
        const orderId = order.querySelector(".orderId").innerHTML;
        const id = orderId.split(":")[1].trim();
        if (radio.checked) {
            deliverId = id;
        }
    }

    try {
        const endpoint = "/deliver";
        const fullUrl = window.location.origin + endpoint;
        const response = await fetch(fullUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ deliverId }),
        });
        if (response.status === 200) {
            location.reload();
        }
    } catch (error) {
        console.log(error.message);
    }
};

deliverBtn.addEventListener("click", handleDelivery);
