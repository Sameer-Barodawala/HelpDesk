import React, { useState } from 'react';
import { HiSearch, HiChevronDown, HiAdjustments, HiCheckCircle } from 'react-icons/hi';
import './TicketList.css';

const TicketList = ({ tickets, selectedTicket, onTicketSelect, loading, searchTerm }) => {
  const [localSearch, setLocalSearch] = useState('');

  const filteredTickets = tickets.filter(ticket => {
    const search = (searchTerm || localSearch).toLowerCase();
    return (
      ticket.title.toLowerCase().includes(search) ||
      ticket.id.toLowerCase().includes(search) ||
      ticket.status.toLowerCase().includes(search)
    );
  });

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#ef4444',
      medium: '#f59e0b',
      low: '#10b981'
    };
    return colors[priority] || '#6b7280';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <div className="ticket-list">
      <div className="ticket-list-header">
        <div className="ticket-list-title">
          <button className="dropdown-btn">
            My Tickets
            <HiChevronDown className="dropdown-icon" />
          </button>
          <button className="filter-btn" title="Filter">
            <HiAdjustments />
          </button>
        </div>
        <div className="search-tickets">
          <HiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="search-input-tickets"
          />
        </div>
      </div>

      <div className="tickets-container">
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading tickets...</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="no-tickets">
            <HiCheckCircle className="no-tickets-icon" />
            <p>No tickets found</p>
            <small>Try adjusting your search</small>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`ticket-item ${selectedTicket?.id === ticket.id ? 'selected' : ''}`}
              onClick={() => onTicketSelect(ticket)}
            >
              <div className="ticket-item-header">
                <input 
                  type="checkbox" 
                  className="ticket-checkbox"
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="ticket-title">{ticket.title}</span>
                <span className="ticket-date">{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="ticket-item-meta">
                <span className="ticket-id">{ticket.id}</span>
                <span className={`ticket-status status-${ticket.status.toLowerCase().replace(' ', '-')}`}>
                  {ticket.status}
                </span>
                <div className="ticket-icons">
                  <span 
                    className="priority-indicator" 
                    style={{ backgroundColor: getPriorityColor(ticket.priority) }}
                    title={`Priority: ${ticket.priority}`}
                  ></span>
                  <span className="ticket-assignee">
                    <img src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                  </span>
                  {ticket.commentCount > 0 && (
                    <span className="comment-count">
                      {ticket.commentCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;