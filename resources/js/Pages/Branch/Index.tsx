import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Index = (props: PageProps) => {
  const branches = props.branches || [];

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus cabang ini?')) {
      router.delete(route('branches.destroy', { id }));
    }
  };

  const rows = branches.map((branch, index) => (
    <tr key={branch.id}>
      <td>{index + 1}</td>
      <td>{branch.name}</td>
      <td>{branch.email}</td>
      <td>
        <ActionIcon
          color="blue"
          onClick={() => router.get(route('branches.edit', { id: branch.id }))}
        >
          <IconEdit size={16} />
        </ActionIcon>
        <ActionIcon color="red" onClick={() => handleDelete(branch.id)}>
          <IconTrash size={16} />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <PageSection {...props}>
      <Button onClick={() => router.get(route('branches.create'))} mb="md">
        Tambah Cabang
      </Button>

      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Cabang</th>
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
