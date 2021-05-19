const PaymentController = require('./controller/paymentController');
const PaymentService = require('../payment/service/paymentService');
const configurePaymentRouter = require('./route/paymentRoute');

function initPaymentModule(app, container) {
  const configureRouter = container.resolve('configurePaymentRouter');
  const paymentRouter = configureRouter(container.cradle);
  app.use('/payment', paymentRouter);
}

module.exports = {
  PaymentController,
  PaymentService,
  configurePaymentRouter,
  initPaymentModule
}