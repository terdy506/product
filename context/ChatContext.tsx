import React, { createContext, useState, useContext } from 'react';

export type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: Date;
};

export type ChatRoom = {
  id: string;
  participantName: string;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
};

type ChatContextType = {
  chatRooms: ChatRoom[];
  sendMessage: (roomId: string, text: string) => void;
  getChatRoom: (id: string) => ChatRoom | undefined;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_CHATS: ChatRoom[] = [
  {
    id: '1',
    participantName: 'Alice',
    lastMessage: 'Hey, are you going to the study group?',
    lastMessageTime: '10:30 AM',
    messages: [
      { id: '1', senderId: 'other', text: 'Hey, are you going to the study group?', createdAt: new Date() },
    ],
  },
  {
    id: '2',
    participantName: 'Bob',
    lastMessage: 'Can you send me the notes?',
    lastMessageTime: 'Yesterday',
    messages: [
      { id: '1', senderId: 'other', text: 'Can you send me the notes?', createdAt: new Date() },
    ],
  },
];

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(INITIAL_CHATS);

  const sendMessage = (roomId: string, text: string) => {
    setChatRooms((prevRooms) =>
      prevRooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [
              ...room.messages,
              { id: Math.random().toString(), senderId: 'me', text, createdAt: new Date() },
            ],
          };
        }
        return room;
      })
    );
  };

  const getChatRoom = (id: string) => chatRooms.find((c) => c.id === id);

  return (
    <ChatContext.Provider value={{ chatRooms, sendMessage, getChatRoom }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
