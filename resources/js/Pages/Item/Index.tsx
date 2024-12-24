import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Index = (props: PageProps) => {
  const items = props.items || [];

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
      router.delete(route('items.destroy', { id }));
    }
  };

  const rows = items.map((item, index) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.code}</td>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>{item.unit}</td>
      <td>
        <ActionIcon
          color="blue"
          onClick={() => router.get(route('items.edit', { id: item.id }))}
        >
          <IconEdit size={16} />
        </ActionIcon>
        <ActionIcon color="red" onClick={() => handleDelete(item.id)}>
          <IconTrash size={16} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <PageSection {...props}>
      <Button onClick={() => router.get(route('items.create'))} mb="md">
        Tambah Barang
      </Button>

      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Kode</th>
            <th>Nama Barang</th>
            <th>Kuantitas</th>
            <th>Satuan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </PageSection>
  );
};

export default Index;
