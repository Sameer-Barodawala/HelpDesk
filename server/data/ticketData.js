import { readData, writeData } from '../utils/fileStorage.js';

export const getAllTickets = () => {
  const data = readData();
  return data.tickets || [];
};

export const getTicketById = (id) => {
  const tickets = getAllTickets();
  return tickets.find(t => t.id === id);
};

export const createTicket = (ticketData) => {
  const data = readData();
  const tickets = data.tickets || [];
  
  // Generate unique ID
  const timestamp = Date.now();
  const newTicket = {
    id: `TICKET-${timestamp}`,
    title: ticketData.title || 'Untitled Ticket',
    status: ticketData.status || 'To Do',
    priority: ticketData.priority || 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    project: ticketData.project || 'General',
    type: ticketData.type || 'Task',
    description: ticketData.description || '',
    assignee: ticketData.assignee || {
      name: 'Unassigned',
      email: '',
      avatar: 'https://i.pravatar.cc/40?img=0'
    },
    assignees: ticketData.assignees || [],
    reporter: ticketData.reporter || {
      name: 'System',
      email: 'system@helpdesk.com',
      avatar: 'https://i.pravatar.cc/40?img=1'
    },
    customer: ticketData.customer || {
      name: 'Unknown',
      email: '',
      avatar: 'https://i.pravatar.cc/40?img=0'
    },
    commentCount: 0,
    watchers: 1,
    replies: [],
    tags: ticketData.tags || [],
    dueDate: ticketData.dueDate || null
  };
  
  tickets.push(newTicket);
  data.tickets = tickets;
  writeData(data);
  
  return newTicket;
};

export const updateTicket = (id, updates) => {
  const data = readData();
  const tickets = data.tickets || [];
  const index = tickets.findIndex(t => t.id === id);
  
  if (index !== -1) {
    tickets[index] = {
      ...tickets[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    data.tickets = tickets;
    writeData(data);
    return tickets[index];
  }
  
  return null;
};

export const deleteTicket = (id) => {
  const data = readData();
  const tickets = data.tickets || [];
  const filteredTickets = tickets.filter(t => t.id !== id);
  
  if (filteredTickets.length < tickets.length) {
    data.tickets = filteredTickets;
    writeData(data);
    return true;
  }
  
  return false;
};

export const addReply = (id, reply) => {
  const data = readData();
  const tickets = data.tickets || [];
  const ticket = tickets.find(t => t.id === id);
  
  if (ticket) {
    const newReply = {
      id: `REPLY-${Date.now()}`,
      ...reply,
      timestamp: new Date().toISOString()
    };
    
    if (!ticket.replies) {
      ticket.replies = [];
    }
    
    ticket.replies.push(newReply);
    ticket.commentCount = ticket.replies.length;
    ticket.updatedAt = new Date().toISOString();
    
    data.tickets = tickets;
    writeData(data);
    
    return ticket;
  }
  
  return null;
};

export const deleteReply = (ticketId, replyId) => {
  const data = readData();
  const tickets = data.tickets || [];
  const ticket = tickets.find(t => t.id === ticketId);
  
  if (ticket && ticket.replies) {
    ticket.replies = ticket.replies.filter(r => r.id !== replyId);
    ticket.commentCount = ticket.replies.length;
    ticket.updatedAt = new Date().toISOString();
    
    data.tickets = tickets;
    writeData(data);
    
    return ticket;
  }
  
  return null;
};