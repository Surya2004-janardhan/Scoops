<!--    SCOOPS -->

##SCOOPS

###Description
-- SCOOPS WEB BASED APPLICATION  - USERS  accounts -  users can create accounts and log in to access the platform's features.

-- each post is called a scoop 
-- each posts a story as POST along with  , title , story , music  using AI - users can create and share their stories using AI-generated content, allowing for creative and engaging storytelling.(limit of 120 words for story)

-- users can also interact with other users' stories by liking, commenting, and sharing them, fostering a sense of community and engagement on the platform.

<!-- top stories go into seperate section called breakers  -->
-- the platform will also feature a "breakers" section where the most popular and trending stories are showcased, allowing users to discover and engage with the best content on the platform.

users can save their own and other users stories to their profile for later viewing, creating a personalized collection of favorite stories and content.

-- BUckets -  same alike stories are grouped together in buckets - others users can explore and discover stories based on themes, genres, or topics of interest, making it easier to find content that resonates with them.

##Techincal overiview and tech stack reqs 
-- The application will be built using a modern web development stack, including:
- Frontend: React.js for building the user interface and providing a responsive and interactive experience.
- Backend: Node.js with Express.js for handling server-side logic, API endpoints, and database interactions.
- Database: MongoDB for storing user accounts, posts, comments, and other relevant data.
- Authentication: JWT (JSON Web Tokens) for secure user authentication and session management.
- AI Integration: OpenAI's GPT-3 or similar AI models for generating content based on user input.
- Hosting: The application can be hosted on platforms like Heroku, AWS, or DigitalOcean for scalability and reliability.
- Version Control: Git and GitHub for code management and collaboration among developers.
- Testing: Jest and React Testing Library for frontend testing, and Mocha or Chai for backend testing to ensure the application is robust and bug-free.
- CI/CD: Implementing Continuous Integration and Continuous Deployment pipelines using tools like GitHub Actions  to automate testing and deployment processes.



##workflow and development process
1. **Planning and Design**: Define the project requirements, create wireframes and mockups
2. **Frontend Development**: Build the user interface using React.js, implementing features such as user registration, login, post creation, and interaction with stories.
3. **Backend Development**: Set up the server using Node.js and Express.js, create API endpoints for handling user authentication, post management, and interactions.
4. **Database Integration**: Design the database schema and implement MongoDB to store user data, posts, comments, and other relevant information.
5. **AI Integration**: Integrate AI models for content generation, allowing users to create stories based on their input and preferences.
6. **Testing**: Conduct thorough testing of both frontend and backend components to ensure functionality, performance, and security.
7. **Deployment**: Deploy the application to a hosting platform, ensuring it is accessible to users and can handle expected traffic.
8. **Maintenance and Updates**: Continuously monitor the application for issues, gather user feedback, and implement updates and improvements based on user needs and technological advancements.


##workflow diagram from user side
```mermaidgraph TD
    A[User Registration/Login] --> B[Create Post (Scoop)]
    B --> C[AI Content Generation]
    C --> D[Post Story with Title, Story, Music]
    D --> E[Interact with Other Stories (Like, Comment, Share)]
    E --> F[View Breakers Section]
    F --> G[Save Stories to Profile]
    H --> I[Discover and Engage with Stories]
``` 

##apis required
1. **User Authentication API**: Endpoints for user registration, login, and authentication using
    JWT.
2. **Post Management API**: Endpoints for creating, retrieving, updating, and deleting posts (scoops), including AI content generation.
3. **Interaction API**: Endpoints for liking, commenting, and sharing stories, as well as saving stories to user profiles.
4. **Breakers API**: Endpoint for retrieving the most popular and trending stories for the
    "breakers" section.
5. **Buckets API**: Endpoint for retrieving stories based on themes, genres, or topics for the "buckets" section.
6. **User Profile API**: Endpoints for managing user profiles, including retrieving saved stories
    and user information.
7. **Search API**: Endpoint for searching stories based on keywords, themes, or user preferences.
8. **Notification API**: Endpoints for sending notifications to users about interactions with their stories, new content in their buckets, or updates from the platform.
9. **Analytics API**: Endpoints for tracking user engagement, post performance, and other relevant metrics to help improve the platform and provide insights to users.

<!-- now raw endpoints dummy for now -->
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Log in a user and return a JWT token
- POST /api/posts - Create a new post (scoop) with AI content generation
- GET /api/posts - Retrieve all posts (scoops)
- GET /api/posts/:id - Retrieve a specific post by ID
- PUT /api/posts/:id - Update a specific post by ID
- DELETE /api/posts/:id - Delete a specific post by ID
- POST /api/interactions/like - Like a post
- POST /api/interactions/comment - Comment on a post
- POST /api/interactions/share - Share a post
- POST /api/interactions/save - Save a post to user profile
- GET /api/breakers - Retrieve the most popular and trending stories for the "breakers" section
- GET /api/buckets - Retrieve stories based on themes, genres, or topics for the "buckets" section
- GET /api/user/profile - Retrieve user profile information and saved stories
- POST /api/search - Search for stories based on keywords, themes,
- GET /api/search - Search for users based on username 
- POST /api/notifications - Send notifications to users about interactions, new content, or updates
- GET /api/analytics - Retrieve analytics data for user engagement and post performance
- DELETE /api/user/profile - Delete user profile and associated data


##database schemas for all models 

#user model 
```javascript
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
```

#post model 
```javascript
const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    story: { type: String, required: true },
    music: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
```

#interaction model 
```javascript
const mongoose = require('mongoose');
const InteractionSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['like', 'comment', 'share'], required: true },
    commentText: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interaction', InteractionSchema);
```

#bucket model 
```javascript
const mongoose = require('mongoose');
const BucketSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bucket', BucketSchema);
```

