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
  Menu,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard,
  IconDatabase,
  IconLogout,
  IconMenu,
  IconX,
} from '@tabler/icons-react';

export const Header = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const getDrawerMenuItems = (role) => {
    switch (role) {
      case 'Admin':
        return [
          {
            label: 'Master',
            icon: <IconDatabase />,
            type: 'accordion',
            submenu: [
              {
                label: 'Barang',
                icon: <IconDashboard />,
                route: 'items.index',
              },
              {
                label: 'Cabang',
                icon: <IconDashboard />,
                route: 'branches.index',
              },
              {
                label: 'Kurir',
                icon: <IconDashboard />,
                route: 'couriers.index',
              },
            ],
          },
          {
            label: 'Laporan',
            icon: <IconDatabase />,
            type: 'accordion',
            submenu: [
              { label: 'Permintaan', icon: <IconDashboard /> },
              { label: 'Print Surat Jalan', icon: <IconDashboard /> },
              { label: 'Pengiriman', icon: <IconDashboard /> },
            ],
          },
        ];
      case 'Kurir':
        return [
          {
            label: 'Laporan',
            icon: <IconDatabase />,
            type: 'accordion',
            submenu: [
              { label: 'Permintaan', icon: <IconDashboard /> },
              { label: 'Update Status', icon: <IconDashboard /> },
            ],
          },
        ];
      case 'Cabang':
        return [
          {
            label: 'Master',
            icon: <IconDatabase />,
            type: 'accordion',
            submenu: [{ label: 'Barang', icon: <IconDashboard /> }],
          },
          {
            label: 'Laporan',
            icon: <IconDatabase />,
            type: 'accordion',
            submenu: [
              { label: 'Permintaan', icon: <IconDashboard /> },
              {
                label: 'Status Kurir',
                icon: <IconDashboard />,
              },
              {
                label: 'Stok',
                icon: <IconDashboard />,
              },
            ],
          },
        ];
      default:
        return [];
    }
  };

  const drawerMenuItems = getDrawerMenuItems(props.user.role);

  const userMenuItems = [
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
          {/* Drawer for menu */}
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
                          c="red"
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
                                onClick={() => router.get(route(subItem.route))}
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

          {/* Menu toggle button */}
          <ActionIcon variant="subtle" onClick={open} size={48}>
            <IconMenu />
          </ActionIcon>

          {/* User dropdown */}
          <Menu position="bottom-end" withArrow arrowPosition="center">
            <Menu.Target>
              <Button variant="subtle" w={48} h={48} p={4}>
                <Avatar radius="md" color="red">
                  {props.user.full_name[0]}
                </Avatar>
              </Button>
            </Menu.Target>
            <Menu.Dropdown p={8}>
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
