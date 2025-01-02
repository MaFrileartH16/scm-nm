import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import { NumberInput, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const Edit = (props) => {
  const form = useForm({
    initialValues: {
      code: props.item?.code || '',
      name: props.item?.name || '',
      quantity: props.item?.quantity || 0,
      unit: props.item?.unit || '',
    },
    validate: {
      code: (value) => (value.trim() ? null : 'Kode barang harus diisi'),
      name: (value) => (value.trim() ? null : 'Nama barang harus diisi'),
      quantity: (value) => (value > 0 ? null : 'Kuantitas harus lebih dari 0'),
      unit: (value) => (value ? null : 'Satuan harus dipilih'),
    },
  });

  const handleSubmit = (values) => {
    router.put(route('items.update', { id: props.item.id }), values, {
      onSuccess: () => {
        router.get(route('items.index'));
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
          breadcrumbs: [
            { title: 'Barang', route: 'items.index' },
            {
              title: 'Ubah',
              route: 'items.edit',
              params: { id: props.item.id },
            },
          ],
          actionButtonProps: {
            isVisible: true,
            type: 'submit',
            label: 'Simpan',
            onClick: () => router.get(route('items.update')),
          },
        }}
      >
        <TextInput
          label="Kode Barang"
          placeholder="Masukkan kode barang"
          {...form.getInputProps('code')}
          required
          styles={{
            wrapper: { marginBottom: 0 },
            label: { marginBottom: 8 },
            input: { padding: '0 16px 0 56px', height: 48 },
          }}
        />

        <TextInput
          label="Nama Barang"
          placeholder="Masukkan nama barang"
          {...form.getInputProps('name')}
          required
          mt="md"
          styles={{
            wrapper: { marginBottom: 0 },
            label: { marginBottom: 8 },
            input: { padding: '0 16px 0 56px', height: 48 },
          }}
        />

        <NumberInput
          label="Kuantitas"
          placeholder="Masukkan kuantitas barang"
          {...form.getInputProps('quantity')}
          required
          mt="md"
          min={1}
          styles={{
            wrapper: { marginBottom: 0 },
            label: { marginBottom: 8 },
            input: { padding: '0 16px 0 56px', height: 48 },
          }}
        />

        <Select
          label="Satuan"
          placeholder="Pilih satuan"
          data={[
            { value: 'pcs', label: 'pcs' },
            { value: 'kg', label: 'kg' },
            { value: 'ltr', label: 'ltr' },
          ]}
          {...form.getInputProps('unit')}
          required
          mt="md"
          styles={{
            wrapper: { marginBottom: 0 },
            label: { marginBottom: 8 },
            input: { padding: '0 16px 0 56px', height: 48 },
          }}
        />
      </AuthenticatedLayout>
    </form>
  );
};

export default Edit;
