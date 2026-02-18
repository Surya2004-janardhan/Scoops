# SCOOPS - Product Requirements Document

> A social storytelling platform where users share AI-powered micro-stories with music

---

## Glossary (Unique Platform Terminology)

| Term | What It Means | Why This Name |
|------|---------------|---------------|
| **Scoop** | A single story post | Like serving a scoop of ice cream - bite-sized and delightful |
| **Cherry Top** | Trending/popular stories section | The cherry on top - the best of the best |
| **Flavor** | Story category/theme/genre | Different flavors for different tastes |
| **Bowl** | User's saved stories collection | Your personal bowl of favorite scoops |
| **Sprinkles** | Likes on a story | Adding sweetness to someone's scoop |
| **Swirl** | Share a story | Swirling flavors together, spreading the joy |

---

## What Is Scoops?

Scoops is a web app where people share short stories (max 120 words) enhanced by AI. Think of it as Twitter meets creative writing, with a musical twist.

### The Core Idea

1. **You write a story prompt** - give us the vibe, theme, or starting idea
2. **AI helps you craft it** - generates or enhances your story
3. **Add music** - pick a track that sets the mood
4. **Share your Scoop** - publish it for the world to see
5. **Engage with others** - like (sprinkle), comment, share (swirl), and save to your bowl

---

## Key Features

### 1. User Accounts
- Sign up with email and password
- Log in securely with JWT tokens
- Personal profile page showing your scoops and saved stories

### 2. Creating Scoops (Posts)
- **Title**: Catchy headline for your story
- **Story**: AI-assisted content (max 120 words)
- **Music**: Background track URL or selection
- Each scoop gets a unique ID for sharing

### 3. Social Interactions
- **Sprinkles** (Likes): Show love for a story
- **Comments**: Share your thoughts
- **Swirl** (Share): Spread stories to others
- **Save to Bowl**: Bookmark stories for later

### 4. Cherry Top (Trending Section)
- Displays the hottest scoops based on:
  - Number of sprinkles (likes)
  - Comment activity
  - Share count
  - Recency factor
- Updates in real-time or near real-time

### 5. Flavors (Categories/Buckets)
- Stories are grouped by theme/genre
- Examples: Romance, Horror, Sci-Fi, Humor, Drama, Mystery
- Users can browse by flavor to find stories they'll enjoy

### 6. Search & Discovery
- Search stories by keywords
- Search users by username
- Filter by flavor (category)

### 7. Notifications
- Get notified when someone:
  - Sprinkles your scoop
  - Comments on your story
  - Swirls your content

### 8. Analytics (For Users)
- See how your scoops are performing
- Track engagement over time

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React.js | Interactive user interface |
| **Backend** | Node.js + Express.js | API server and business logic |
| **Database** | MongoDB | Store users, scoops, interactions |
| **Auth** | JWT (JSON Web Tokens) | Secure login sessions |
| **AI** | OpenAI GPT API | Story generation and enhancement |
| **Hosting** | Heroku / AWS / DigitalOcean | Production deployment |
| **Version Control** | Git + GitHub | Code management |
| **Testing** | Jest, React Testing Library, Mocha | Automated tests |
| **CI/CD** | GitHub Actions | Automated builds and deploys |

---

## Development Workflow

```
1. Planning     → Define features, create designs
2. Backend      → Build APIs and database
3. Frontend     → Build UI components
4. AI Setup     → Integrate GPT for story generation
5. Testing      → Write and run tests
6. Deploy       → Launch to production
7. Iterate      → Gather feedback, improve
```

---

## User Journey Flow

```mermaid
graph TD
    A[Sign Up / Log In] --> B[Browse Cherry Top & Flavors]
    B --> C{Want to Create?}
    C -->|Yes| D[Write Story Prompt]
    D --> E[AI Generates Content]
    E --> F[Add Title & Music]
    F --> G[Publish Scoop]
    C -->|No| H[Browse Stories]
    H --> I[Read a Scoop]
    I --> J{Like It?}
    J -->|Yes| K[Sprinkle / Comment / Swirl]
    J -->|No| H
    K --> L[Save to Bowl?]
    L --> H
    G --> H
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Log in, get JWT token |
| POST | `/api/auth/logout` | Invalidate session |
| GET | `/api/auth/me` | Get current user info |

### Scoops (Posts)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scoops` | Create new scoop (with AI) |
| GET | `/api/scoops` | Get all scoops (paginated) |
| GET | `/api/scoops/:id` | Get single scoop by ID |
| PUT | `/api/scoops/:id` | Update your scoop |
| DELETE | `/api/scoops/:id` | Delete your scoop |

### Interactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scoops/:id/sprinkle` | Like a scoop |
| DELETE | `/api/scoops/:id/sprinkle` | Unlike a scoop |
| POST | `/api/scoops/:id/comments` | Add comment |
| GET | `/api/scoops/:id/comments` | Get comments |
| DELETE | `/api/comments/:id` | Delete your comment |
| POST | `/api/scoops/:id/swirl` | Share a scoop |

### Cherry Top (Trending)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cherry-top` | Get trending scoops |
| GET | `/api/cherry-top/daily` | Today's top scoops |
| GET | `/api/cherry-top/weekly` | This week's top scoops |

### Flavors (Categories)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/flavors` | List all flavors |
| GET | `/api/flavors/:slug/scoops` | Get scoops by flavor |
| POST | `/api/flavors` | Create flavor (admin) |

### User Profile & Bowl
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:username` | Get user profile |
| GET | `/api/users/:username/scoops` | Get user's scoops |
| GET | `/api/me/bowl` | Get saved scoops |
| POST | `/api/me/bowl/:scoopId` | Save scoop to bowl |
| DELETE | `/api/me/bowl/:scoopId` | Remove from bowl |
| PUT | `/api/me/profile` | Update profile |
| DELETE | `/api/me/account` | Delete account |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search/scoops?q=` | Search stories |
| GET | `/api/search/users?q=` | Search users |

### Notifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | Get user notifications |
| PUT | `/api/notifications/:id/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/me/analytics` | Get your engagement stats |

---

## Database Schemas

### User Model
```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    displayName: {
        type: String,
        maxlength: 50
    },
    bio: {
        type: String,
        maxlength: 160
    },
    avatar: {
        type: String  // URL to profile image
    },
    bowl: [{  // Saved scoops
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Scoop' 
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', UserSchema);
```

### Scoop Model (Post)
```javascript
const mongoose = require('mongoose');

const ScoopSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { 
        type: String, 
        required: true,
        maxlength: 100 
    },
    story: { 
        type: String, 
        required: true,
        maxlength: 700  // ~120 words
    },
    music: { 
        type: String  // URL to music track
    },
    flavor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flavor'
    },
    sprinkleCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    swirlCount: {
        type: Number,
        default: 0
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Scoop', ScoopSchema);
```

### Interaction Model
```javascript
const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
    scoop: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Scoop', 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['sprinkle', 'comment', 'swirl'], 
        required: true 
    },
    commentText: { 
        type: String,
        maxlength: 500
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Prevent duplicate sprinkles
InteractionSchema.index({ scoop: 1, user: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('Interaction', InteractionSchema);
```

### Flavor Model (Category)
```javascript
const mongoose = require('mongoose');

const FlavorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: { 
        type: String,
        maxlength: 200
    },
    color: {
        type: String  // Hex color for UI
    },
    icon: {
        type: String  // Emoji or icon name
    },
    scoopCount: {
        type: Number,
        default: 0
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Flavor', FlavorSchema);
```

### Notification Model
```javascript
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['sprinkle', 'comment', 'swirl', 'follow', 'system'],
        required: true
    },
    scoop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scoop'
    },
    message: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
```

---

## Development Task Checklist

### Phase 1: Project Setup
- [ ] Initialize Node.js project with Express
- [ ] Set up MongoDB connection
- [ ] Configure environment variables (.env)
- [ ] Set up project folder structure
- [ ] Install core dependencies (express, mongoose, jsonwebtoken, bcrypt, cors)
- [ ] Set up React frontend with Create React App or Vite
- [ ] Configure ESLint and Prettier

### Phase 2: Authentication System
- [ ] Create User model with validation
- [ ] Build registration endpoint (POST /api/auth/register)
- [ ] Build login endpoint (POST /api/auth/login)
- [ ] Implement JWT token generation
- [ ] Create auth middleware for protected routes
- [ ] Build password hashing with bcrypt
- [ ] Add email validation
- [ ] Create frontend login page
- [ ] Create frontend registration page
- [ ] Implement token storage (localStorage/cookies)

### Phase 3: Scoop (Post) Management
- [ ] Create Scoop model with validation
- [ ] Build create scoop endpoint (POST /api/scoops)
- [ ] Integrate OpenAI API for story generation
- [ ] Build get all scoops endpoint with pagination
- [ ] Build get single scoop endpoint
- [ ] Build update scoop endpoint
- [ ] Build delete scoop endpoint
- [ ] Add 120-word limit validation
- [ ] Create frontend scoop creation form
- [ ] Create frontend scoop display component
- [ ] Create frontend scoop list/feed view

### Phase 4: Interactions (Sprinkles, Comments, Swirls)
- [ ] Create Interaction model
- [ ] Build sprinkle (like) endpoint
- [ ] Build un-sprinkle endpoint
- [ ] Build add comment endpoint
- [ ] Build get comments endpoint
- [ ] Build delete comment endpoint
- [ ] Build swirl (share) endpoint
- [ ] Update scoop counts on interactions
- [ ] Create frontend like button component
- [ ] Create frontend comment section
- [ ] Create frontend share functionality

### Phase 5: Cherry Top (Trending)
- [ ] Build trending algorithm (likes + comments + recency)
- [ ] Build cherry-top endpoint
- [ ] Add daily/weekly filters
- [ ] Create frontend trending section
- [ ] Add real-time or periodic updates

### Phase 6: Flavors (Categories)
- [ ] Create Flavor model
- [ ] Build get all flavors endpoint
- [ ] Build get scoops by flavor endpoint
- [ ] Seed initial flavors (Romance, Horror, Sci-Fi, etc.)
- [ ] Create frontend flavor selector
- [ ] Create frontend flavor browse page

### Phase 7: User Profiles & Bowl
- [ ] Build get user profile endpoint
- [ ] Build get user's scoops endpoint
- [ ] Build save to bowl endpoint
- [ ] Build remove from bowl endpoint
- [ ] Build update profile endpoint
- [ ] Build delete account endpoint
- [ ] Create frontend profile page
- [ ] Create frontend bowl (saved) page
- [ ] Add avatar upload functionality

### Phase 8: Search & Discovery
- [ ] Build search scoops endpoint
- [ ] Build search users endpoint
- [ ] Add search indexing for performance
- [ ] Create frontend search bar
- [ ] Create frontend search results page

### Phase 9: Notifications
- [ ] Create Notification model
- [ ] Build notification creation logic
- [ ] Build get notifications endpoint
- [ ] Build mark as read endpoints
- [ ] Create frontend notification dropdown
- [ ] Add real-time notifications (WebSocket/polling)

### Phase 10: Testing
- [ ] Write unit tests for auth routes
- [ ] Write unit tests for scoop routes
- [ ] Write unit tests for interaction routes
- [ ] Write integration tests for API
- [ ] Write frontend component tests
- [ ] Set up test database
- [ ] Achieve 70%+ code coverage

### Phase 11: Deployment
- [ ] Set up production MongoDB (Atlas)
- [ ] Configure production environment variables
- [ ] Set up Heroku/AWS/DigitalOcean
- [ ] Configure CI/CD with GitHub Actions
- [ ] Set up SSL certificate
- [ ] Configure CORS for production
- [ ] Run production smoke tests

### Phase 12: Polish & Launch
- [ ] Add loading states and error handling
- [ ] Implement responsive design
- [ ] Add accessibility features (ARIA labels)
- [ ] Optimize images and assets
- [ ] Add rate limiting
- [ ] Set up error logging (Sentry)
- [ ] Write user documentation
- [ ] Create landing page
- [ ] Launch!

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page load time | < 3 seconds |
| API response time | < 500ms |
| Uptime | 99% |
| Mobile responsive | Yes |
| Browser support | Chrome, Firefox, Safari, Edge (last 2 versions) |
| Security | HTTPS, password hashing, JWT expiry |

---

## Future Enhancements (Post-MVP)

- [ ] OAuth login (Google, GitHub)
- [ ] Music integration (Spotify API)
- [ ] Story audio narration (text-to-speech)
- [ ] User following system
- [ ] Direct messaging
- [ ] Story collaborations
- [ ] Premium features / monetization
- [ ] Mobile app (React Native)

