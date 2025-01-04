import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { useForm } from '@inertiajs/react';
import { Button, Group, Textarea, TextInput, Title } from '@mantine/core';

const EditCourier = (props) => {
  const { data, setData, put, processing, errors } = useForm({
    full_name: props.courier.full_name || '',
    phone_number: props.courier.phone_number || '',
    address: props.courier.address || '',
    email: props.courier.email || '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('couriers.update', { id: props.courier.id }), {
      onSuccess: () => {
        // Perform any success actions, like showing a toast
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
        <Title mb="md">Edit Kurir</Title>

        <TextInput
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap kurir"
          value={data.full_name}
          onChange={(e) => setData('full_name', e.target.value)}
          error={errors.full_name}
          required
          mb="md"
        />

        <TextInput
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon kurir"
          value={data.phone_number}
          onChange={(e) => setData('phone_number', e.target.value)}
          error={errors.phone_number}
          required
          mb="md"
        />

        <Textarea
          label="Alamat"
          placeholder="Masukkan alamat kurir"
          value={data.address}
          onChange={(e) => setData('address', e.target.value)}
          error={errors.address}
          required
          mb="md"
        />

        <TextInput
          label="Email"
          placeholder="Masukkan email kurir"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          error={errors.email}
          required
          mb="md"
        />

        <TextInput
          label="Password"
          type="password"
          placeholder="Biarkan kosong jika tidak ingin mengganti password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          error={errors.password}
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

export default EditCourier;
