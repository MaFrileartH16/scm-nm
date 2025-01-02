import { Header } from '@/Components/Header.jsx';
import { PageHeadings } from '@/Components/PageHeadings.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { Box, Container, Flex } from '@mantine/core';

export const AuthenticatedLayout = (props) => {
  return (
    <AppLayout title={props.title} notification={props.notification}>
      <Header user={props.user} />

      <Flex flexDirection="column" flex={1}>
        <Box w="100%">
          <Container size="xl" p={16}>
            <PageHeadings />

            {props.children}
          </Container>
        </Box>
      </Flex>
    </AppLayout>
  );
};
