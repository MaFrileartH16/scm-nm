import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Card, Group, Table, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Orders = (props) => {
  console.log(props, 'permintaan');
  const orders = props.orders || []; // Use 'orders' instead of 'branches'

  const rows = orders.map((order, index) => (
    <Table.Tr key={order.id} style={{ height: '48px' }}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{order.code}</Table.Td> {/* Display order code */}
      <Table.Td>{order.status}</Table.Td> {/* Display order status */}
      <Table.Td>{order.created_at}</Table.Td>{' '}
      {/* Display order creation date */}
      <Table.Td>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Action buttons for edit and delete */}
          <ActionIcon
            size={48}
            variant="subtle"
            color="yellow"
            onClick={
              () => router.get(route('orders.edit', order)) // Edit order route
            }
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            size={48}
            variant="subtle"
            color="red"
            onClick={
              () => router.delete(route('orders.destroy', order)) // Delete order route
            }
          >
            <IconTrash />
          </ActionIcon>
        </div>
      </Table.Td>
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
        <Title>Daftar Pesanan</Title>

        <Button onClick={() => router.get(route('orders.create'))}>
          Tambah Pesanan
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
                {['No', 'Kode Pesanan', 'Status', 'Tanggal Dibuat', 'Aksi'].map(
                  (field) => (
                    <Table.Th key={field}>{field}</Table.Th>
                  ),
                )}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </Card>
    </AuthenticatedLayout>
  );
};

export default Orders;
