import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";


const CheckoutForm = () => {
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [carts] = useCart();

  useEffect(() => {
    const totalPrice = carts.reduce((sum, item) => sum + parseInt(item.prize) ,0);
    console.log(totalPrice)
    // axiosSecure.post("/create-payment-intent", {price: totalPrice})
    //   .then(res => {
    //     console.log(res.data.clientSecret)
    //     setClientSecret(res.data.clientSecret)
    //   });
    if (totalPrice > 0) { // Ensure totalPrice is a valid number greater than 0
      axiosSecure.post("/create-payment-intent", { price: totalPrice })
        .then(res => {
          console.log("Client Secret:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch(error => {
          console.error('Error creating payment intent:', error);
        });
    } else {
      console.error('Invalid totalPrice:', totalPrice);
    }
  }, [axiosSecure, carts]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-outline btn-sm">
        Pay
      </button>
      { error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default CheckoutForm;