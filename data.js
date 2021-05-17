const data = require("sqlite-sync");
data.connect("shop_list_with_basket.db");
function createTables() {
  data.run(
    `create table if not exists basket(
      item_code integer key,
      customer_code integer key,
      amount integer not null
  )`,
    (callback) => {
      if (callback.error) {
        console.log("error to create basket");
        return;
      }
      console.log("basket succesfully created");
    }
  );
  data.run(
    `create table if not exists purchases(
      item_code integer key,
      customer_code integer key,
      amount integer not null
  )`,
    (callback) => {
      if (callback.error) {
        console.log("error to create purchases");
        return;
      }
      console.log("purchases succesfully created");
    }
  );
  data.run(
    `create table if not exists customers(
      code integer primary key,
      name text not null,
      surname text,
      address text
  )`,
    (callback) => {
      if (callback.error) {
        console.log("error to create customers");
        return;
      }
      console.log("customers succesfully created");
    }
  );
  data.run(
    `create table if not exists items(
      code integer primary key,
      name text not null,
      category text not null,
      price integer not null
  )`,
    (callback) => {
      if (callback.error) {
        console.log("error to create items");
        return;
      }
      console.log("items succesfully created");
    }
  );
}

function addItem(name, category, price, code) {
  data.insert(
    "items",
    {
      code: code,
      name: name,
      category: category,
      price: price,
    },
    (callback) => {
      if (callback.error) {
        console.log("Error to add item");
        return;
      }
      console.log("Item added");
    }
  );
} //додати продукт

function addCustomer(name, surname, address, code) {
  data.insert(
    "customers",
    {
      code: code,
      name: name,
      surname: surname,
      address: address,
    },
    (callback) => {
      if (callback.error) {
        console.log("Error to add customer");
        return;
      }
      console.log("Customer added");
    }
  );
} //додавання клієнта

createTables();

addCustomer("Lev", "Svitelskiy", "Obolon", 43213);
addCustomer("Sofia", "Fedor", "Obsch 8", 43742);
addCustomer("Vlad", "Polishhuk", "Obsch 6", 83912);
addCustomer("Dima", "Arsenyuk", "Solomen", 38183);

addItem("Bread", "Bakery", 1000, 183132743);
addItem("Lamb", "Meat", 11300, 787129386);
addItem("Limonade", "Beverages", 2400, 381937632);
addItem("Carrot", "Vegetables", 799, 8132875312);
addItem("Onion", "Vegetables", 556, 183132744);
addItem("Cucumbers", "Vegetables", 1800, 487137432);
addItem("Mango", "Fruits", 15900, 375391253);
addItem("Banana", "Fruits", 3500, 4913641344);
