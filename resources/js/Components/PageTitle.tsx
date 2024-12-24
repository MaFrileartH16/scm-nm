import { Flex, Title } from '@mantine/core';

export const PageTitle = (props: { title: string }) => {
  return (
    <Flex justify="space-between">
      <Title order={2} fw={600} mb={16} flex="none">
        {props.title}
      </Title>
    </Flex>
  );
};
