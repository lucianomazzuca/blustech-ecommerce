const PaymentController = require('./controller/paymentController');
const configurePaymentRouter = require('./route/paymentRoute');

function initPaymentModule(app, container) {
  const configureRouter = container.resolve('configurePaymentRouter');
  const paymentRouter = configureRouter(container.cradle);
  app.use('/payment', paymentRouter);
}

module.exports = {
  PaymentController,
  configurePaymentRouter,
  initPaymentModule
}