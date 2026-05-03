import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/api';
import Loader from '../shared/Loader';

const RazorpayPayment = () => {
  const { totalPrice, cart, cartId } = useSelector((state) => state.carts);
  const { user, selectedUserCheckoutAddress } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleRazorpayPayment = async () => {
    setLoading(true);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error('Failed to load Razorpay. Check your connection.');
      setLoading(false);
      return;
    }

    try {
      const { data: order } = await api.post('/order/razorpay-order');
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'E-Shop',
        description: 'Order Payment',
        order_id: order.id,
        handler: async (response) => {
          try {
            const sendData = {
              addressId: selectedUserCheckoutAddress?.addressId,
              pgName: 'Razorpay',
              pgPaymentId: response.razorpay_payment_id,
              pgStatus: 'succeeded',
              pgResponseMessage: 'Payment successful',
            };
            await api.post('/order/users/payments/online', sendData);
            localStorage.removeItem('CHECKOUT_ADDRESS');
            localStorage.removeItem('cartItems');
            dispatch({ type: 'CLEAR_CART' });
            toast.success('Order placed successfully!');
            navigate('/order-confirm');
          } catch (err) {
            toast.error('Order confirmation failed.');
          }
        },
        prefill: { name: user?.username, email: user?.email },
        theme: { color: '#1C64F2' },
      };
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', () => toast.error('Payment failed. Please try again.'));
      rzp.open();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to create Razorpay order.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRazorpayPayment();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      {loading ? (
        <Loader text="Opening Razorpay..." />
      ) : (
        <>
          <p className="text-slate-700">Click below to pay with Razorpay</p>
          <button
            onClick={handleRazorpayPayment}
            className="bg-custom-blue text-white px-6 py-2 rounded-md font-semibold">
            Pay with Razorpay
          </button>
        </>
      )}
    </div>
  );
};

export default RazorpayPayment;