const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
  const { plan } = req.body;

  const prices = {
    monthly: { amount: 49900, name: 'Monthly Plan' },
    quarterly: { amount: 89900, name: 'Quarterly Plan' },
    yearly: { amount: 149900, name: 'Yearly Plan' },
  };

  const selected = prices[plan.toLowerCase()];
  if (!selected) return res.status(400).json({ error: 'Invalid plan' });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: selected.name,
          },
          unit_amount: selected.amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/cancel',
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
