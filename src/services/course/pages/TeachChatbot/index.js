import React from "react";
import Chatbot from "react-chatbot-kit";
import config from './configs';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import 'react-chatbot-kit/build/main.css'
import './style.css';
// import config from './configs';
// "./configs/chatbotConfig"
// import MessageParser from "./chatbot/MessageParser";
// import ActionProvider from "./chatbot/ActionProvider";

const TeachChatbot = () => {
    return <div>
        <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
        />

    </div>
};

export default TeachChatbot;