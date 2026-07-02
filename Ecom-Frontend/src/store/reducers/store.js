
import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";
import { adminReducer } from "./adminReducer";
import { orderReducer } from "./orderReducer";
import { sellerReducer } from "./sellerReducer";

const safeGetLocalStorage = (key) => {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
};

const safeParseJSON = (value, fallback) => {
    try {
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
};

const user = safeParseJSON(safeGetLocalStorage("auth"), null);
const cartItems = safeParseJSON(safeGetLocalStorage("cartItems"), []);
const selectUserCheckoutAddress = safeParseJSON(safeGetLocalStorage("CHECKOUT_ADDRESS"), null);

const initialState = {
    auth: { user, selectUserCheckoutAddress },
    carts: { cart: cartItems },
};

export const store = configureStore({
    reducer: {
        products: productReducer,
        errors: errorReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer,
        admin: adminReducer,
        order: orderReducer,
        seller: sellerReducer,
    },
    preloadedState: initialState,
});

export default store;