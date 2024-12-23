import { Footer } from '@/Components/Footer';
import { AppLayout } from '@/Layouts/AppLayout';
import { PageProps } from '@/types';
import { Flex } from '@mantine/core';
import { PropsWithChildren } from 'react';

export const GuestLayout = (props: PropsWithChildren<PageProps>) => {
  return (
    <AppLayout {...props}>
      <Flex direction="column" flex={1} p={16}>
        {props.children}

        <Footer />
      </Flex>
    </AppLayout>
  );
};
