require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
// setup
app.use(express.json());
app.use(cors());
app.options("*", cors());

// importing routes
const productRoute = require("./routes/product.route");

app.use("/products", productRoute);

app.listen(process.env.SHOP_APP_PORT, (err) => {
  if (err) console.log("Some error occured");
  else console.log(`Server Started at ${process.env.SHOP_APP_PORT}`);
});
