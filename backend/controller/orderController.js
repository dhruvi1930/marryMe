import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutSession = async (req, res) => {
  try {
    const body = req.body;

    // Validate that line items are present
    const line_items = body?.items?.map((item) => {
      if (!item.name || !item.price || !item.image || !item.quantity) {
        throw new Error("Missing necessary item details");
      }
      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: { productId: item.product },
          },
          unit_amount: item.price * 100, // Stripe expects amounts in cents
        },
        tax_rates: ["txr_1Qmh91AuTJINJ7Ay9KjS4Mc1"], // Ensure the tax rate exists
        quantity: item.quantity,
      };
    });

    if (!line_items || line_items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const shippingInfo = body?.shippingInfo;

    // Make sure user is authenticated
    if (!req?.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/me/orders?order_success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}`,
      customer_email: req?.user?.email,
      client_reference_id: req?.user?._id.toString(), // Ensure the ID is a string
      mode: "payment",
      metadata: { shippingInfo },
      shipping_options: [
        {
          shipping_rate: "shr_1QmgVuAuTJINJ7Ay2qjpQdLb",
        },
      ],
      line_items,
    });

    // Respond with the session URL
    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating checkout session: ", error);

    // Return the error response with the appropriate message
    res.status(400).json({ error: error.message });
  }
};
