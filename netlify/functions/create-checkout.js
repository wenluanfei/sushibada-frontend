const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})
const pickupCode = Math.random().toString(36).substring(2, 8).toUpperCase()


exports.handler = async (event) => {
  const { size, name, phone, email, notes, pickupDate, pickupTime, selectedSushi, type } = JSON.parse(event.body || '{}')

  const pickupCode = Math.random().toString(36).substring(2, 8).toUpperCase()  // ✅ 每次请求生成新的

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
        pickupCode, // ✅ 写入元数据
        type,
        sushi: Array.isArray(selectedSushi) ? selectedSushi.join(', ') : '',
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url, pickupCode }), // ✅ 返回给前端保存
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    }
  }
}

console.log('STRIPE_KEY:', process.env.STRIPE_SECRET_KEY)
