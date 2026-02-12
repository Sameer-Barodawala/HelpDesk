import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import TicketList from './components/TicketList/TicketList';
import TicketDetail from './components/TicketDetail/TicketDetail';
import CreateTicket from './components/CreateTicket/CreateTicket';
import './styles/App.css';

function App() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
    console.log(import.meta.env.VITE_API_URL);
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tickets`);
      const data = await response.json();
      setTickets(data);
      if (data.length > 0 && !selectedTicket) {
        setSelectedTicket(data[0]);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData),
      });
      const newTicket = await response.json();
      setTickets([newTicket, ...tickets]);
      setSelectedTicket(newTicket);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket');
    }
  };

  const handleUpdateTicket = async (ticketId, updates) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedTicket = await response.json();
      
      setTickets(tickets.map(t => t.id === ticketId ? updatedTicket : t));
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(updatedTicket);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Failed to update ticket');
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!confirm('Are you sure you want to delete this ticket?')) {
      return;
    }

    try {
      await fetch(`/api/tickets/${ticketId}`, {
        method: 'DELETE',
      });
      
      const updatedTickets = tickets.filter(t => t.id !== ticketId);
      setTickets(updatedTickets);
      
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(updatedTickets[0] || null);
      }
    } catch (error) {
      console.error('Error deleting ticket:', error);
      alert('Failed to delete ticket');
    }
  };

  const handleAddReply = async (ticketId, reply) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reply),
      });
      const updatedTicket = await response.json();
      
      setTickets(tickets.map(t => t.id === ticketId ? updatedTicket : t));
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket(updatedTicket);
      }
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Failed to add reply');
    }
  };

  return (
    <div className="app">
      <Sidebar 
  isOpen={sidebarOpen} 
  onClose={() => setSidebarOpen(false)}
  onToggle={() => setSidebarOpen(!sidebarOpen)}
/>
      <div className="main-content">
        <Header 
          onCreateClick={() => setShowCreateModal(true)}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <div className="content-area">
          <TicketList 
            tickets={tickets} 
            selectedTicket={selectedTicket}
            onTicketSelect={handleTicketSelect}
            loading={loading}
            searchTerm={searchTerm}
          />
          {selectedTicket ? (
            <TicketDetail 
              ticket={selectedTicket}
              onUpdateTicket={handleUpdateTicket}
              onDeleteTicket={handleDeleteTicket}
              onAddReply={handleAddReply}
            />
          ) : (
            <div className="no-selection">
              <div className="no-selection-content">
                <h2>No Ticket Selected</h2>
                <p>Select a ticket from the list or create a new one</p>
                <button 
                  className="btn-primary"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create New Ticket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateTicket 
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTicket}
        />
      )}
    </div>
  );
}

export default App;