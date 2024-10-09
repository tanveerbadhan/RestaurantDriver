const orderListWpr = document.querySelector(".orderList");
const orderList = document.querySelectorAll(".orderList .order");
const selectedOrderListWpr = document.querySelector(".selectedOrderList");
const deliverBtn = document.querySelector(".deliverBtn");
deliverBtn.disabled = true;

const handleOrderClick = (order) => {
    const checkbox = order.querySelector("input");
    checkbox.checked = !checkbox.checked;
    handleSelectedOrders();
};

const handleSelectedOrders = () => {
    selectedOrderListWpr.innerHTML = "";
    deliverBtn.disabled = true;
    for (let order of orderList) {
        const customerName = order.querySelector("h3").innerText;
        const orderId = order.querySelector(".orderId").outerHTML;
        const address = order.querySelector(".address").outerHTML;
        const checkbox = order.querySelector("input");
        if (checkbox.checked) {
            deliverBtn.disabled = false;
            selectedOrderListWpr.innerHTML += `
                <li>
                    <h4 class="name">${customerName}</h4>
                    <div>
                        ${address}
                        ${orderId}
                    </div>
                </li>
            `;
        }
    }
};

const handleAddToDelivery = async () => {
    const ids = [];
    for (let order of orderList) {
        const checkbox = order.querySelector("input");
        const orderId = order.querySelector(".orderId").innerHTML;
        const id = orderId.split(":")[1].trim();
        if (checkbox.checked) {
            ids.push(id);
        }
    }

    try {
        const endpoint = "/addtodelivery";
        const fullUrl = window.location.origin + endpoint;
        const response = await fetch(fullUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ids),
        });
        if (response.status === 200) {
            window.location.href = "/delivery";
        }
    } catch (error) {
        console.log(error.message);
    }
};

deliverBtn.addEventListener("click", handleAddToDelivery);
