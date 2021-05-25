const mercadopago = require("mercadopago");

// Mercado pago
mercadopago.configure({
  access_token: process.env.MP_TEST_TOKEN,
});

module.exports = mercadopago;