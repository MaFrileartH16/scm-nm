import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import { ActionIcon, Button, Card, Group, Table, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Branches = (props) => {
  const branches = props.branches || [];

  const rows = branches.map((branch, index) => (
    <Table.Tr key={branch.id} style={{ height: '48px' }}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{branch.name}</Table.Td>
      <Table.Td>{branch.phone_number}</Table.Td>
      <Table.Td>{branch.address}</Table.Td>
      <Table.Td>{branch.email}</Table.Td>
      <Table.Td>
        <div style={{ display: 'flex', gap: '8px' }}>
          <ActionIcon
            size={48}
            variant="subtle"
            color="yellow"
            onClick={() =>
              router.get(route('branches.edit', { id: branch.id }))
            }
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            size={48}
            variant="subtle"
            color="red"
            onClick={() =>
              router.delete(route('branches.destroy', { id: branch.id }))
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
        <Title>Daftar Cabang</Title>

        <Button onClick={() => router.get(route('branches.create'))}>
          Tambah Cabang
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
                {[
                  'No',
                  'Nama Lengkap',
                  'Nomor Telepon',
                  'Alamat',
                  'Email',
                  'Aksi',
                ].map((field) => (
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

export default Branches;
