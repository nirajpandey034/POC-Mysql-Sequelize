/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// const swaggerUi = require("swagger-ui-express");
// const swaggerFile = require("./swagger_output.json");
const app = express();
// setup
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(helmet());

// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// importing routes
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");

app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/cart", cartRoute);

app.listen(process.env.SHOP_APP_PORT, (err) => {
  if (err) console.log("Some error occured");
  else console.log(`Server Started at ${process.env.SHOP_APP_PORT}`);
});
