import React from 'react';
import { HiMenu, HiSearch, HiQuestionMarkCircle, HiBell } from 'react-icons/hi';
import './Header.css';

const Header = ({ onCreateClick, searchTerm, onSearchChange, onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={onMenuClick}>
          <HiMenu />
        </button>
        <h1 className="header-title">Helpdesk</h1>
      </div>
      <div className="header-center">
        <div className="search-bar">
          <HiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search tickets..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="header-right">
        <button className="btn-primary" onClick={onCreateClick}>
          + Create
        </button>
        <button className="icon-btn" title="Help">
          <HiQuestionMarkCircle />
        </button>
        <button className="icon-btn" title="Notifications">
          <HiBell />
        </button>
        <div className="user-avatar">
          <img src="https://i.pravatar.cc/40?img=1" alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;