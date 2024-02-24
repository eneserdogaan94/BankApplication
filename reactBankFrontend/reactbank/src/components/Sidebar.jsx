import React, { useState } from 'react';
import { BsBank2, BsGrid1X2Fill, BsSendArrowDown, BsClockHistory, BsPeopleFill, BsFillGearFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar, onComponentChange }) {
    const [openSubmenu, setOpenSubmenu] = useState(false);
    const [openSubmenu2, setOpenSubmenu2] = useState(false);
    const toggleSubmenu = () => {
        setOpenSubmenu(!openSubmenu);
    };
    const toggleSubmenu2 = () => {
        setOpenSubmenu2(!openSubmenu2);
    };

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <BsBank2 className='icon_header' /> Mini Bank
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item' onClick={() => onComponentChange('Dashboard')}>
                    <BsGrid1X2Fill className='icon' /> Dashboard
                </li>
                <li className='sidebar-list-item' onClick={toggleSubmenu}>
                    <BsSendArrowDown className='icon' /> Transactions
                </li>
                {openSubmenu && (
                    <ul className='sidebar-submenu'>
                        <li className='sidebar-list-item' onClick={() => onComponentChange('MoneyTransfer')}>
                            Money Transfer
                        </li>
                        <li className='sidebar-list-item' onClick={() => onComponentChange('TransactionHistory')}>
                            Transaction History
                        </li>
                    </ul>
                )}
                <li className='sidebar-list-item' onClick={() => onComponentChange('NewAccount')}>
                    <BsPeopleFill className='icon' /> New Account
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;