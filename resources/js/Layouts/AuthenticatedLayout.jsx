import { Header } from '@/Components/Header.jsx';
import { AppLayout } from '@/Layouts/AppLayout.jsx';
import { Box, Container, Flex } from '@mantine/core';

export const AuthenticatedLayout = (props) => {
  return (
    <AppLayout {...props.appLayoutProps}>
      <Header {...props.headerProps} />

      <Flex flex={1}>
        <Box w="100%">
          <Container size="xl" p={16}>
            {props.children}
          </Container>
        </Box>
      </Flex>
    </AppLayout>
  );
};
