async function getMenu() {
  try {
    let res = await fetch("./data.json");
    if (!res.ok) {
      throw new Error("Failed to fetch menu data");
    }
    let data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
}

function takeOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const randomFood = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * data.length);
          randomFood.push(data[randomIndex]);
        }
        const order = { burgers: randomFood };
        resolve(order);
      } catch (error) {
        reject(error);
      }
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const orderStatus = true;
        const paid = false;
        const order = { orderStatus, paid };
        resolve(order);
      } catch (error) {
        reject(error);
      }
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const orderStatus = true;
        const paid = true;
        const order = { orderStatus, paid };
        resolve(order);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

function thankyouFnc() {
  alert("Thank you for ordering your order is ready");
}

var data = [];

document.addEventListener("DOMContentLoaded", async () => {
  let menues = document.getElementById("menu-container");

  data = await getMenu();
  console.log(data);

  menues.innerHTML = "";

  data &&
    data.forEach((m) => {
      menues.innerHTML += `<div class="food-card">
            <div class="food-img"><img src=${m.imgSrc} /></div>
            <div class="food-info">
              <div class="left">
                <p>${m.name}<br />$${m.price}/-</p>
              </div>
              <div class="right"><img src="./asset/addLogo.svg" /></div>
            </div>
          </div>`;
    });

  try {
    const order = await takeOrder();
    console.log(order);
    const orderPrep1 = await orderPrep();
    console.log(orderPrep1);
    const payOrder1 = await payOrder();
    console.log(payOrder1);
    thankyouFnc();
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
