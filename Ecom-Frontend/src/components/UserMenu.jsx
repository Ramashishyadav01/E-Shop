import React, { useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { BiUser } from 'react-icons/bi';
import { FaShoppingCart, FaUserShield } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '../store/actions';

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAdmin = Boolean(
        user && (
            (Array.isArray(user?.roles) && (user.roles.includes("ROLE_ADMIN") || user.roles.includes("ADMIN"))) ||
            user?.roles === "ROLE_ADMIN" ||
            user?.role === "ADMIN"
        )
    );

    const isSeller = Boolean(
        user && (
            (Array.isArray(user?.roles) && (user.roles.includes("ROLE_SELLER") || user.roles.includes("SELLER"))) ||
            user?.roles === "ROLE_SELLER" ||
            user?.role === "SELLER"
        )
    );

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        handleClose();
        navigate(path);
    };

    const logOutHandler = () => {
        handleClose();
        dispatch(logOutUser(navigate));
    };

    const initial = (user?.username || 'U').charAt(0).toUpperCase();

    return (
        <div className='relative z-30'>
            <button
                type="button"
                aria-label="User menu"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className='sm:border sm:border-slate-400 flex items-center justify-center rounded-full cursor-pointer hover:shadow-md transition text-slate-700 bg-transparent focus:outline-none'
            >
                <Avatar 
                    alt={user?.username || 'User'} 
                    src={user?.avatarUrl || ''}
                    sx={{
                        width: 38,
                        height: 38,
                        bgcolor: '#cbd5e1',
                        color: '#1e293b',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        border: '1px solid #cbd5e1',
                    }}
                >
                    {!user?.avatarUrl && initial}
                </Avatar>
            </button>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: 180,
                            mt: 1,
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            overflow: 'visible',
                            zIndex: 9999,
                        }
                    }
                }}
            >
                <MenuItem 
                    onClick={() => handleNavigate('/profile')}
                    sx={{ gap: 1.5, py: 1 }}
                >
                    <BiUser className='text-xl text-slate-600'/>
                    <span className='font-bold text-sm text-slate-800 truncate'>
                        {user?.username}
                    </span>
                </MenuItem>

                <MenuItem 
                    onClick={() => handleNavigate('/profile/orders')}
                    sx={{ gap: 1.5, py: 1 }}
                >
                    <FaShoppingCart className='text-xl text-slate-600'/>
                    <span className='font-semibold text-sm text-slate-800'>
                        Orders
                    </span>
                </MenuItem>

                {(isAdmin || isSeller) && (
                    <MenuItem 
                        onClick={() => handleNavigate(isAdmin ? '/admin' : '/admin/orders')}
                        sx={{ gap: 1.5, py: 1 }}
                    >
                        <FaUserShield className='text-xl text-slate-600'/>
                        <span className='font-semibold text-sm text-slate-800'>
                            {isAdmin ? "Admin Panel" : "Seller Panel"}
                        </span>
                    </MenuItem>
                )}

                <MenuItem 
                    onClick={logOutHandler}
                    sx={{ pt: 1, pb: 0.5 }}
                >
                    <div className='font-semibold w-full flex gap-2 items-center justify-center bg-button-gradient px-4 py-1.5 text-white rounded text-sm hover:opacity-95 transition'>
                        <IoExitOutline className='text-lg'/>
                        <span>LogOut</span>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
