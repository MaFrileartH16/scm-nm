import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Index = (props: PageProps) => {
  const couriers = props.couriers || [];

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus kurir ini?')) {
      router.delete(route('couriers.destroy', { id }));
    }
  };

  const rows = couriers.map((courier, index) => (
    <tr key={courier.id}>
      <td>{index + 1}</td>
      <td>{courier.name}</td>
      <td>{courier.email}</td>
      <td>
        <ActionIcon
          color="blue"
          onClick={() => router.get(route('couriers.edit', { id: courier.id }))}
        >
          <IconEdit size={16} />
        </ActionIcon>
        <ActionIcon color="red" onClick={() => handleDelete(courier.id)}>
          <IconTrash size={16} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <PageSection {...props}>
      <Button onClick={() => router.get(route('couriers.create'))} mb="md">
        Tambah Kurir
      </Button>

      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Kurir</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </PageSection>
  );
};

export default Index;
