import getRawBody from "raw-body";
import Stripe from "stripe";
import Order from "../models/order";
import APIFilters from "../utils/APIFilters";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const myOrders = async (req, res) => {
  const resPerPage = 3;
  const ordersCount = await Order.countDocuments();
  const apiFilters = new APIFilters(Order.find(), req.query).pagination(
    resPerPage
  );

  const orders = await apiFilters.query
    .find({ user: req.user._id })
    .populate("shippingInfo user");

  res.status(200).json({
    ordersCount,
    resPerPage,
    orders,
  });
};

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

export function getCartItems(line_items) {
  return new Promise((resolve, reject) => {
    let cartItems = [];
    line_items?.data?.forEach(async (item) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
}

export const webhook = async (req, res) => {
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const line_items = await stripe.checkout.sessions.listLineItems(
        event.data.object.id
      );

      const orderItems = await getCartItems(line_items);
      const userId = session.client_reference_id;
      const amountPaid = session.amount_total / 100;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
        amountPaid,
        taxPaid: session.total_details.amount_tax / 100,
      };

      const orderData = {
        user: userId,
        shippingInfo: session.metadata.shippingInfo,
        paymentInfo,
        orderItems,
      };

      const order = await Order.create(orderData);
      res.status(201).json({ success: true });
    }
  } catch (error) {
    console.log(error);
  }
};
