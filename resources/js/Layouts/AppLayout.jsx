import { Footer } from '@/Components/Footer.jsx';
import { Head } from '@inertiajs/react';
import { Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect } from 'react';

export const AppLayout = (props) => {
  useEffect(() => {
    if (props.notification) {
      notifications.show({
        withBorder: true,
        title: props.notification.title,
        message: props.notification.message,
        color: props.notification.status === 'success' ? 'green' : 'red',
      });
    }

    notifications.cleanQueue();
  }, [props.notification]);

  return (
    <>
      <Head title={props.title} />

      <Flex mih="100vh" direction="column">
        {props.children}

        <Footer />
      </Flex>
    </>
  );
};
