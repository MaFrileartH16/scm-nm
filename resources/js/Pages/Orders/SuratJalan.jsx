import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import {
  Accordion,
  ActionIcon,
  Button,
  Card,
  Group,
  Image,
  Select,
  Table,
  Title,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

const Orders = (props) => {
  console.log(props);
  const orders = props.orders || [];
  const userRole = props.auth.user.role; // Get the user's role
  const [editingOrderId, setEditingOrderId] = useState(null); // Track which order is being edited
  const [selectedStatus, setSelectedStatus] = useState(''); // Track selected status
  const [proofImage, setProofImage] = useState(null); // Track uploaded proof image

  const handleStatusChange = (orderId, status) => {
    const formData = new FormData();
    formData.append('status', status);
    if (proofImage) {
      formData.append('proof_image', proofImage);
    }
    router.post(route('orders.changeStatus', { order: orderId }), formData, {
      forceFormData: true,
    });
    setEditingOrderId(null); // Reset the editing state after submission
    setProofImage(null); // Reset the proof image
  };

  const handleDeleteOrder = (orderId) => {
    router.delete(route('orders.destroy', { order: orderId }));
  };

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
              {userRole === 'Admin' || userRole === 'Kurir' ? (
                <div style={{ marginTop: '16px' }}>
                  <Title order={6}>Branch Information</Title>
                  <p>
                    <strong>Name:</strong> {order.branch?.name || '-'}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.branch?.email || '-'}
                  </p>
                  <p>
                    <strong>Phone:</strong> {order.branch?.phone_number || '-'}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.branch?.address || '-'}
                  </p>
                </div>
              ) : null}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Table.Td>
      <Table.Td>{order.status}</Table.Td>
      <Table.Td>{order.created_at}</Table.Td>
      <Table.Td>
        {order.proof_image_path ? (
          <Image
            src={order.proof_image_path} // Directly use the proof_image_path provided by the backend
            alt="Bukti Foto"
            width={100}
            height={100}
            fit="contain"
          />
        ) : (
          <div>-</div>
        )}
      </Table.Td>
      <Table.Td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {order.surat_jalan_url && (
            <Button
              size="xs"
              variant="light"
              color="blue"
              component="a"
              href={order.surat_jalan_url}
              target="_blank"
            >
              Lihat Surat Jalan
            </Button>
          )}
          {userRole === 'Admin' && (
            <>
              {editingOrderId === order.order_id ? (
                <>
                  <Select
                    placeholder="Pilih Status"
                    data={[
                      { value: 'Setujui', label: 'Setujui' },
                      { value: 'Batalkan', label: 'Batalkan' },
                    ]}
                    value={selectedStatus}
                    onChange={(value) => setSelectedStatus(value)}
                  />
                  <Button
                    size="xs"
                    variant="light"
                    color="green"
                    onClick={() =>
                      handleStatusChange(order.order_id, selectedStatus)
                    }
                  >
                    Simpan
                  </Button>
                </>
              ) : (
                <ActionIcon
                  size="md"
                  color="blue"
                  variant="light"
                  onClick={() => setEditingOrderId(order.order_id)}
                >
                  <IconEdit />
                </ActionIcon>
              )}
            </>
          )}
          {userRole === 'Cabang' && (
            <ActionIcon
              size="md"
              color="red"
              variant="light"
              onClick={() => handleDeleteOrder(order.order_id)}
            >
              <IconTrash />
            </ActionIcon>
          )}
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
        <Title>Daftar Surat Jalan</Title>
        {userRole !== 'Kurir' && (
          <Button onClick={() => router.get(route('warehouse_items.index'))}>
            Tambah Pesanan
          </Button>
        )}
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
              <Table.Th>Foto Bukti</Table.Th>
              <Table.Th>Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Card>
    </AuthenticatedLayout>
  );
};

export default Orders;
