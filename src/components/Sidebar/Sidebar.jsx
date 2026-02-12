import React from 'react';
import { 
  HiHome, 
  HiInbox, 
  HiTicket, 
  HiChartBar, 
  HiUsers, 
  HiFolder, 
  HiCog, 
  HiBookOpen,
  HiFlag, 
  HiClock,
  HiTrendingUp,
  HiAdjustments,
  HiMenuAlt2,
  HiX // Close icon
} from 'react-icons/hi';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, onToggle }) => {
  const menuItems = [
    { icon: HiHome, label: 'Home', active: false },
    { icon: HiInbox, label: 'Inbox', active: false },
    { icon: HiTicket, label: 'Tickets', active: true },
    { icon: HiChartBar, label: 'Reports', active: false },
    { icon: HiUsers, label: 'Customers', active: false },
    { icon: HiFolder, label: 'Projects', active: false },
    { icon: HiCog, label: 'Tools', active: false },
    { icon: HiBookOpen, label: 'Knowledge', active: false },
    { icon: HiFlag, label: 'Goals', active: false },
    { icon: HiClock, label: 'Schedule', active: false },
    { icon: HiTrendingUp, label: 'Analytics', active: false },
    { icon: HiAdjustments, label: 'Settings', active: false },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}
      
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          {/* Hamburger/Close toggle inside sidebar */}
          <button 
            className="sidebar-toggle-btn" 
            onClick={onToggle}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX /> : <HiMenuAlt2 />}
          </button>
          
          <div className="logo">
            <span className="logo-icon">H</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                className={`sidebar-item ${item.active ? 'active' : ''}`}
                title={item.label}
              >
                <IconComponent className="sidebar-icon" />
                {isOpen && <span className="sidebar-label">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;