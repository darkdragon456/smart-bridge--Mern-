import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Stripe from "stripe";

// Place Order via Cash on Delivery
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order details: missing items or address",
      });
    }

    // Calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor((amount * 2) / 100);

    // Create order
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("placeOrderCOD error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Place Order via Stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order details: missing items or address",
      });
    }

    const products = await Promise.all(
      items.map(item => Product.findById(item.product))
    );

    for (let i = 0; i < products.length; i++) {
      if (!products[i]) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${items[i].product}`,
        });
      }
    }

    let amount = 0;
    const productData = items.map((item, index) => {
      amount += products[index].offerPrice * item.quantity;
      return {
        name: products[index].name,
        price: products[index].offerPrice,
        quantity: item.quantity,
      };
    });

    // Add 2% tax
    amount += Math.floor((amount * 2) / 100);

    // Stripe checkout session
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const lineItems = productData.map(item => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.floor(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loader?next=/my-orders`,
      cancel_url: `${origin}/cart`,
    });

    // Create order after successful payment (in webhook ideally)
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Stripe",
      isPaid: true,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully via Stripe",
      sessionId: session.id,
    });
  } catch (error) {
    console.error("placeOrderStripe error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({ userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("getUserOrders error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
