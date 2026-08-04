class Cart {
  constructor(items = [], coupon = 0) {
    this.items = items;
    this.coupon = coupon;
  }

  addItem(item) {
    return new Cart([...this.items, item], this.coupon);
  }

  removeItem(id) {
    return new Cart(
      this.items.filter((item) => item.id !== id),
      this.coupon,
    );
  }

  updateQuantity(id, qty) {
    return new Cart(
      this.items.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item,
      ),
      this.coupon,
    );
  }

  applyCoupon(percent) {
    return new Cart(this.items, percent);
  }

  getTotal() {
    const total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return total * (1 - this.coupon / 100);
  }
}

let cart = new Cart();
const observers = [];
const history = [];

function addObserver(fn) {
  observers.push(fn);
}

function notifyObservers() {
  observers.forEach((fn) => fn(cart));
}

function setCart(newCart) {
  history.push(cart);
  cart = newCart;

  localStorage.setItem("cart", JSON.stringify(cart));

  notifyObservers();
}

function undo() {
  if (history.length === 0) return;

  cart = history.pop();

  localStorage.setItem("cart", JSON.stringify(cart));

  notifyObservers();
}

const saved = localStorage.getItem("cart");

if (saved) {
  const data = JSON.parse(saved);

  cart = new Cart(data.items, data.coupon);
}

function render(cart) {
  document.getElementById("cart").innerHTML = `
    <h3>Cart</h3>
    
    ${cart.items
      .map((item) => `<p>${item.name} x ${item.quantity}</p>`)
      .join("")}

    <strong>Total: $${cart.getTotal()}</strong>
    `;
}

addObserver(render);

notifyObservers();

document.getElementById("add").onclick = () => {
  setCart(
    cart.addItem({
      id: Date.now(),
      name: "Apple",
      price: 10,
      quantity: 1,
    }),
  );
};

document.getElementById("undo").onclick = undo;
