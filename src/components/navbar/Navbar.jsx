import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import Profile from '../../pages/Profile/Profile';

const Navbar = () => {
    const { user, signOutUser } = use(AuthContext);
    const handleSignOut = () => {
        signOutUser().then(result => console.log(result)).catch(error => console.log(error))
    }
    const navlist = <>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/availablefoods'>Available Foods</NavLink>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm container mx-auto rounded-b-lg z-9 sticky top-0">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <img src="/public/food-sharing.webp" />
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                        {navlist}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">PlateShare</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    {navlist}
                </ul>
            </div>
            <div className="navbar-end">
                {!user ? <button className="btn"><NavLink to='/login'>Login</NavLink></button> : <Profile handleSignOut={handleSignOut}/>}
            </div>
        </div>
    );
};

export default Navbar;