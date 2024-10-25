import stripeAPI from "./stripe.js";
import { env } from "../config.js";

const createCheckOutSession = async (req, res) => {
  const domainURL = env.webAppUrl;
  const { line_items, customer_email } = req.body;

  if (!line_items || !customer_email) {
    return res.status(400).json({ error: "parmetres requis" });
  }
  try {
    const session = await stripeAPI.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/cancel`,
      shipping_address_collection: { allowed_countries: ["US", "FR", "GB"] },
    });
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export default createCheckOutSession;

