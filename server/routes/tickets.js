import express from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  addReply,
  deleteReply
} from '../data/ticketData.js';

const router = express.Router();

// GET all tickets
router.get('/', (req, res) => {
  try {
    const tickets = getAllTickets();
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// GET single ticket by ID
router.get('/:id', (req, res) => {
  try {
    const ticket = getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// CREATE new ticket
router.post('/', (req, res) => {
  try {
    const newTicket = createTicket(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// UPDATE ticket
router.patch('/:id', (req, res) => {
  try {
    const updatedTicket = updateTicket(req.params.id, req.body);
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

// DELETE ticket
router.delete('/:id', (req, res) => {
  try {
    const deleted = deleteTicket(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

// ADD reply to ticket
router.post('/:id/replies', (req, res) => {
  try {
    const updatedTicket = addReply(req.params.id, req.body);
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(updatedTicket);
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({ error: 'Failed to add reply' });
  }
});

// DELETE reply from ticket
router.delete('/:ticketId/replies/:replyId', (req, res) => {
  try {
    const { ticketId, replyId } = req.params;
    const updatedTicket = deleteReply(ticketId, replyId);
    if (!updatedTicket) {
      return res.status(404).json({ error: 'Ticket or reply not found' });
    }
    res.json(updatedTicket);
  } catch (error) {
    console.error('Error deleting reply:', error);
    res.status(500).json({ error: 'Failed to delete reply' });
  }
});

export default router;