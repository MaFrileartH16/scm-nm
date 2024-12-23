import { router, usePage } from '@inertiajs/react';
import { Accordion, ActionIcon, Button, Drawer, Text } from '@mantine/core';
import {
  IconDashboard,
  IconLayout,
  IconNote,
  IconPackage,
  IconProng,
  IconUser,
  IconX,
} from '@tabler/icons-react';

interface NavigationDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export const NavigationDrawer = ({
  opened,
  onClose,
}: NavigationDrawerProps) => {
  const { url } = usePage();

  const navigationItems = [
    {
      type: 'menu',
      icon: <IconDashboard />,
      value: 'Dasbor',
      route: 'dashboard',
    },
    {
      type: 'accordion',
      icon: <IconLayout />,
      value: 'Master',
      subMenu: [
        { icon: <IconPackage />, value: 'Barang', route: 'items.index' },
        { icon: <IconUser />, value: 'Kurir', route: 'couriers.index' },
        { icon: <IconProng />, value: 'Cabang', route: 'branches.index' },
      ],
    },
    {
      type: 'accordion',
      icon: <IconNote />,
      value: 'Laporan',
      subMenu: [
        // {
        //   icon: <IconPackage />,
        //   value: 'Permintaan',
        //   route: 'permintaan.index',
        // },
        // { icon: <IconUser />, value: 'Pengiriman', route: 'pengiriman.index' },
      ],
    },
  ];

  const isActive = (routeName?: string) => {
    if (!routeName) return false;
    let routeUrl = route(routeName).replace(/\/index$/, '');
    try {
      const parsedUrl = new URL(routeUrl);
      routeUrl = parsedUrl.pathname;
    } catch (e) {
      if (!routeUrl.startsWith('/')) {
        routeUrl = `/${routeUrl}`;
      }
    }
    return url.startsWith(routeUrl);
  };

  return (
    <Drawer.Root opened={opened} onClose={onClose} size="xs">
      <Drawer.Overlay />

      <Drawer.Content>
        <Drawer.Header style={{ padding: 16 }}>
          <ActionIcon
            variant="subtle"
            size={48}
            onClick={onClose}
            color="neutral"
          >
            <IconX />
          </ActionIcon>
        </Drawer.Header>

        <Drawer.Body>
          <Accordion
            variant="filled"
            chevronPosition="right"
            styles={{
              control: { height: 48 },
              content: { padding: '0 16px' },
              label: { padding: 0 },
            }}
          >
            {navigationItems.map((item) => {
              if (item.type === 'accordion') {
                return (
                  <Accordion.Item key={item.value} value={item.value}>
                    <Accordion.Control
                      icon={item.icon}
                      style={{
                        borderRadius: 16,
                        backgroundColor: item.subMenu?.some((sub) =>
                          isActive(sub.route),
                        )
                          ? 'rgba(255, 0, 0, 0.1)'
                          : 'transparent',
                        color: item.subMenu?.some((sub) => isActive(sub.route))
                          ? 'red'
                          : 'gray',
                      }}
                    >
                      <span>{item.value}</span>
                    </Accordion.Control>

                    <Accordion.Panel>
                      {item.subMenu?.map((sub) => (
                        <Button
                          key={sub.value}
                          variant={
                            isActive(sub.route) ? 'subtle' : 'transparent'
                          }
                          fullWidth
                          leftSection={sub.icon}
                          onClick={() => router.get(route(sub.route!))}
                          style={{
                            height: 48,
                            display: 'flex',
                            color: isActive(sub.route) ? 'red' : 'gray',
                            backgroundColor: isActive(sub.route)
                              ? 'rgba(255, 0, 0, 0.1)'
                              : 'transparent',
                            paddingLeft: 16,
                            paddingRight: 16,
                          }}
                        >
                          <Text>{sub.value}</Text>
                        </Button>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              } else {
                return (
                  <Button
                    key={item.value}
                    variant={isActive(item.route) ? 'subtle' : 'transparent'}
                    leftSection={item.icon}
                    fullWidth
                    onClick={() => router.get(route(item.route!))}
                    style={{
                      height: 48,
                      display: 'flex',
                      color: isActive(item.route) ? 'red' : 'gray',
                      backgroundColor: isActive(item.route)
                        ? 'rgba(255, 0, 0, 0.1)'
                        : 'transparent',
                      paddingLeft: 16,
                      paddingRight: 16,
                    }}
                  >
                    <Text>{item.value}</Text>
                  </Button>
                );
              }
            })}
          </Accordion>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};
