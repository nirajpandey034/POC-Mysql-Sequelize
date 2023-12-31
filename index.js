/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
// setup
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(helmet());

// importing routes
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");
const checkoutRoute = require("./routes/checkout.route");

app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/cart", cartRoute);
app.use("/checkout", checkoutRoute);

app.listen(process.env.SHOP_APP_PORT, (err) => {
  if (err) console.log("Some error occured");
  else console.log(`Server Started at ${process.env.SHOP_APP_PORT}`);
});
