import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdLockReset } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../shared/InputField';
import { useDispatch } from 'react-redux';
import { resetUserPassword } from '../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../shared/Spinners';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const newPassword = watch("newPassword");

    const forgotPasswordHandler = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        const sendData = {
            username: data.username,
            newPassword: data.newPassword,
        };
        dispatch(resetUserPassword(sendData, toast, reset, navigate, setLoader));
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
            <form
                onSubmit={handleSubmit(forgotPasswordHandler)}
                className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md">
                
                <div className="flex flex-col items-center justify-center space-y-4">
                    <MdLockReset className="text-slate-800 text-5xl" />
                    <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
                        Reset Password
                    </h1>
                </div>
                
                <hr className="mt-2 mb-5 text-black" />
                
                <div className="flex flex-col gap-3">
                    <InputField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="*Username is required"
                        placeholder="Enter your registered username"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="New Password"
                        required
                        id="newPassword"
                        min={6}
                        type="password"
                        message="*New Password is required (min 6 chars)"
                        placeholder="Enter new password"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Confirm New Password"
                        required
                        id="confirmPassword"
                        min={6}
                        type="password"
                        message="*Please confirm your new password"
                        placeholder="Confirm new password"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-xs my-3 disabled:opacity-70 mt-5"
                    type="submit">
                    {loader ? (
                        <>
                            <Spinners /> Resetting...
                        </>
                    ) : (
                        "Reset Password"
                    )}
                </button>

                <p className="text-center text-sm text-slate-700 mt-6">
                    Remember your password?
                    <Link
                        className="font-semibold underline hover:text-black ml-1"
                        to="/login">
                        Back to Login
                    </Link>  
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;
