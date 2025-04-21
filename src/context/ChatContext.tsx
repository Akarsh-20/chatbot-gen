import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatState, Message } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/helpers';

type ChatAction = 
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_MESSAGES' };

const initialState: ChatState = {
  messages: [],
  isLoading: false
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: []
      };
    default:
      return state;
  }
};

interface ChatContextProps {
  state: ChatState;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
  setLoading: (isLoading: boolean) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedMessages, setSavedMessages] = useLocalStorage<Message[]>('chat-messages', []);
  
  const [state, dispatch] = useReducer(chatReducer, {
    ...initialState,
    messages: savedMessages
  });

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    const newMessage: Message = {
      id: generateId(),
      content,
      role,
      timestamp: Date.now()
    };
    
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
    
    // Update localStorage
    const updatedMessages = [...state.messages, newMessage];
    setSavedMessages(updatedMessages);
  };

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: isLoading });
  };

  const clearMessages = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
    setSavedMessages([]);
  };

  return (
    <ChatContext.Provider value={{ state, addMessage, setLoading, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
