// src/components/checkout/CODPayment.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { placeCODOrder } from '../../store/actions';

const CODPayment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Get the selected address from Redux
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    const handlePlaceOrder = () => {
        if (!selectedUserCheckoutAddress) {
            toast.error("Please select a delivery address first.");
            return;
        }

        // Format the data exactly as your backend placeOrder controller expects
        const sendData = {
            addressId: selectedUserCheckoutAddress.addressId,
            pgName: "COD",
            pgPaymentId: `COD-${Date.now()}`,
            pgStatus: "Pending",
            pgResponseMessage: "Cash on Delivery Chosen"
        };

        dispatch(placeCODOrder(sendData, toast, navigate, setLoading));
    };

    return (
        <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg border mt-6'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>Cash on Delivery</h2>
            <p className='text-gray-600 mb-6 text-center'>
                You can pay in cash to our courier when you receive the goods at your doorstep.
            </p>
            <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className='w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50'
            >
                {loading ? "Placing Order..." : "Confirm & Place Order"}
            </button>
        </div>
    );
};

export default CODPayment;