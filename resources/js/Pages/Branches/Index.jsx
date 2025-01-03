import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import { ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

const Index = (props) => {
  console.log(props);
  const data = props.branches || [];

  const columns = [
    { accessorKey: 'full_name', header: 'Nama Lengkap' },
    { accessorKey: 'role', header: 'Peran' },
    { accessorKey: 'email', header: 'Email' },
    {
      accessorKey: 'actions',
      header: 'Aksi',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <ActionIcon
            size={48}
            variant="subtle"
            color="yellow"
            onClick={() =>
              router.get(route('branches.edit', { id: row.original.id }))
            }
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            size={48}
            variant="subtle"
            color="red"
            onClick={() =>
              router.delete(route('branches.destroy', { id: row.original.id }))
            }
          >
            <IconTrash />
          </ActionIcon>
        </div>
      ),
    },
  ];

  const table = useMantineReactTable({
    columns,
    data,
  });

  return (
    <AuthenticatedLayout
      appLayoutProps={{
        title: props.page_title,
        notification: props.notification,
      }}
      headerProps={{
        user: props.auth.user,
      }}
      pageHeadingsProps={{
        title: props.page_title,
        actionButtonProps: {
          isVisible: props.auth.user.role === 'Admin',
          label: 'Tambah',
          onClick: () => router.get(route('branches.create')),
        },
      }}
    >
      <MantineReactTable table={table} />
    </AuthenticatedLayout>
  );
};

export default Index;
