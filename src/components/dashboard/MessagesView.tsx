"use client";

import { useState } from "react";
import { Send, Paperclip, Image } from "lucide-react";

const conversations = [
  {
    id: 1,
    projectName: "E-Commerce Website",
    lastMessage: "Great! I'll send the updated designs by tomorrow.",
    timestamp: "2 hours ago",
    unread: 2,
    messages: [
      { id: 1, sender: "client", text: "Hi! How's the progress on the homepage?", time: "10:30 AM" },
      { id: 2, sender: "admin", text: "Hello! We're making great progress. The responsive design is almost complete.", time: "10:45 AM" },
      { id: 3, sender: "client", text: "That's awesome! Can I see a preview?", time: "11:00 AM" },
      { id: 4, sender: "admin", text: "Great! I'll send the updated designs by tomorrow.", time: "2:30 PM" },
    ],
  },
  {
    id: 2,
    projectName: "Mobile App Design",
    lastMessage: "The color scheme looks perfect now!",
    timestamp: "1 day ago",
    unread: 0,
    messages: [
      { id: 1, sender: "admin", text: "Here's the updated color palette for the app.", time: "Yesterday" },
      { id: 2, sender: "client", text: "The color scheme looks perfect now!", time: "Yesterday" },
    ],
  },
  {
    id: 3,
    projectName: "Brand Identity",
    lastMessage: "Thank you for the quick turnaround!",
    timestamp: "3 days ago",
    unread: 1,
    messages: [
      { id: 1, sender: "admin", text: "Your brand guidelines document is ready!", time: "3 days ago" },
      { id: 2, sender: "client", text: "Thank you for the quick turnaround!", time: "3 days ago" },
    ],
  },
];

export default function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      // Firebase/backend logic will go here
      setNewMessage("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-muted/30 border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Messages</h2>
          </div>
          <div className="flex-1 overflow-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 text-left border-b border-border hover:bg-muted/50 transition-all ${
                  selectedConversation.id === conversation.id ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-sm">{conversation.projectName}</h3>
                  {conversation.unread > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground truncate mb-1">
                  {conversation.lastMessage}
                </p>
                <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 bg-muted/30 border border-border rounded-xl overflow-hidden flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">{selectedConversation.projectName}</h2>
            <p className="text-xs text-muted-foreground">Project Discussion</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {selectedConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "client" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    message.sender === "client"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "client" ? "text-white/70" : "text-muted-foreground"}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 hover:bg-muted rounded-lg transition-all"
              >
                <Paperclip size={20} className="text-muted-foreground" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-muted rounded-lg transition-all"
              >
                <Image size={20} className="text-muted-foreground" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-foreground/20 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="p-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
