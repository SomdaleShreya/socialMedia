// MainLayout.js
import React from 'react';

import './MainLayout.scss';
import Sidebar from './Sidebar/Sidebar';

function MainLayout({ children }) {
    return (
        <div className="main-layout">
            <Sidebar />
            <main className="content">
                {children}
            </main>
        </div>
    );
}

export default MainLayout;