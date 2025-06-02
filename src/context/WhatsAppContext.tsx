import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

interface WhatsAppContextType {
  sendMessage: (phone: string, message: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export const WhatsAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (phone: string, message: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Rate limiting - wait 1 second between messages
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await axios.post('/api/whatsapp/send', {
        phone,
        message,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send WhatsApp message');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WhatsAppContext.Provider value={{ sendMessage, isLoading, error }}>
      {children}
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  if (context === undefined) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return context;
}; 