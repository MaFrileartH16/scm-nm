import { NavigationDrawer } from '@/Components/NavigationDrawer';
import { User } from '@/types';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Group,
  Menu,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBell, IconLogout, IconMenu, IconPhoto } from '@tabler/icons-react';

interface HeaderProps {
  user: User;
}

export const Header = ({ user }: HeaderProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box pos="sticky" top={0} style={{ zIndex: 1 }}>
      <SimpleGrid cols={3} p={16} bg="neutral.12">
        <Group justify="flex-start">
          <ActionIcon variant="subtle" size={48} onClick={open} color="neutral">
            <IconMenu />
          </ActionIcon>

          <NavigationDrawer opened={opened} onClose={close} />
        </Group>

        <Group justify="center">
          <ThemeIcon variant="light" radius="xl" size="xl" color="amaranth">
            <IconPhoto />
          </ThemeIcon>
        </Group>

        <Group justify="flex-end">
          <Menu position="bottom-end">
            <Menu.Target>
              <UnstyledButton>
                <Group gap={8}>
                  <Avatar color="red" size={48} radius={16}>
                    {user.name[0]}
                  </Avatar>

                  <Box display={{ base: 'none', md: 'block' }}>
                    <Text size="sm" fw={500} truncate="end">
                      {user.name}
                    </Text>
                    <Text c="dimmed" size="xs" truncate="end">
                      {user.email}
                    </Text>
                  </Box>
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {}}
                leftSection={<IconBell size={16} />}
              >
                Notifikasi
              </Menu.Item>
              <Menu.Item
                onClick={() => router.post(route('logout'))}
                leftSection={<IconLogout size={16} />}
              >
                Keluar
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </SimpleGrid>

      <Divider />
    </Box>
  );
};
