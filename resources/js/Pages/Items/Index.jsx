import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import { ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

const Index = (props) => {
  const data = props.items || []; // Safeguard to handle missing data

  const columns = [
    { accessorKey: 'code', header: 'Kode Barang' },
    { accessorKey: 'name', header: 'Nama Barang' },
    { accessorKey: 'quantity', header: 'Stok' },
    { accessorKey: 'unit', header: 'Satuan' },
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
              router.get(route('items.edit', { id: row.original.id }))
            }
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            size={48}
            variant="subtle"
            color="red"
            onClick={() =>
              router.delete(route('items.destroy', { id: row.original.id }))
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
          isVisible: true,
          label: 'Tambah',
          onClick: () => router.get(route('items.create')),
        },
      }}
    >
      <MantineReactTable table={table} />
    </AuthenticatedLayout>
  );
};

export default Index;
