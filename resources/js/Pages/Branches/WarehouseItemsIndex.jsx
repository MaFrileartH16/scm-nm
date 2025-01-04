import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Button,
  Card,
  Checkbox,
  Group,
  NumberInput,
  Table,
  Title,
} from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

const Index = (props) => {
  console.log(props);
  const items = props.items || [];
  const isAdmin = props.auth.user?.role === 'Admin'; // Check if the user is an admin
  const [selectedItems, setSelectedItems] = useState([]);
  const [purchaseQuantities, setPurchaseQuantities] = useState({});

  const handleCheckboxChange = (itemId, isChecked) => {
    setSelectedItems((prev) => {
      if (isChecked) {
        return [...prev, itemId];
      } else {
        return prev.filter((id) => id !== itemId);
      }
    });
  };

  const handleQuantityChange = (itemId, value, maxQuantity) => {
    if (value > maxQuantity) {
      alert(
        `Jumlah beli tidak boleh lebih dari stok tersedia (${maxQuantity})`,
      );
      value = maxQuantity;
    }
    setPurchaseQuantities((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleCreateRequest = () => {
    const selectedData = selectedItems.map((itemId) => ({
      itemId,
      quantity: purchaseQuantities[itemId] || 0,
    }));

    console.log(selectedData);
    router.post(route('orders.store'), { items: selectedData });
  };

  const rows = items.map((item, index) => (
    <Table.Tr key={item.id} style={{ height: '48px' }}>
      <Table.Td>
        <Checkbox
          onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
        />
      </Table.Td>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{item.code}</Table.Td>
      <Table.Td>{item.name}</Table.Td>
      <Table.Td>{item.quantity}</Table.Td>
      <Table.Td>{item.unit}</Table.Td>
      <Table.Td>
        <NumberInput
          placeholder="Jumlah Beli"
          value={purchaseQuantities[item.id] || ''}
          onChange={(value) =>
            handleQuantityChange(item.id, value, item.quantity)
          }
          min={1}
          max={item.quantity}
          styles={{ input: { width: 100 } }}
        />
      </Table.Td>

      {isAdmin && (
        <Table.Td>
          <div style={{ display: 'flex', gap: '8px' }}>
            <ActionIcon
              size={48}
              variant="subtle"
              color="yellow"
              onClick={() => router.get(route('items.edit', { item: item }))}
            >
              <IconEdit />
            </ActionIcon>
            <ActionIcon
              size={48}
              variant="subtle"
              color="red"
              onClick={() =>
                router.delete(route('items.destroy', { item: item }))
              }
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
        <Title>Daftar Barang Warehouse</Title>

        <Button onClick={handleCreateRequest}>Buat Permintaan</Button>
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
                {[
                  'Pilih',
                  'No',
                  'Code',
                  'Name',
                  'Stok Tersedia',
                  'Unit',
                  'Jumlah Beli',
                ]
                  .concat(isAdmin ? ['Aksi'] : [])
                  .map((field) => (
                    <Table.Th key={field}>{field}</Table.Th>
                  ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </Card>
    </AuthenticatedLayout>
  );
};

export default Index;
