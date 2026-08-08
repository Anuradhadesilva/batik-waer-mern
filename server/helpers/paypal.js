const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: 'sandbox', // or 'live'
  client_id: 'YOUR_PAYPAL_CLIENT_ID',
  client_secret: 'YOUR_PAYPAL_CLIENT_SECRET'
});

module.exports = paypal;
