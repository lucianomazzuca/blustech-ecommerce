const { useEffect } = require("react");

const checkout = () => {
  const mp = new window.MercadoPago(
    "TEST-f0bf1c2a-736e-49c6-8083-c8dc553ee494",
    {
      locale: "es-AR",
    }
  );

  mp.checkout({
    preference: {
      id: "196224959-983a13f5-a13e-465e-bcc9-13ab09ef70ff",
    },
    render: {
      container: ".summary", // Indicates where the payment button is going to be rendered
      label: "Pagar", // Changes the button label (optional)
    },
  });
};

export default checkout;
