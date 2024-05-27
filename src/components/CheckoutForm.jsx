import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import moment from "moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState('');
  const [carts, refetch] = useCart();
  const totalPrice = carts.reduce((sum, item) => sum + parseFloat(item.prize), 0);
  console.log(totalPrice)

  useEffect(() => {
    if (totalPrice > 0) { 
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
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setError('');
    }

    // confirm card payment
    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'anonymous' ,
            email: user?.email || 'anonymous' ,
          },
        },
      },
    );

    if (confirmError) {
      console.log('[confirmError]', confirmError);
    } else {
      console.log('[PaymentIntent]', paymentIntent);
      if (paymentIntent.status === 'succeeded') {
        console.log("Transaction Id", paymentIntent.id)
        setTransactionId(paymentIntent.id)
        // Get current UTC date
        const currentUTCDate = moment.utc();
        // Convert and format the date
        const formattedDate = currentUTCDate.format('YYYY-MM-DD HH:mm:ss');

        // now save the payment to database
        const payment = {
          name: user.displayName,
          email: user.email,
          transactionId: paymentIntent.id,
          price: totalPrice,
          data: formattedDate,
          cartIds: carts.map(item => item._id),
          menuIds: carts.map(item => item.oldId),
          status: 'pending'
        }

        const res = await axiosSecure.post('/payments', payment);
        console.log("payment saved",res.data)
        refetch()
        if (res.data.paymentResult.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Your payment completed",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard/paymentHistory')
        }
      }
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
          
      <button type="submit" disabled={!stripe || !clientSecret} 
      className="btn btn-outline btn-sm">
      Pay</button>
      { error && <p className="text-red-500">{error}</p>}
      { transactionId && <p className="text-green-500">Your transaction ID: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;