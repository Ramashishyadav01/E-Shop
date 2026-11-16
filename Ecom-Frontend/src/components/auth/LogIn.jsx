import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";
import Spinners from "../shared/Spinners";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const quickFill = (username, password) => {
        setValue("username", username, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
        setValue("password", password, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    };

    const loginHandler = async (data) => {
        // data will automatically be formatted as { username: "x", password: "y" }
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                
                <div className="flex flex-col items-center justify-center space-y-4">
                    <AiOutlineLogin className="text-slate-800 text-5xl" />
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Login Here
                    </h1>
                </div>
                
                <hr className="mt-2 mb-5 text-black" />
                
                <div className="flex flex-col gap-3">
                    <InputField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="*UserName is required"
                        placeholder="Enter your username"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Enter your password"
                        register={register}
                        errors={errors}
                    />

                    <div className="flex justify-end -mt-1">
                        <Link
                            to="/forgot-password"
                            className="text-xs font-semibold text-slate-700 hover:text-black underline">
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <div className="mt-4 mb-1">
                    <p className="text-[11px] font-semibold text-slate-500 mb-1.5 text-center uppercase tracking-wider">
                        Quick Fill Details:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            type="button"
                            onClick={() => quickFill("user1", "password1")}
                            className="py-1.5 px-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded border border-slate-300 transition flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                            title="Fill User: user1 / password1"
                        >
                            <span>👤 User</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => quickFill("admin", "adminPass")}
                            className="py-1.5 px-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold rounded border border-purple-200 transition flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                            title="Fill Admin: admin / adminPass"
                        >
                            <span>🛡️ Admin</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => quickFill("seller1", "password2")}
                            className="py-1.5 px-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-medium rounded border border-emerald-200 transition flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                            title="Fill Seller: seller1 / password2"
                        >
                            <span>🏪 Seller</span>
                        </button>
                    </div>
                </div>

                <button
                    disabled={loader}
                    className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3 disabled:opacity-70 cursor-pointer"
                    type="submit">
                    {loader ? (
                        <>
                            <Spinners /> Loading...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>

                <p className="text-center text-sm text-slate-700 mt-6">
                    Don't have an account?
                    <Link
                        className="font-semibold underline hover:text-black ml-1"
                        to="/register">
                        SignUp
                    </Link>  
                </p>
            </form>
        </div>
    );
};

export default LogIn;