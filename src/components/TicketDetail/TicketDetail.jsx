import React, { useState, useRef } from 'react';
import { 
  HiStar, 
  HiMail, 
  HiEye, 
  HiTrash,
  HiPaperClip,
  HiLink,
  HiPhotograph
} from 'react-icons/hi';
import './TicketDetail.css';

const TicketDetail = ({ ticket, onUpdateTicket, onDeleteTicket, onAddReply }) => {
  const [replyText, setReplyText] = useState('');
  const [replyType, setReplyType] = useState('public');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(ticket.title);
  const textareaRef = useRef(null);

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      onAddReply(ticket.id, {
        text: replyText,
        type: replyType,
        author: {
          name: 'Current User',
          email: 'user@helpdesk.com',
          avatar: 'https://i.pravatar.cc/40?img=1'
        },
        recipient: ticket.customer.name + ' <' + ticket.customer.email + '>'
      });
      setReplyText('');
    }
  };

  const insertTextFormat = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = replyText.substring(start, end);
    const beforeText = replyText.substring(0, start);
    const afterText = replyText.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    setReplyText(newText);

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + before.length + selectedText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleBold = () => insertTextFormat('**', '**');
  const handleItalic = () => insertTextFormat('*', '*');
  const handleUnderline = () => insertTextFormat('<u>', '</u>');
  
  const handleLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      insertTextFormat(`[link](${url})`);
    }
  };

  const handleImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      insertTextFormat(`![image](${url})\n`);
    }
  };

  const handleAttachment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        insertTextFormat(`📎 Attached: ${file.name}\n`);
      }
    };
    input.click();
  };

  const handleStatusChange = (e) => {
    onUpdateTicket(ticket.id, { status: e.target.value });
  };

  const handlePriorityChange = (e) => {
    onUpdateTicket(ticket.id, { priority: e.target.value });
  };

  const handleProjectChange = (e) => {
    onUpdateTicket(ticket.id, { project: e.target.value });
  };

  const handleTypeChange = (e) => {
    onUpdateTicket(ticket.id, { type: e.target.value });
  };

  const handleDueDateChange = (e) => {
    onUpdateTicket(ticket.id, { dueDate: e.target.value });
  };

  const handleTitleUpdate = () => {
    if (editedTitle.trim() && editedTitle !== ticket.title) {
      onUpdateTicket(ticket.id, { title: editedTitle });
    }
    setIsEditing(false);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${displayHours}:${minutes} ${ampm}`;
  };

  return (
    <div className="ticket-detail">
      <div className="ticket-detail-header">
        <div className="ticket-detail-title-section">
          {isEditing ? (
            <div className="title-edit-container">
              <input
                type="text"
                className="title-edit-input"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={handleTitleUpdate}
                onKeyPress={(e) => e.key === 'Enter' && handleTitleUpdate()}
                autoFocus
              />
            </div>
          ) : (
            <h2 
              className="ticket-detail-title"
              onClick={() => setIsEditing(true)}
              title="Click to edit"
            >
              {ticket.title}
            </h2>
          )}
          <div className="ticket-detail-meta">
            <span className="ticket-detail-id">
              <HiStar className="star-icon" /> {ticket.id}
            </span>
            <span className="ticket-detail-created">Created {formatDateTime(ticket.createdAt)}</span>
          </div>
        </div>
        <div className="ticket-detail-actions">
          <button className="icon-btn" title="Send Email">
            <HiMail />
          </button>
          <button className="icon-btn" title="Watchers">
            <HiEye /> <span className="watcher-count">{ticket.watchers || 1}</span>
          </button>
          <select 
            className="btn-status"
            value={ticket.status}
            onChange={handleStatusChange}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button 
            className="icon-btn delete-btn" 
            onClick={() => onDeleteTicket(ticket.id)}
            title="Delete Ticket"
          >
            <HiTrash />
          </button>
        </div>
      </div>

      <div className="ticket-detail-content">
        <div className="ticket-conversation">
          {/* Reply Composer */}
          <div className="reply-composer">
            <div className="reply-tabs">
              <button 
                className={`reply-tab ${replyType === 'public' ? 'active' : ''}`}
                onClick={() => setReplyType('public')}
              >
                Public Reply
              </button>
              <button 
                className={`reply-tab ${replyType === 'private' ? 'active' : ''}`}
                onClick={() => setReplyType('private')}
              >
                Private Comment
              </button>
            </div>
            
            <div className="reply-to">
              To: <span className="recipient">
                <img src={ticket.customer?.avatar || 'https://i.pravatar.cc/40?img=0'} alt={ticket.customer?.name} />
                {ticket.customer?.name || 'Customer'} &lt;{ticket.customer?.email || 'email@example.com'}&gt;
              </span>
            </div>

            <textarea
              ref={textareaRef}
              className="reply-input"
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />

            <div className="reply-toolbar">
              <div className="formatting-tools">
                <button className="tool-btn" title="Bold (Ctrl+B)" onClick={handleBold}>
                  <strong>B</strong>
                </button>
                <button className="tool-btn" title="Italic (Ctrl+I)" onClick={handleItalic}>
                  <em>I</em>
                </button>
                <button className="tool-btn" title="Underline (Ctrl+U)" onClick={handleUnderline}>
                  <u>U</u>
                </button>
                <button className="tool-btn" title="Insert Image" onClick={handleImage}>
                  <HiPhotograph />
                </button>
                <button className="tool-btn" title="Attach File" onClick={handleAttachment}>
                  <HiPaperClip />
                </button>
                <button className="tool-btn" title="Insert Link" onClick={handleLink}>
                  <HiLink />
                </button>
              </div>
              <div className="reply-actions">
                <button 
                  className="btn-send" 
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim()}
                >
                  Send →
                </button>
              </div>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="conversation-thread">
            {ticket.replies && ticket.replies.length > 0 ? (
              ticket.replies.map((reply) => (
                <div key={reply.id} className="reply-message">
                  <div className="reply-header">
                    <img src={reply.author.avatar} alt={reply.author.name} className="reply-avatar" />
                    <div className="reply-info">
                      <span className="reply-author">{reply.author.name}</span>
                      <span className="reply-recipient">To {reply.recipient}</span>
                    </div>
                    <span className="reply-time">{formatDateTime(reply.timestamp)}</span>
                  </div>
                  <div className="reply-body">
                    <p>{reply.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-replies">
                <p>No replies yet. Be the first to respond!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="ticket-sidebar">
          <div className="sidebar-section">
            <label className="sidebar-label">Priority</label>
            <select 
              className="sidebar-select"
              value={ticket.priority}
              onChange={handlePriorityChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Assigned To</label>
            <div className="assigned-user">
              <img src={ticket.assignee?.avatar || 'https://i.pravatar.cc/40?img=0'} alt={ticket.assignee?.name} />
              <span>{ticket.assignee?.name || 'Unassigned'}</span>
            </div>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Project</label>
            <select 
              className="sidebar-select" 
              value={ticket.project}
              onChange={handleProjectChange}
            >
              <option value="General">General</option>
              <option value="Administrative">Administrative</option>
              <option value="Technical">Technical</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Ticket Type</label>
            <select 
              className="sidebar-select" 
              value={ticket.type}
              onChange={handleTypeChange}
            >
              <option value="Task">Task</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Question">Question</option>
            </select>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Due Date</label>
            <input 
              type="date" 
              className="sidebar-input"
              value={ticket.dueDate || ''}
              onChange={handleDueDateChange}
            />
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Reporter</label>
            <div className="assigned-user">
              <img src={ticket.reporter?.avatar || 'https://i.pravatar.cc/40?img=1'} alt={ticket.reporter?.name} />
              <span>{ticket.reporter?.name || 'Unknown'}</span>
            </div>
          </div>

          <div className="sidebar-section">
            <label className="sidebar-label">Tags</label>
            <div className="tags-container">
              {ticket.tags && ticket.tags.length > 0 ? (
                ticket.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))
              ) : (
                <button className="add-tag-btn">+ Add Tag</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
