import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import "./config/MongoConnect.js";
import productRouter from "./Routers/ProductRouter.js";
import categoryRouter from "./Routers/CategoryRouters.js";
import usersRouter from "./Routers/UserRouters.js";
import ordersRouter from "./Routers/OrdersRouters.js";
import authJwt from "./helpers/jwt.js";
import errorHandler from "./helpers/error-handler.js";

dotenv.config();
const app = express();

// MIDDLEWARE
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);
const __dirname = path.join();
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
const api = process.env.API_URL;
const Port = process.env.PORT;

// ROUTERS
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, usersRouter);
app.use(`${api}/orders`, ordersRouter);

// development
// app.listen(Port, () => {
//   console.log(`Example app listening at http://localhost:${Port}`);
// });

// production
// development
var server = app.listen(Port, () => {
  let port = server.address().port;
  console.log(`express is working ${port}`);
});
