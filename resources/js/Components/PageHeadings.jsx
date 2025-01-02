import { Anchor, Box, Breadcrumbs, Flex, Title } from '@mantine/core';

export const PageHeadings = () => {
  const items = [
    { title: 'Mantine', href: '#' },
    { title: 'Mantine hooks', href: '#' },
    { title: 'use-id', href: '#' },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Flex bg="red">
      <Box bg="yellow">
        <Breadcrumbs>{items}</Breadcrumbs>
        <Title fz={34} fw={800}>
          Dashboard
        </Title>
      </Box>
    </Flex>
  );
};
