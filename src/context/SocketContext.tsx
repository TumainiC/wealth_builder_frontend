import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
    lastEvent: any;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [lastEvent, setLastEvent] = useState<any>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');

        newSocket.on('connect', () => {
            setIsConnected(true);
            console.log('Connected to WebSocket');
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
            console.log('Disconnected from WebSocket');
        });

        newSocket.on('auth_event', (data) => {
            console.log('Auth Event received:', data);
            setLastEvent(data);
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected, lastEvent }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
