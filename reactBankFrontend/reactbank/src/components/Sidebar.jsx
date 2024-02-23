import React from 'react';
import { BsBank2, BsGrid1X2Fill, BsSendArrowDown, BsClockHistory, BsPeopleFill, BsFillGearFill } from 'react-icons/bs';

function Sidebar({ openSidebarToggle, OpenSidebar, onComponentChange }) {
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
                <li className='sidebar-list-item' onClick={() => onComponentChange('Transaction')}>
                    <BsSendArrowDown className='icon' /> Transaction
                </li>
                <li className='sidebar-list-item' onClick={() => onComponentChange('TransactionList')}>
                    <BsClockHistory className='icon' /> Transaction History
                </li>
                <li className='sidebar-list-item' onClick={() => onComponentChange('AccountSettings')}>
                    <BsPeopleFill className='icon' /> Account Settings
                </li>
                <li className='sidebar-list-item' onClick={() => onComponentChange('Settings')}>
                    <BsFillGearFill className='icon' /> Settings
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;