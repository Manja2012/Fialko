// import express from "express";
// import mongoose from "mongoose";
// import { env } from "./config.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// // ROUTES
// import routerContact from "./routes/contact.js";
// import routerUser from "./routes/user.js";
// import routerCourse from "./routes/course.js";
// import routerReview from "./routes/review.js";
// import routeStripe from "./routes/stripe.js";

// const app = express();

// // PORT
// const PORT = env.port || 8080;

// // MIDDLEWARE
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     optionsSuccessStatus: 200,
//     credentials: true,
//     origin: env.clientOrigin,
//   })
// );
// app.use(express.static("public"));

// // MIDDLEWARE TO ROUTE
// app.use("/api/contact", routerContact);
// app.use("/api/user", routerUser);
// app.use("/api/course", routerCourse);
// app.use("/api/review", routerReview);
// app.use("/api/stripe", routeStripe);

// // DATABASE MONGOOSE
// mongoose
//   .connect(env.mongoURI, { dbName: "Fialko" })
//   .then(() => {
//     console.log("Connexion à Mongoose réussie !");

//     // LISTEN
//     app.listen(PORT, () => {
//       console.log(`Listening at http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => console.log(error));
import express from "express";
import { dbConnect } from "./dbConnect.js"; // Импорт Singleton
import { env } from "./config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// ROUTES
import routerContact from "./routes/contact.js";
import routerUser from "./routes/user.js";
import routerCourse from "./routes/course.js";
import routerReview from "./routes/review.js";
import routeStripe from "./routes/stripe.js";

const app = express();

// PORT
const PORT = env.port || 8080;

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    optionsSuccessStatus: 200,
    credentials: true,
    origin: env.webAppUrl,
  })
);
app.use(express.static("public"));

// MIDDLEWARE TO ROUTE
app.use("/api/contact", routerContact);
app.use("/api/user", routerUser);
app.use("/api/course", routerCourse);
app.use("/api/review", routerReview);
app.use("/api/stripe", routeStripe);

// DATABASE MONGOOSE
dbConnect()
  .then(() => {
    // LISTEN
    app.listen(PORT, () => {
      console.log(`Listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur lors du lancement du serveur :", error);
  });
