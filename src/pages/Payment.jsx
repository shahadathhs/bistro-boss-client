import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "../components/CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  return (
    <div>
      <Helmet>
        <title>Payment | Bistro Boss</title>
      </Helmet>
      <div className="p-2 m-2 border-2 min-h-screen">
        {/* banner */}
        <div className="text-center p-4 space-y-3">
          <p className="text-yellow-400 text-xl">---Hurry Up---</p>
          <hr className="w-[300px] mx-auto border-t-2" />
          <p className="text-2xl">Manage your items</p>
          <hr className="w-[300px] mx-auto border-t-2" />
        </div>
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;