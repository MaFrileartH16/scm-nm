import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { useForm } from '@inertiajs/react';
import {
  Button,
  Group,
  NumberInput,
  Select,
  TextInput,
  Title,
} from '@mantine/core';

const Edit = (props) => {
  const { data, setData, put, processing, errors } = useForm({
    code: props.item.code,
    name: props.item.name,
    quantity: props.item.quantity,
    unit: props.item.unit,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('items.update', { id: props.item.id }), {
      onSuccess: () => {
        console.log('Item updated successfully');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthenticatedLayout
        appLayoutProps={{
          title: props.page_title,
          notification: props.notification,
        }}
        headerProps={{
          user: props.auth.user,
        }}
      >
        <Title mb="md">Ubah Barang</Title>

        <TextInput
          label="Kode Barang"
          placeholder="Masukkan kode barang"
          value={data.code}
          onChange={(e) => setData('code', e.target.value)}
          error={errors.code}
          required
          mb="md"
        />

        <TextInput
          label="Nama Barang"
          placeholder="Masukkan nama barang"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          error={errors.name}
          required
          mb="md"
        />

        <NumberInput
          label="Kuantitas"
          placeholder="Masukkan kuantitas barang"
          value={data.quantity}
          onChange={(value) => setData('quantity', value)}
          error={errors.quantity}
          required
          min={1}
          mb="md"
        />

        <Select
          label="Satuan"
          placeholder="Pilih satuan"
          value={data.unit}
          onChange={(value) => setData('unit', value)}
          data={[
            { value: 'pcs', label: 'pcs' },
            { value: 'kg', label: 'kg' },
            { value: 'ltr', label: 'ltr' },
          ]}
          error={errors.unit}
          required
          mb="md"
        />

        <Group position="right" mt="xl">
          <Button type="submit" loading={processing}>
            Simpan Perubahan
          </Button>
        </Group>
      </AuthenticatedLayout>
    </form>
  );
};

export default Edit;
