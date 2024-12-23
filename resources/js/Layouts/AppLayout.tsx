import { ResponseProps } from '@/types';
import { showNotification } from '@/utils/showNotification';
import { Head } from '@inertiajs/react';
import { Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { PropsWithChildren, useEffect } from 'react';

type AppLayoutProps = PropsWithChildren<{
  page_title: string;
  response?: ResponseProps;
}>;

export const AppLayout = (props: AppLayoutProps) => {
  useEffect(() => {
    if (props.response) {
      showNotification(
        props.response.title ?? '',
        props.response.message ?? '',
        props.response.status ?? false,
      );
    }

    notifications.cleanQueue();
  }, [props.response]);

  return (
    <Flex direction="column" mih="100vh">
      <Head title={props.page_title} />

      {props.children}
    </Flex>
  );
};
