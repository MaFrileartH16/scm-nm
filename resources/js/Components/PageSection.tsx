import { PageTitle } from '@/Components/PageTitle';
import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Flex, ScrollArea } from '@mantine/core';
import { PropsWithChildren } from 'react';

export const PageSection = (props: PropsWithChildren<PageProps>) => {
  return (
    <AuthenticatedLayout {...props}>
      <Flex flex={1} direction="column" p={16}>
        <PageTitle title={props.page_title} />

        <ScrollArea flex={1}>{props.children}</ScrollArea>
      </Flex>
    </AuthenticatedLayout>
  );
};
