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

const Create = (props) => {
  const { data, setData, post, processing, reset, errors } = useForm({
    code: '',
    name: '',
    quantity: 0,
    unit: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('items.store'), {
      onSuccess: () => reset(),
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
        <Title mb="md">Tambah Barang</Title>

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
            Simpan
          </Button>
        </Group>
      </AuthenticatedLayout>
    </form>
  );
};

export default Create;
