const {
  getAllProducts,
  getLessThanPrice,
  getGreaterThanPrice,
} = require("../controllers/products");
const mongoose = require("mongoose");
const { getCategory, catGreaterThanPrice, catLessThanPrice } = require("../controllers/category");
const express = require("express");
const router = express.Router();
router.get("/:text", async (req, res) => {
  try {
    let { text } = req.params;
    let searchLessThanRegEX = /^(less than) [0-9]{1,5}$/i;
    let searchGreaterThanRegEX = /^(greater than) [0-9]{1,5}$/i;
    let price = Number(text.split(" ")[2]);
    let productList = await getAllProducts();

    if (
      text.match(searchLessThanRegEX) &&
      typeof price == "number" &&
      !isNaN(price)
    ) {
      let productLessThan = await getLessThanPrice(price);
      res.status(201).json(productLessThan);
      return;
    } else if (
      text.match(searchGreaterThanRegEX) &&
      typeof price == "number" &&
      !isNaN(price)
    ) {
      let productGreaterThan = await getGreaterThanPrice(price);
      res.status(201).json(productGreaterThan);
      return;
    }
    let searchResults = productList.filter((item) => {
      return item.title_en.toLowerCase().includes(text.toLowerCase());
    });
    if (searchResults.length !== 0) {
      res.status(201).json(searchResults);
    } else {
      res.status(404).json("Not Found");
    }
  } catch (err) {
    res.sendStatus(404);
  }
});
router.get("/:id/:text", async (req, res) => {
  let { id, text } = req.params;
  let searchLessThanRegEX = /^(less than) [0-9]{1,5}$/i;
  let searchGreaterThanRegEX = /^(greater than) [0-9]{1,5}$/i;
  let price = Number(text.split(" ")[2]);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const foundCategory = await getCategory(id);

    if (foundCategory) {
      let productList = foundCategory.products;
      if (
        text.match(searchLessThanRegEX) &&
        typeof price == "number" &&
        !isNaN(price)
      ) {
        let productLessThan = await catLessThanPrice(price,id);
        return res.status(201).json(productLessThan);
      } else if (
        text.match(searchGreaterThanRegEX) &&
        typeof price == "number" &&
        !isNaN(price )
      ) {
        let productGreaterThan = await catGreaterThanPrice(price);
        return res.status(201).json(productGreaterThan); 
      }
      let searchResults = productList.filter((item) => {
        return item.title_en.toLowerCase().includes(text.toLowerCase());
      });
      if (searchResults.length !== 0) {
        return res.status(201).json(searchResults); 
        return res.status(404).json("Not Found"); 
      }
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors appropriately
  }
});

module.exports = router;
