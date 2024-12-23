import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export const showNotification = (
  title: string,
  message: string,
  status: boolean,
) => {
  notifications.show({
    title,
    message,
    color: status ? 'green' : 'red',
    autoClose: 2000,
    icon: status ? <IconCheck /> : <IconX />,
  });
};
