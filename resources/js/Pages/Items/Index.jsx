import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Card, Group, Table, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Index = (props) => {
  console.log(props);
  const items = props.items || []; // Changed userItems to items
  const isAdmin = props.auth.user?.role === 'Admin'; // Check if the user is an admin

  const rows = items.map((item, index) => (
    <Table.Tr key={item.id} style={{ height: '48px' }}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{item.code}</Table.Td> {/* Code */}
      <Table.Td>{item.name}</Table.Td> {/* Name */}
      <Table.Td>{item.quantity}</Table.Td> {/* Quantity */}
      <Table.Td>{item.unit}</Table.Td> {/* Unit */}
      {isAdmin && (
        <Table.Td>
          <div style={{ display: 'flex', gap: '8px' }}>
            <ActionIcon
              size={48}
              variant="subtle"
              color="yellow"
              onClick={() => router.get(route('items.edit', item))}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              size={48}
              variant="subtle"
              color="red"
              onClick={() => router.delete(route('items.destroy', item))}
            >
              <IconTrash />
            </ActionIcon>
          </div>
        </Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <AuthenticatedLayout
      appLayoutProps={{
        title: props.page_title,
        notification: props.notification,
      }}
      headerProps={{
        user: props.auth.user,
      }}
    >
      <Group justify="space-between">
        <Title>Daftar Barang</Title>

        <Button onClick={() => router.get(route('items.create'))}>
          Tambah
        </Button>
      </Group>

      <Card shadow="sm" p="lg" radius="md" withBorder>
        <div style={{ overflow: 'hidden', borderRadius: '16px' }}>
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            horizontalSpacing={16}
            verticalSpacing={16}
            tabularNums
          >
            <Table.Thead style={{ height: '48px' }}>
              <Table.Tr>
                {['No', 'Kode', 'Nama', 'Kuantitas', 'Satuan']
                  .concat(isAdmin ? ['Aksi'] : [])
                  .map((field) => (
                    <Table.Th key={field}>{field}</Table.Th>
                  ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody style={{ height: '48px' }}>{rows}</Table.Tbody>
          </Table>
        </div>
      </Card>
    </AuthenticatedLayout>
  );
};

export default Index;
