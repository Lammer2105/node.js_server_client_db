const data = require("sqlite-sync");
data.connect("shop_list_with_basket.db");

function addItemToBasket(customer_code, item_code, amount) {
  if (
    data.run(
      `select count(*) as cnt from basket where customer_code = ${customer_code} and item_code = ${item_code}`
    )[0].cnt > 0
  ) {
    console.log("Item already exists in basket");
    return;
  }
  data.insert(
    "basket",
    {
      item_code: item_code,
      customer_code: customer_code,
      amount: amount,
    },
    (callback) => {
      if (callback.error) {
        console.log("Error to add item to basket");
        return;
      }
      console.log("Item added");
    }
  );
} // додати товар до корзини

function removeItemFromBasket(item_code, customer_code) {
  var amount = data.run(
    `select amount from basket where item_code = ${item_code} and cusomer_code = ${customer_code}`
  )[0].amount;
  if (amount > 1) {
    data.update(
      "basket",
      {
        amount: amount - 1,
      },
      {
        item_code: item_code,
        customer_code: customer_code,
      },
      (callback) => {
        if (callback.error) {
          console.log("Error to remove item");
          return;
        }
        console.log("Item removed");
      }
    );
  } else if (amount == 1) {
    data.delete(
      "basket",
      {
        item_code: item_code,
        customer_code: customer_code,
      },
      (callback) => {
        if (callback.error) {
          console.log("Error to remove item");
          return;
        }
        console.log("Item removed");
      }
    );
  } else {
    console.log("Error to remove item: item not exists");
  }
} // видалити товар з корзини

function purchase(customer_name) {
  var basket = data.run("select * from basket where customer_code = ?", [
    getCustomer(customer_name).code,
  ]);
  for (let i = 0; i < basket.length; i++) {
    const element = basket[i];
    data.insert(
      "purchases",
      {
        item_code: element.item_code,
        customer_code: element.customer_code,
        amount: element.amount,
      },
      (callback) => {
        if (callback.error) {
          console.log("Error to add purchase");
          return;
        }
        console.log("Purchase added");
      }
    );
    data.delete(
      "basket",
      {
        item_code: element.item_code,
        customer_code: element.customer_code,
      },
      (callback) => {
        if (callback.error) {
          console.log("Error to delete basket item");
          return;
        }
        console.log("Basket item added");
      }
    );
  }
} //купити

function basketToString(customer_code) {
  var count_of_items = data.run(
    `select count(*) as cnt from basket where customer_code = ${customer_code}`
  )[0].cnt;
  if (count_of_items < 1) {
    return "empty";
  }
  var basket = data.run(
    `select * from basket where customer_code = ${customer_code}`
  );
  let str = "";
  for (let i = 0; i < basket.length; i++) {
    let item = data.run(
      `select name from items where code = ${basket[i].item_code}`
    );
    str += " Item: " + item[0].name;
    str += " Amount: " + basket[i].amount + "\n";
  }
  return str;
} // вивести корзину покупця

function writeItems() {
  fs.writeFile(
    "items.json",
    JSON.stringify(data.run("select * from items")),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
} //записати в файл продукти

function writeCustomers() {
  fs.writeFile(
    "customers.json",
    JSON.stringify(data.run("select * from customers")),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
} //записати в файл клієнтів

function writePurchases() {
  fs.writeFile(
    "purchases.json",
    JSON.stringify(data.run("select * from purchases")),
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
} //записати в файл покупки

function getItem(name) {
  return data.run("select code from items where name = ?", [name]);
} //отримати продукт

function getCustomer(name) {
  return data.run("select * from customers where name = ?", [name]);
} //отримати клієнта

function readBaskets() {
  let str = "";
  var customers = data.run("select * from customers");
  for (let i = 0; i < customers.length; i++) {
    const element = customers[i];
    str =
      str + "\n" + element.name + "`s Cart: \n" + basketToString(element.code);
  }
  console.log(str);
} //вивести всі корзини

function readItems() {
  fs.readFile("items.json", function (err, content) {
    console.log(content.toString());
  });
} //вивести файл з продуктами

function readCustomers() {
  fs.readFile("customers.json", function (err, content) {
    console.log(content.toString());
  });
} //вивести файл з клієнтами

function readPurchases() {
  fs.readFile("purchases.json", function (err, content) {
    console.log(content.toString());
  });
} //вивести файл з покупками
addItemToBasket(getCustomer("Lev")[0].code, getItem("Onion")[0].code, 100);
addItemToBasket(getCustomer("Lev")[0].code, getItem("Limonade")[0].code, 200);
addItemToBasket(getCustomer("Vlad")[0].code, getItem("Cucumbers")[0].code, 200);
addItemToBasket(getCustomer("Vlad")[0].code, getItem("Banana")[0].code, 50);
addItemToBasket(getCustomer("Sofia")[0].code, getItem("Onion")[0].code, 100);
addItemToBasket(getCustomer("Sofia")[0].code, getItem("Carrot")[0].code, 300);
addItemToBasket(getCustomer("Dima")[0].code, getItem("Lamb")[0].code, 70);
addItemToBasket(getCustomer("Dima")[0].code, getItem("Bread")[0].code, 100);

purchase("Lev");
purchase("Arsenyuk");
purchase("Vlad");

readBaskets();
