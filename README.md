# 🎫 Helpdesk - Ticket Management System

A modern, full-stack helpdesk application for managing support tickets with real-time data persistence.

## ✨ Features

- ✅ **Create, Read, Update, Delete** tickets
- 💬 **Reply System** - Add public replies and private comments
- 🎯 **Priority Management** - Low, Medium, High
- 📊 **Status Tracking** - To Do, In Progress, Done
- 🔍 **Search & Filter** - Find tickets quickly
- 💾 **File Persistence** - All data saved to JSON file
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Real-time Updates** - Instant UI updates

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the backend server** (Terminal 1):
   ```bash
   npm run server
   ```
   Server runs on: http://localhost:5000

3. **Start the frontend** (Terminal 2):
   ```bash
   npm run dev
   ```
   App runs on: http://localhost:3000

4. **Open your browser** and visit:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
helpdesk-app/
├── src/
│   ├── components/
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── TicketList/
│   │   │   ├── TicketList.jsx
│   │   │   └── TicketList.css
│   │   ├── TicketDetail/
│   │   │   ├── TicketDetail.jsx
│   │   │   └── TicketDetail.css
│   │   └── CreateTicket/
│   │       ├── CreateTicket.jsx
│   │       └── CreateTicket.css
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── routes/
│   │   └── tickets.js
│   ├── data/
│   │   ├── ticketData.js
│   │   └── tickets.json (auto-generated)
│   ├── utils/
│   │   └── fileStorage.js
│   └── index.js
├── package.json
├── vite.config.js
└── index.html
```

## 🎯 How to Use

### Creating a Ticket

1. Click **"+ Create"** button in the header
2. Fill in the ticket details:
   - Title (required)
   - Description
   - Priority (Low/Medium/High)
   - Type (Task/Bug/Feature/Question)
   - Customer information
3. Click **"Create Ticket"**

### Viewing Tickets

- All tickets appear in the left panel
- Click any ticket to view details
- Use search bar to filter tickets

### Updating Tickets

- Click on ticket title to edit
- Use dropdowns to change:
  - Status
  - Priority
  - Project
  - Type
  - Due Date

### Adding Replies

1. Select a ticket
2. Choose "Public Reply" or "Private Comment"
3. Type your message
4. Click **"Send"**

### Deleting Tickets

1. Open the ticket
2. Click the 🗑️ (trash) icon
3. Confirm deletion

## 🔧 API Endpoints

### Tickets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tickets` | Get all tickets |
| GET | `/api/tickets/:id` | Get single ticket |
| POST | `/api/tickets` | Create new ticket |
| PATCH | `/api/tickets/:id` | Update ticket |
| DELETE | `/api/tickets/:id` | Delete ticket |

### Replies

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tickets/:id/replies` | Add reply |
| DELETE | `/api/tickets/:ticketId/replies/:replyId` | Delete reply |

## 💾 Data Storage

All ticket data is stored in:
```
server/data/tickets.json
```

This file is automatically created and updated when you:
- Create a ticket
- Update a ticket
- Add replies
- Delete tickets

**Note:** In production, replace this with a proper database (MongoDB, PostgreSQL, etc.)

## 🎨 Customization

### Colors

Edit color variables in component CSS files:

```css
/* Blue theme - change to your brand colors */
--primary: #1d4ed8;
--primary-hover: #1e40af;
```

### Adding Features

The code is organized by component. Each component has:
- Its own folder
- Component file (`.jsx`)
- Styles file (`.css`)

Example: To add a new feature to tickets, edit:
- `src/components/TicketDetail/TicketDetail.jsx`
- `src/components/TicketDetail/TicketDetail.css`

## 🚢 Deployment

### Option 1: Heroku

1. Create `Procfile`:
   ```
   web: node server/index.js
   ```

2. Deploy:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Option 2: Vercel (Frontend) + Railway (Backend)

**Frontend:**
- Deploy to Vercel
- Build command: `npm run build`
- Output: `dist`

**Backend:**
- Deploy to Railway
- Start command: `node server/index.js`

### Option 3: DigitalOcean/AWS

1. Build frontend:
   ```bash
   npm run build
   ```

2. Serve `dist` folder with nginx
3. Run backend with PM2:
   ```bash
   pm2 start server/index.js
   ```

## 🔒 Environment Variables

For production, create `.env`:

```env
PORT=5000
NODE_ENV=production
```

## 🛠️ Development Tips

### Watch for Changes

Both servers auto-reload on file changes:
- Frontend: Vite HMR
- Backend: Restart manually or use `nodemon`

### Debugging

- Check browser console for frontend errors
- Check terminal for backend errors
- API endpoint: `/api/health` for server status

## 📝 Future Enhancements

- [ ] User authentication
- [ ] Real-time updates (WebSockets)
- [ ] File attachments
- [ ] Email notifications
- [ ] Team collaboration
- [ ] Advanced reporting
- [ ] Mobile app



Built with:
- React 18
- Vite
- Express
- Node.js

---

**Happy Ticket Managing! 🎫**