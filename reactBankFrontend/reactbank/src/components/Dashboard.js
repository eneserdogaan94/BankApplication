import React from 'react';
import Header from './Header';
import Menubar from './Menubar';

function Dashboard() {
    return (
        <div className="dashboard">
            <Header />
            <Menubar />
            <div className="content">
                {/* Dashboard içeriği buraya gelecek */}
            </div>
        </div>
    );
}

export default Dashboard;