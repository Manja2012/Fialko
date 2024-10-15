import Order from "../models/order.model.js";
import stripe from "../services/stripe.js";

export const addOrder = async (req, res) => {
  try {
    const user = req.user.id;
    const course = req.body.courseId;

    const order = await Order.create({
      ...req.body,
      user,
      course,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Error lors de la création !" });
  }
};

export const validatePayment = async (req, res) => {
  const { sessionId } = req.body;
  const user = req.user;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.status === "complete") {
      const order = await Order.findOne({
        user: user.id,
        course: session.metadata.courseId,
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      order.stripe_session = {
        id: session.id,
        payment_status: session.status,
        created_at: new Date(session.created * 1000),
        customer_email: session.customer_email,
      };

      await order.save();

      res.json({
        status: session.status,
      });
      return;
    }

    throw new Error("Le paiment n’a pas pu etre effectué");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "PAYMENT_ERROR",
      details: error.message,
    });
  }
};
