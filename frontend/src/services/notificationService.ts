import { fetchApi } from '../utils/api';

export interface Notification {
  _id: string;
  type: 'PRICE_ALERT' | 'TRADE_CONFIRMATION' | 'SYSTEM';
  message: string;
  symbol?: string;
  read: boolean;
  timestamp: string;
}

const getNotifications = async (): Promise<Notification[]> => {
  const response = await fetchApi<Notification[]>(
    'https://34.102.138.199.nip.io/api/notifications',
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );

  if (response.error) throw new Error(response.error.message);
  return response.data!;
};

const markAsRead = async (notificationId: string): Promise<Notification> => {
  const response = await fetchApi<Notification>(
    `https://34.102.138.199.nip.io/api/notifications/${notificationId}/read`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );

  if (response.error) throw new Error(response.error.message);
  return response.data!;
};

const markAllAsRead = async (): Promise<void> => {
  const response = await fetchApi<{ message: string }>(
    'https://34.102.138.199.nip.io/api/notifications/read-all',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }
  );

  if (response.error) throw new Error(response.error.message);
};

export const notificationService = {
  getNotifications,
  markAsRead,
  markAllAsRead
};