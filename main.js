let customers = [];//масив клієнтів
let items = [];//масив продуктів
let purchases = [];//масив покупок
class ShoppingCart {
    constructor(items, amounts) {
        this.items = items;
        this.amounts = amounts;
    }

    addItem(item, amount) {
        this.amounts.push(amount);
        this.items.push(item);
    }

    removeItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === item) {
                this.items.splice(i, 1);
                this.amounts.splice(i, 1);
            }
        }
    }

    toString() {
        if (this.amounts.length === 0) {
            return "empty";
        }
        let str = "";
        for (let i = 0; i < this.amounts.length; i++) {
            str += " Item: " + this.items[i];
            str += " Amount: " + this.amounts[i] + "\n";
        }
        return str;
    }

    static fromJson(json) {
        let items = json.items;
        let items2 = [];
        let amounts2 = [];
        let amounts = json.amounts;
        items.forEach((item) => {
            items2.push(Item.fromJson(items.item));
        })
        amounts.forEach((item) => {
            amounts2.push(items.item);
        })
        return new ShoppingCart(items2, amounts2);
    }

}//клас корзини
class Customer {
    constructor(name, surname, address, personal_number) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.personal_number = personal_number;
        this.shoppingCart = new ShoppingCart([], []);
    }

    static fromJson(json) {
        let name = json.name;
        let surname = json.surname;
        let address = json.address;
        let personal_number = json.personal_number;
        let shoppingCart = json.shoppingCart;
        return new Customer(name, surname, address, personal_number, shoppingCart);
    }

    toString() {
        return " Name:" + this.name +
            ", Surname:" + this.surname +
            ", Address:" + this.address +
            ", Personal number:" + this.personal_number +
            ", Cart:" + this.shoppingCart.toString() + "\n"
    }

    addToShoppingCart(item, amount) {
        if (item != null) {
            this.shoppingCart.addItem(item, amount);
        } else {
            console.log("Item does not exist");
        }
    }

    deleteFromShoppingCart(item) {
        if (item != null) {
            this.shoppingCart.removeItem(item);
        } else {
            console.log("Item does not exist");
        }
    }
}//клас клієнта
class Item {
    constructor(name, category, price, code) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.code = code;
    }

    toString() {
        return " Name:" + this.name +
            ", Category:" + this.category +
            ", Price:" + this.price +
            ", Code:" + this.code + "\n"
    }

    static fromJson(json) {
        let name = json.name;
        let category = json.category;
        let price = json.price;
        let code = json.code;
        return new Item(name, category, price, code);
    }
}//клас продукту
class Purchase {
    constructor(customer) {
        this.customer = customer;
        this.itemList = customer.shoppingCart;
    }

    toString() {
        return " Buyer:" + this.customer.toString() +
            ", Products:" + this.itemList.toString()
    }
}//клас покупки
const fs = require("fs")

function addCustomer(name, surname, address, personal_number) {
    customers.push(new Customer(name, surname, address, personal_number, []));
}//додавання клієнта
function searchCustomers(text) {
    let ar = [];
    customers.forEach((customer) => {
        if ((customer.name === text) || (customer.surname === text) || (customer.address ===
            text) || (customer.personal_number === text)) {
            ar.push(customer);
        }
    })
    console.log(ar.toString())
}//пошук клієнтів
function getCustomer(text) {
    let cust = null;
    customers.forEach((customer) => {
        if ((customer.name === text.toString()) || (customer.surname === text.toString()) || (customer.address ===
            text.toString()) || (customer.personal_number === text.toString())) {
            cust = customer;
        }
    })
    return cust;
}//отримати клієнта

function addItems(name, category, price, code) {
    items.push(new Item(name, category, price, code));
}//додати продукт
function getItem(text) {
    let it = null;
    items.forEach((item) => {
        if ((item.name === text) || (item.category === text) || (item.price ===
            text) || (item.code === text)) {
            it = new Item(item.name, item.category, item.price, item.code);
        }
    })
    return it;
}//отримати продукт
function searchItems(text) {
    let ar = [];
    items.forEach((item) => {
        if ((item.name === text) || (item.category === text) || (item.price ===
            text) || (item.code === text)) {
            ar.push(item);
        }
    })
    console.log(ar.toString())
}//пошук продуктів

function readShoppingCarts() {
    let str = '';
    customers.forEach((customer) => {
        str += customer.name + "`s Cart: " + customer.shoppingCart.toString() + "\n";
    })
    console.log(str);
}//вивести всі корзини

function purchase(customer) {
    customer = getCustomer(customer);
    if (customer != null) {
        purchases.push(new Purchase(customer));
        customer.shoppingCart = [];
    } else {
        console.log("Customer does not exist");
    }
}//купити

function writeItems() {
    let data = JSON.stringify(items, null, '\t');
    fs.writeFile("items.json", data, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}//записати в файл продукти
function writeCustomers() {
    let data = JSON.stringify(customers, null, '\t');
    fs.writeFile("customers.json", data, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}//записати в файл клієнтів
function writePurchases() {
    let data = JSON.stringify(purchases, null, '\t');
    fs.writeFile("purchases.json", data, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}//записати в файл покупки

function readItems() {
    fs.readFile('items.json', function (err, data) {
        console.log(data.toString())
    });
}//вивести файл з продуктами
function readCustomers() {
    fs.readFile('customers.json', function (err, data) {
        console.log(data.toString())
    });
}//вивести файл з клієнтами
function readPurchases() {
    fs.readFile('purchases.json', function (err, data) {
        console.log(data.toString())
    });
}//вивести файл з покупками

addCustomer("Lev", "Svitelskiy", "Obolon", 43213);
addCustomer("Sofia", "Fedor", "Obsch 8", 43742);
addCustomer("Vlad", "Polishhuk", "Obsch 6", 83912);
addCustomer("Dima", "Arsenyuk", "Solomen", 38183);

addItems("Bread", "Bakery", 10, 183132743);
addItems("Lamb", "Meat", 113, 787129386);
addItems("Limonade", "Beverages", 24, 381937632);
addItems("Carrot", "Vegetables", 7.99, 8132875312);
addItems("Onion", "Vegetables", 5.56, 183132743);
addItems("Cucumbers", "Vegetables", 18, 487137432);
addItems("Mango", "Fruits", 159, 375391253);
addItems("Banana", "Fruits", 35, 4913641344);

getCustomer("Lev").addToShoppingCart(getItem("Onion"), 1);
getCustomer("Lev").addToShoppingCart(getItem("Limonade"), 2);
getCustomer("Vlad").addToShoppingCart(getItem("Cucumbers"), 2);
getCustomer("Vlad").addToShoppingCart(getItem("Banana"), 0.5);
getCustomer("Sofia").addToShoppingCart(getItem("Onion"), 1);
getCustomer("Sofia").addToShoppingCart(getItem("Carrot"), 3);
getCustomer("Dima").addToShoppingCart(getItem("Lamb"), 0.7);
getCustomer("Dima").addToShoppingCart(getItem("Bread"), 1);

readShoppingCarts();
purchase("Lev");
purchase("Arsenyuk");
purchase("Vlad");
// Sofia added item to cart but haven't purchased yet

searchCustomers("Sofia");
searchItems("Vegetables")
