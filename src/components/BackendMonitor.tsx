import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Activity, X } from 'lucide-react';

export const BackendMonitor: React.FC = () => {
    const { isConnected, lastEvent } = useSocket();
    const [logs, setLogs] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (lastEvent) {
            setLogs(prev => [lastEvent, ...prev].slice(0, 50)); // Keep last 50 events
            setIsOpen(true); // Auto-open on new event

            // Auto-close after 5 seconds if it was just a notification
            const timer = setTimeout(() => {
                // Optional: auto-hide logic
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [lastEvent]);

    if (!isOpen && logs.length === 0) return null;

    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isOpen ? 'w-80' : 'w-12'}`}>
            <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                {/* Header */}
                <div
                    className="bg-gray-800 p-3 flex items-center justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center gap-2">
                        <Activity size={16} className={isConnected ? "text-green-400" : "text-red-400"} />
                        {isOpen && <span className="text-white font-mono text-sm">Backend Monitor</span>}
                    </div>
                    {isOpen && (
                        <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-gray-400 hover:text-white">
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Logs */}
                {isOpen && (
                    <div className="p-3 max-h-60 overflow-y-auto bg-black/50 font-mono text-xs">
                        {logs.length === 0 ? (
                            <div className="text-gray-500 italic">No events yet...</div>
                        ) : (
                            logs.map((log, i) => (
                                <div key={i} className="mb-2 border-b border-gray-800 pb-2 last:border-0">
                                    <div className="flex justify-between text-gray-500 mb-1">
                                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                                        <span className="text-blue-400">{log.type}</span>
                                    </div>
                                    <div className="text-gray-300 break-words">
                                        {log.message}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
