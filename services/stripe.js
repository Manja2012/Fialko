import Stripe from "stripe";
import { env } from "../config.js";

const stripe = new Stripe(env.keyStripe);

export default stripe;
