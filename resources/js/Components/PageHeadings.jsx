import { router } from '@inertiajs/react';
import { Anchor, Breadcrumbs, Button, Flex, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export const PageHeadings = (props) => {
  const breadcrumbItems = props.breadcrumbs?.map((item, index) => (
    <Anchor onClick={() => router.get(route(item.route))} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <Flex direction="column" gap={16} mt={16} mb={32}>
      {breadcrumbItems && <Breadcrumbs>{breadcrumbItems}</Breadcrumbs>}
      <Flex justify="space-between" align="center">
        <Title fz={34} fw={800}>
          {props.title || 'Default Title'}
        </Title>

        {props.actionButtonProps.isVisible && (
          <Button
            variant="filled"
            type={props.actionButtonProps.type}
            h={48}
            px={16}
            leftSection={<IconPlus />}
            onClick={props.actionButtonProps.onClick}
          >
            {props.actionButtonProps.label || 'Action'}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
