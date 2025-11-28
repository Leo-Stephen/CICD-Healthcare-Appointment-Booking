import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:8081/api/ws';

export const useWebSocket = () => {
  const { user } = useAuth();
  const clientRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      onConnect: () => {
        console.log('WebSocket connected');

        // Subscribe to user-specific notifications
        client.subscribe(`/user/${user.id}/queue/notifications`, (message) => {
          const notification = JSON.parse(message.body);

          // Show toast notification
          toast.success(notification.title, {
            description: notification.message,
            duration: 5000,
          });
        });
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected');
      },
      onStompError: (frame) => {
        console.error('WebSocket error:', frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [user]);

  return clientRef.current;
};
