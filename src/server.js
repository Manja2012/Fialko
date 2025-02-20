import express from "express";
import { dbConnect } from "./dbConnect.js"; 
import { env } from "./config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// ROUTES
import routerContact from "./routes/contact.js";
import routerUser from "./routes/user.js";
import routerCourse from "./routes/course.js";
import routerReview from "./routes/review.js";
import routeStripe from "./routes/stripe.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
export default app;
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
app.use("/api/auth", authRoutes);

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
