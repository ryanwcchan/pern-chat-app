# PERN Stack Chat App
## Description
A real-time chat application with JWT user authentication. Chat and profile routes are protected. Users can find and add other users to start a conversation with. 

## Live Preview
Note: Backend may take up to a minute to start up due to free tier instance spindown.

https://pern-chat-app-1-6nfn.onrender.com/

### Purpose
The purpose of this project was to deepen my understanding of full-stack development. By building this real-time chat application, I aimed to achieve the following:

- **Strengthen Full-Stack Skills**: Gain hands-on experience in designing and implementing a scalable application using the PERN stack (PostgreSQL, Express, React, Node.js) combined with TypeScript for type safety.

- **Learn Real-Time Communication**: Understand how to implement real-time features, such as messaging, using Socket.IO.

- **User Authentication**: Learning how to authenticating users with JWT.

- **Type Safety and Database Structure**: Learn to setup TypeScript project and structure a full-stack application. Database migration and schema updates using Prisma ORM.

- **Enhance Frontend Development**: Practice responsive and user-friendly UI design using React, TypeScript, and Tailwind CSS.

- **Understand Deployment**: Learn to deploy a full-stack application to production environments, including configuring database hosting and managing environment variables.

This project was an oppourtunity to learn and practice building a real-world application while improving my proficiency in developing dynamic, interactive, and secure web applications. This project was also a stepping stone for a more advanced project that includes real-time chatting features.

## Features
- **Real-Time Messaging**: Using __Socket.IO__ for real-time updates
- **User Authentication**: Login and sign up authenticated using JWT (JSON  Web Tokens)

### Home Page
- Landing page with navigation to login

![Screenshot_2025-02-02_11-28-55](https://github.com/user-attachments/assets/a30747fd-f889-4842-8fe6-42bdbfb78f30)

### Login Page
- Users can login or sign up.
- User is authenticated with JWT.

![Screenshot_2025-02-06_09-30-14](https://github.com/user-attachments/assets/a9720e7b-f9e8-496b-bfd3-3dfdfa62502c)

*Login form*

![Screenshot_2025-02-06_09-30-34](https://github.com/user-attachments/assets/cb682ad9-d7f2-4203-9bf2-aa52c411965e)

*Sign up form*

### Chats
- Once user is authenticated they can see the list of their chats.
- Chats have real-time message updates using socket.io.

![Screenshot_2025-02-06_09-32-43](https://github.com/user-attachments/assets/9d6f22b2-7ae7-4a90-a8f0-3f2fc8c14289)

### Add Users Page
- If user does not have any chats, they can add users by going to users page which shows all existing users.
- If conversation between user already exists, it will navigate to conversation, otherwise a new conversation is created.

![Screenshot_2025-02-06_09-33-21](https://github.com/user-attachments/assets/80207204-6bca-4f0d-be70-db08d39e8fca)

*Users already added*

![Screenshot_2025-02-06_09-39-39](https://github.com/user-attachments/assets/4e273de3-d75a-4c8a-afaf-f3dace809329)

*Users not added will show an add button instead*

## Technologies Used
### Frontend
- **React** with **TypeScript**: Learned how to build user interface with type safety.
- **Tailwind CSS**: For quicker styling and responsive design.
- **Zustand**: Explore state management using Zustand to manage global state.

### Backend
- **Node.js** with **Express**: Created RESTful API for server-side requests.
- **Socket.IO**: To allow for listening for real-time updates to chats.
- **TypeScript**: Ensuring type safety in backend.
- **PostgreSQL**

### Additional Tools
- **Prisma ORM**
- **JWT**
- **Neon DB hosting**

## Installation
### Server Setup
1. **Clone Repository**
   ```
   git clone git@github.com:ryanwcchan/pern-chat-app.git
   cd pern-chat-app
2. **Server Setup**
   ```
   cd server
   npm install
3. **Create a .env file in the server directory and configure the following variables:**
   ```
   DATABASE_URL=your_postgresql_database_url
   PORT=your_server_port
   JWT_SECRET=your_jwt_secret
4. **Run Prisma migrations to set up your database schema:**
   ```
   npx prisma migrate dev
5. **Start server**
   ```
   npm run dev
### Client Setup
1. **Navigate to client directory**
   ```
   cd ../client
2. **Server Setup**
   ```
   npm install
3. **Run dev server**
   ```
   npm run dev
