import stripe from "../services/stripe.js";
const router = express.Router();

router.post("/order", async function (req, res) {
  const userId = req.user.id;
  const courseId = req.body.courseId;

  // TODO: create order
});

router.put("/order/payment-date", async function validatePayment(req, res) {
  const { sessionId } = req.body;
  const user = req.user;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.status === "complete") {
      // TODO: retrieve order
      // TODO: save stripe session in the order
      res.json({
        status: session.status,
      });
      return;
    }
    throw new Error("Le paiment n’a pas pu etre effectué");
  } catch (error) {
    res.status(500).json({
      error: "PAYMENT_ERROR",
      details: error.message,
    });
  }
});

export default router;
