import React, { useState, useRef, useEffect } from 'react';
import { BiUser } from 'react-icons/bi';
import { FaShoppingCart, FaUserShield } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOutUser } from '../store/actions';

const UserMenu = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles?.includes("ROLE_SELLER");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const toggleMenu = () => setOpen((prev) => !prev);
    const handleClose = () => setOpen(false);

    const logOutHandler = () => {
        handleClose();
        dispatch(logOutUser(navigate));
    };

    const initial = (user?.username || 'U').charAt(0).toUpperCase();

    return (
        <div className='relative z-30' ref={menuRef}>
            <button
                type="button"
                aria-label="User menu"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={toggleMenu}
                className='sm:border sm:border-slate-400 flex items-center justify-center rounded-full cursor-pointer hover:shadow-md transition text-slate-700 bg-white focus:outline-none'
            >
                {user?.avatarUrl ? (
                    <img
                        src={user.avatarUrl}
                        alt={user?.username || 'User'}
                        className='w-9 h-9 rounded-full object-cover'
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    style={{ display: user?.avatarUrl ? 'none' : 'flex' }}
                    className='w-9 h-9 rounded-full bg-slate-300 text-slate-700 items-center justify-center font-bold text-sm select-none'
                >
                    {initial}
                </div>
            </button>

            {open && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100 text-slate-700 animate-fadeIn'>
                    <Link
                        to="/profile"
                        onClick={handleClose}
                        className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors'
                    >
                        <BiUser className='text-xl text-slate-600' />
                        <span className='font-bold text-sm truncate'>{user?.username}</span>
                    </Link>

                    <Link
                        to="/profile/orders"
                        onClick={handleClose}
                        className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors'
                    >
                        <FaShoppingCart className='text-xl text-slate-600' />
                        <span className='font-semibold text-sm'>Orders</span>
                    </Link>

                    {(isAdmin || isSeller) && (
                        <Link
                            to={isAdmin ? "/admin" : "/admin/orders"}
                            onClick={handleClose}
                            className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors'
                        >
                            <FaUserShield className='text-xl text-slate-600' />
                            <span className='font-semibold text-sm'>
                                {isAdmin ? "Admin Panel" : "Seller Panel"}
                            </span>
                        </Link>
                    )}

                    <div className='pt-1 px-3'>
                        <button
                            type="button"
                            onClick={logOutHandler}
                            className='font-semibold w-full flex gap-2 items-center justify-center bg-button-gradient px-4 py-1.5 text-white rounded text-sm hover:opacity-95 transition'
                        >
                            <IoExitOutline className='text-lg' />
                            <span>LogOut</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
