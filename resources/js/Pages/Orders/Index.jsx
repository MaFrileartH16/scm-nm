import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import { Accordion, Button, Card, Group, Table, Title } from '@mantine/core';

const Orders = (props) => {
  console.log(props);
  const orders = props.orders || [];

  const rows = orders.map((order, index) => (
    <Table.Tr key={order.id || `order-${index}`}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>
        <Accordion chevronPosition="right" variant="separated">
          <Accordion.Item value={order.id?.toString() || `order-${index}`}>
            <Accordion.Control>
              <strong>{order.code}</strong>
            </Accordion.Control>
            <Accordion.Panel>
              <Title order={6}>Order Items</Title>
              <Table striped highlightOnHover withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>No</Table.Th>
                    <Table.Th>Kode Item</Table.Th>
                    <Table.Th>Nama Item</Table.Th>
                    <Table.Th>Unit</Table.Th>
                    <Table.Th>Quantity</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {order.items.map((item, itemIndex) => (
                    <Table.Tr key={item.id || `item-${itemIndex}`}>
                      <Table.Td>{itemIndex + 1}</Table.Td>
                      <Table.Td>{item.code}</Table.Td>
                      <Table.Td>{item.name}</Table.Td>
                      <Table.Td>{item.unit}</Table.Td>
                      <Table.Td>{item.quantity}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Table.Td>
      <Table.Td>{order.status}</Table.Td>
      <Table.Td>{order.created_at}</Table.Td>
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
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          horizontalSpacing={16}
          verticalSpacing={16}
          tabularNums
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>No</Table.Th>
              <Table.Th>Kode Pesanan</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Tanggal Dibuat</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </AuthenticatedLayout>
  );
};

export default Orders;
