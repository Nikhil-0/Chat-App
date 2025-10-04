import React, { useState } from 'react';
import io from 'socket.io-client';
import Login from './Login';
import Chat from './Chat';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const socket = io(VITE_BACKEND_URL);

const App = () => {
    const [username, setUsername] = useState(null);

    const handleLogin = (loggedInUsername) => {
        setUsername(loggedInUsername);
        socket.emit('user login', loggedInUsername);
    };

    if (!username) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="chat-layout">
            <Chat username={username} socket={socket} />
        </div>
    );
};

export default App;