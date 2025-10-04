import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = ({ username, socket }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typingStatus, setTypingStatus] = useState('');
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const notificationSoundRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const createTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        socket.on('chat message', (messagePayload) => {
            const type = messagePayload.senderId === socket.id ? 'sent' : 'received';
            const newMessage = { ...messagePayload, msgType: 'user', timestamp: createTimestamp() };
            
            setMessages(prev => [...prev, newMessage]);

            if (type === 'received') {
                notificationSoundRef.current?.play().catch(e => console.error("Audio play failed:", e));
            }
        });

        socket.on('system message', (text) => {
            setMessages(prev => [...prev, { text, msgType: 'system' }]);
        });

        socket.on('update user list', (users) => {
            setOnlineUsers(users);
        });

        socket.on('typing status', (status) => {
            setTypingStatus(status);
        });

        return () => {
            socket.off('chat message');
            socket.off('system message');
            socket.off('update user list');
            socket.off('typing status');
        };
    }, [socket]);

    useEffect(scrollToBottom, [messages, typingStatus]);

    const handleTyping = () => {
        socket.emit('typing', username);
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit('stop typing');
        }, 2000);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        handleTyping();
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            socket.emit('chat message', { text: inputValue, username });
            setInputValue('');
            clearTimeout(typingTimeoutRef.current);
            socket.emit('stop typing');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <>
            <div id="user-list">
                <h2>Online Users ({onlineUsers.length})</h2>
                <ul>
                    {onlineUsers.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            </div>
            <div id="chat-container">
                <header id="chat-header">
                    <h1>Live Chat</h1>
                </header>
                <main id="messages">
                    {messages.map((msg, index) => {
                        if (msg.msgType === 'system') {
                            return <div key={index} className="system-message">{msg.text}</div>;
                        }
                        const type = msg.senderId === socket.id ? 'sent' : 'received';
                        return (
                            <div key={index} className={`message ${type}`}>
                                {type === 'received' && <span className="username">{msg.username}</span>}
                                <p>{msg.text}</p>
                                <span className="timestamp">{msg.timestamp}</span>
                            </div>
                        );
                    })}
                    <div className="typing-indicator">{typingStatus}</div>
                    <div ref={messagesEndRef} />
                </main>
                <footer id="chat-input-area">
                    <input
                        type="text"
                        id="message-input"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                    />
                    <button id="send-button" onClick={handleSendMessage}>
                        &#10148;
                    </button>
                </footer>
            </div>
            <audio ref={notificationSoundRef} src="/notification.mp3" preload="auto"></audio>
        </>
    );
};

export default Chat;