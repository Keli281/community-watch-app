# CommunityWatch 

**Connecting Communities, Fixing Neighborhoods**  
*Supporting UN Sustainable Development Goal #11 - Sustainable Cities and Communities*

## Project Overview

CommunityWatch is a zone-based community issue tracking platform that enables residents to report neighborhood problems and allows local administrators to efficiently manage and resolve them. Our platform bridges the gap between citizens and local authorities through technology-enabled civic engagement.

## Live Demo

- **Live Web App**: [[View Live Web App Here](https://communitywatch.vercel.app)]
- **Pitch Deck**: [[View Pitch Deck Here](https://www.canva.com/design/DAG0Rs1xhdM/M9auBv4CtpLwpYWDVO9CnQ/view?utm_content=DAG0Rs1xhdM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h65c9c25458)]

## Features

### For Residents 
- Interactive Map Interface - Click exact locations to report issues
- Anonymous Reporting - No account required
- Real-time Issue Tracking - Monitor resolution progress  
- Community Engagement - Upvote and comment on issues

### For Administrators 
- Centralized Dashboard - View all reported issues
- Status Management - Update issue progress
- Analytics & Insights - Zone statistics and resolution rates
- Priority Setting - Data-driven resource allocation

## Technical Stack

### Frontend
- React.js - user interface components
- Leaflet.js - interactive mapping
- CSS3 - responsive styling

### Backend
- Node.js - runtime environment
- Express.js - web application framework for API requests
- MongoDB - NoSQL database
- Mongoose - MongoDB object modelling

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

## How It Works

1. **Browse Map** - View existing issues on interactive map
2. **Report Problem** - Click location and fill issue details  
3. **Track Progress** - Monitor status updates
4. **Engage** - Support issues through upvotes and comments

## Project Structure

communitywatch-app/
│
├── backend/
│   ├── models/
│   │   ├── Issue.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── issueRoutes.js
│   │   └── authRoutes.js
│   ├── scripts/
│   │   └── setupAdmin.js
│   ├── .env
│   ├── server.js
│
├── public/
│   ├── index.html
│   ├── favicon.png
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── Header.js & Header.css
│   ├── Footer.js & Footer.css
│   ├── Sidebar.js & Sidebar.css
│   ├── MapComponent.js & MapComponent.css
│   ├── IssueForm.js & IssueForm.css
│   └── BrowseIssues.js & BrowseIssues.css
│   ├── LandingPage.js & LandingPage.css
│   ├── About.js & About.css
│   ├── Contact.js & Contact.css
│   ├── AdminLogin.js & AdminLogin.css
│   ├── AdminDashboard.js & AdminDashboard.css
│   ├── PrivacyPolicy.js
│   ├── TermsOfService.js
│   └── LegalPage.css
│   ├── App.js & App.css
│   ├── index.js & index.css
│
├── .env
├── .gitignore
├── vercel.json
├── package.json
└── README.md

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

```bash
git clone https://github.com/yourusername/CommunityWatch.git
cd CommunityWatch
npm install
npm start
cd backend 
node server.js
```

## Future Enhancements
- Image upload for issue evidence
- Mobile app development
- SMS/Email notifications
- Advanced analytics dashboard
- Multi-language support

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Development Team
- Natalie - Full Stack Developer
@Keli281

- Austin - Full Stack Developer
@Hlaustink
