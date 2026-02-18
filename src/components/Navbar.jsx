import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sprout, Leaf } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="container nav-content">
                <NavLink to="/" className="logo-text" style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sprout size={28} color="var(--primary)" />
                    <span>SmartAgroAI</span>
                </NavLink>

                <div className="nav-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Home size={18} />
                        Home
                    </NavLink>
                    <NavLink
                        to="/yield"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Sprout size={18} />
                        Yield Prediction
                    </NavLink>
                    <NavLink
                        to="/fertilizer"
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Leaf size={18} />
                        Fertilizer Recommendation
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
