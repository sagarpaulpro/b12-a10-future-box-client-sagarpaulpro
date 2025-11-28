import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { NavLink } from 'react-router';

const Profile = ({handleSignOut}) => {
    const { user } = useContext(AuthContext);
    console.log(user?.photoURL)
    return (
        <div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src={user?.photoURL} />
                    </div>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li><NavLink to='/add'>Add Food</NavLink></li>
                    <li><NavLink to='/manage'>Manage My Foods</NavLink></li>
                    <li><NavLink to='/request'>My Food Requests</NavLink></li>
                    <li><button className="btn" onClick={handleSignOut}>Logout</button></li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;