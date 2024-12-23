import { Center, Container, Text } from '@mantine/core';

export const Footer = () => {
  return (
    <Container size="xl" w="100%" py={16}>
      <Center>
        <Text size="sm" c="dimmed">
          &copy; {new Date().getFullYear()} Supply Chain Management. All rights
          reserved.
        </Text>
      </Center>
    </Container>
  );
};
