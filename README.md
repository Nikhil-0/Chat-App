# Real-Time Chat Application

This is a modern, real-time chat application built with React on the frontend and a Node.js/Express server with Socket.IO on the backend. It features a clean, dark-themed UI and several interactive features.

## Features

-   **User Authentication:** Simple username-based login to join the chat.
-   **Real-Time Messaging:** Instantly send and receive messages.
-   **Live User List:** See a list of all users currently online in the chat room.
-   **Typing Indicators:** Know when another user is typing a message.
-   **Join/Leave Notifications:** System messages announce when users join or leave the chat.
-   **Message Timestamps:** Every message is timestamped.
-   **Sound Notifications:** Receive an audio alert for new incoming messages.
-   **Responsive Design:** A clean and modern dark-theme UI that works on different screen sizes.

## Tech Stack

-   **Frontend:** React, Vite
-   **Backend:** Node.js, Express
-   **Real-Time Communication:** Socket.IO
-   **Styling:** CSS with a component-based structure

## Project Structure

```
/
├── public/             # Static assets (e.g., notification sound)
├── src/
│   ├── components/     # Reusable React components (App, Chat, Login)
│   └── index.jsx       # Main React entry point
├── index.css           # Global styles and CSS variables
├── index.html          # Main HTML template for Vite
├── package.json        # Project dependencies and scripts
└── server.js           # The Node.js, Express, and Socket.IO backend server
```

## Local Development

To run this project on your local machine, follow these steps:

1.  **Clone the repository** (or use your existing folder).

2.  **Create a `.gitignore` file** in the root of the project and add the following lines to it. This is important to prevent committing unnecessary files.
    ```
    # Dependencies
    /node_modules

    # Build output
    /dist

    # Environment variables
    .env
    ```

3.  **Install dependencies:** Open a terminal in the project root and run:
    ```bash
    npm install
    ```

4.  **Run the Backend Server:** In your first terminal, start the backend server:
    ```bash
    node server.js
    ```
    This will start the Socket.IO server, usually on `http://localhost:3000`.

5.  **Run the Frontend Development Server:** Open a *second* terminal and run the Vite dev server:
    ```bash
    npm run dev
    ```
    This will start the React application, usually on `http://localhost:5173`.

6.  **Open the app:** Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).

## Deployment to Render (Free)

This project is configured for a free deployment on [Render](https://render.com/) by splitting it into two services.

### 1. Backend Web Service

-   **Type:** Web Service
-   **Repository:** Connect your GitHub repository.
-   **Build Command:** `npm install`
-   **Start Command:** `node server.js`
-   **Plan:** Free

### 2. Frontend Static Site

-   **Type:** Static Site
-   **Repository:** Connect the same GitHub repository.
-   **Build Command:** `npm run build`
-   **Publish Directory:** `dist`
-   **Add Environment Variable:**
    -   **Key:** `VITE_BACKEND_URL`
    -   **Value:** The URL of my backend Web Service: https://nikhils-chat-app.onrender.com

After both services are deployed, the chat application will be live and fully functional on the internet.
