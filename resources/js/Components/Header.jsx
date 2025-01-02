import { router } from '@inertiajs/react';
import {
  Accordion,
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  Indicator,
  Menu,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard,
  IconDatabase,
  IconId,
  IconLogout,
  IconMenu,
  IconX,
} from '@tabler/icons-react';

export const Header = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const drawerMenuItems = [
    {
      label: 'Dasbor',
      icon: <IconDashboard />,
      type: 'button',
    },
    {
      label: 'Master',
      icon: <IconDatabase />,
      type: 'accordion',
      submenu: [
        { label: 'Supir', icon: <IconDashboard /> },
        { label: 'Kendaraan', icon: <IconDashboard /> },
        { label: 'Dasbor', icon: <IconDashboard /> },
      ],
    },
  ];

  const userMenuItems = [
    {
      label: 'Profil Saya',
      icon: <IconId style={{ marginRight: 8 }} />,
      onClick: () => router.get(route('profile.edit')),
      color: '#333',
    },
    {
      label: 'Keluar akun',
      icon: <IconLogout style={{ marginRight: 8 }} />,
      onClick: () => router.post(route('logout')),
      color: 'red',
    },
  ];

  return (
    <Box>
      <Container size="xl" py={16}>
        <Group justify="space-between">
          <Drawer.Root opened={opened} onClose={close} size="xs">
            <Drawer.Overlay />

            <Drawer.Content>
              <Drawer.Header p={16}>
                <Drawer.Title>Menu</Drawer.Title>
                <ActionIcon variant="subtle" onClick={close} size={48}>
                  <IconX />
                </ActionIcon>
              </Drawer.Header>

              <Drawer.Body
                style={{
                  display: 'flex',
                  gap: 8,
                  flexDirection: 'column',
                }}
              >
                {drawerMenuItems.map((menuItem, index) =>
                  menuItem.type === 'button' ? (
                    <Button
                      key={index}
                      leftSection={menuItem.icon}
                      h={48}
                      fz={16}
                      fw={500}
                      fullWidth
                      variant="subtle"
                      px={16}
                      display="flex"
                    >
                      {menuItem.label}
                    </Button>
                  ) : (
                    <Accordion
                      key={index}
                      variant="filled"
                      styles={{
                        label: { fontWeight: 500 },
                        content: { padding: '8px 16px 16px 16px' },
                      }}
                    >
                      <Accordion.Item value={menuItem.label}>
                        <Accordion.Control
                          icon={menuItem.icon}
                          c="blue"
                          h={48}
                          style={{
                            borderRadius: 16,
                          }}
                        >
                          {menuItem.label}
                        </Accordion.Control>

                        <Accordion.Panel>
                          <Stack gap={8}>
                            {menuItem.submenu.map((subItem, subIndex) => (
                              <Button
                                key={subIndex}
                                leftSection={subItem.icon}
                                h={48}
                                fz={16}
                                fw={500}
                                fullWidth
                                variant="subtle"
                                px={16}
                                display="flex"
                              >
                                {subItem.label}
                              </Button>
                            ))}
                          </Stack>
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  ),
                )}
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Root>

          <ActionIcon variant="subtle" onClick={open} size={48}>
            <IconMenu />
          </ActionIcon>

          <Menu position="bottom-end" withArrow arrowPosition="center">
            <Menu.Target>
              <Indicator
                styles={{
                  indicator: {
                    height: 24,
                    padding: 8,
                    fontSize: 14,
                  },
                }}
                fz={14}
                inline
                label={props.user.role}
                size={16}
                position="bottom-start"
                withBorder
              >
                <Button variant="subtle" w={48} h={48} p={4}>
                  <Avatar radius="md" color="blue">
                    {props.user.full_name[0]}
                  </Avatar>
                </Button>
              </Indicator>
            </Menu.Target>

            <Menu.Dropdown p={8}>
              <Box px={20}>
                <Text fz={16} fw={500} mb={4} c="#333">
                  {props.user.full_name}
                </Text>
                <Text fz={14} c="#777">
                  {props.user.email}
                </Text>
              </Box>

              <Menu.Divider my={8} style={{ borderColor: '#ddd' }} />

              {userMenuItems.map((item, index) => (
                <Menu.Item
                  key={index}
                  leftSection={item.icon}
                  onClick={item.onClick}
                  h={48}
                  px={16}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: 14,
                    color: item.color,
                  }}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>

      <Divider />
    </Box>
  );
};
