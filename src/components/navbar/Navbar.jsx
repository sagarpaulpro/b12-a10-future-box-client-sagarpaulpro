import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    const navlist = <>
    <NavLink to='/home'>Home</NavLink>
    <NavLink to='/availablefoods'>Available Foods</NavLink>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <img src="/public/food-sharing.webp"/>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navlist}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">PlateShare</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                   {navlist}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn"><NavLink to='/login'>Login</NavLink></button>
            </div>
        </div>
    );
};

export default Navbar;