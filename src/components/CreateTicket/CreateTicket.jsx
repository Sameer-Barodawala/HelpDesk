import React, { useState } from 'react';
import './CreateTicket.css';

const CreateTicket = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'To Do',
    type: 'Task',
    project: 'General',
    customerName: '',
    customerEmail: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a ticket title');
      return;
    }

    const ticketData = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      type: formData.type,
      project: formData.project,
      customer: {
        name: formData.customerName || 'Unknown Customer',
        email: formData.customerEmail || 'unknown@example.com',
        avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`
      },
      assignee: {
        name: 'Current User',
        email: 'user@helpdesk.com',
        avatar: 'https://i.pravatar.cc/40?img=1'
      },
      reporter: {
        name: 'Current User',
        email: 'user@helpdesk.com',
        avatar: 'https://i.pravatar.cc/40?img=1'
      }
    };

    onCreate(ticketData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Ticket</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="create-ticket-form">
          <div className="form-group">
            <label htmlFor="title">Ticket Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter ticket title..."
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue or request..."
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">⚠️ Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Task">🎯 Task</option>
                <option value="Bug">🐛 Bug</option>
                <option value="Feature">✨ Feature</option>
                <option value="Question">❓ Question</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="project">Project</label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
              >
                <option value="General">General</option>
                <option value="Administrative">Administrative</option>
                <option value="Technical">Technical</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
              </select>
            </div>
          </div>

          <div className="form-divider"></div>

          <h3 className="section-title">Customer Information</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="customerName">Customer Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="customerEmail">Customer Email</label>
              <input
                type="email"
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;