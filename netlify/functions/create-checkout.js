const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

exports.handler = async (event) => {
  const {
    size, name, phone, email, notes,
    pickupDate, pickupTime, selectedSushi, type
  } = JSON.parse(event.body || '{}')

  const priceId =
    size === 'large'
      ? 'price_1RKAqqRvb17p84Tx07a506ji'
      : 'price_1RKAqQRvb17p84Tx3BP3I0ic'

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: 'https://sushibada.netlify.app/success',
      cancel_url: 'https://sushibada.netlify.app/reserve',
      metadata: {
        name,
        phone,
        email,
        notes: notes || '',
        pickupDate,
        pickupTime,
        type,
        sushi: Array.isArray(selectedSushi) ? selectedSushi.join(', ') : '',
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: session.url,
        pickupCode: session.id // ✅ 用 session.id 作为唯一码
      }),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}
