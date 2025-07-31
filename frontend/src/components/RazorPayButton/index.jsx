const RazorPayButton = () => {
  const loadPazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadPazorpayScript();

    if (!res) {
      alert("Failed to load Razorpay SDK.");
      return;
    }

    const options = {
      key: "rzp_test_ysoE0I4q3ohRZL", // Enter the Key ID generated from the Dashboard Key Sceret HI8rodXH7d8ZTLaZYaGyxrf3
      amount: "50000", // Amount is in currency subunits.
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: "order_QzpYmI1X8TFjLr", // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "+919876543210", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay</button>;
};

export default RazorPayButton;
