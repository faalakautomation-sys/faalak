# 🎨 Faalak Frontend

React + Vite + Tailwind CSS frontend for the Faalak website. Beautiful UI with Retell AI integration.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Update `VITE_API_URL` if your backend is running on a different port/domain:
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Start Development Server

**Important:** Make sure backend is running first!
```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Output goes to `dist/` folder - ready to deploy!

## Project Structure

```
Faalak-Frontend/
├── src/
│   ├── api/
│   │   └── client.js       - API client (connects to backend)
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── OurWork.jsx
│   │   ├── OutboundCallSection.jsx
│   │   ├── RetellChatbot.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── Services.jsx
│   │   ├── Teams.jsx
│   │   ├── ThemeToggleBtn.jsx
│   │   ├── Title.jsx
│   │   └── TrustedBy.jsx
│   ├── assets/
│   │   └── assets.js       - Static data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/                 - Static files
├── package.json
├── vite.config.js
└── README.md
```

## Features

✅ **Beautiful UI** - Tailwind CSS with dark mode
✅ **Smooth Animations** - Motion/React library
✅ **Call Requests** - Form to request demo calls
✅ **Chat Widget** - Floating chat interface
✅ **Responsive Design** - Works on all devices
✅ **Fast Build** - Vite for quick development
✅ **Backend Integration** - Connects to API backend

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Preview build locally
npm run preview

# Lint code
npm run lint
```

## Environment Variables

```env
# Backend API URL (required)
REACT_APP_API_URL=http://localhost:3001/api
```

## Backend Dependency

This frontend requires the **Faalak Backend** to be running:
```bash
cd ../Faalak-Backend
npm install
npm run dev
```

Backend runs on port 3001 by default.

## Troubleshooting

**Q: "API error" when submitting form?**
A: Make sure backend is running on port 3001. Check `VITE_API_URL` in `.env`

**Q: Vite port already in use?**
A: Port 5173 is in use. Vite will automatically use the next available port.

**Q: Dark mode not working?**
A: Check theme toggle button in top-right corner

**Q: Chatbot messages not saving?**
A: Ensure backend is running and Supabase is configured

## Development Tips

- Frontend watches changes automatically with Vite
- Hot Module Reload (HMR) enabled for instant updates
- Check browser console (F12) for errors
- Verify backend is running: Visit `http://localhost:3001/api/health`

## Production Deployment

1. Build: `npm run build`
2. Upload `dist/` folder to hosting (Vercel, Netlify, etc.)
3. Update `VITE_API_URL` to your production backend domain
4. Rebuild and redeploy

## Support

For issues:
1. Check browser console (F12) for error messages
2. Verify backend is running
3. Check that Supabase credentials are correct
4. See main project documentation

## Related Projects

- **Faalak-Backend** - Express API server
- **SUPABASE_SETUP.sql** - Database schema
