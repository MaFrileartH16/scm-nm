import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { useForm } from '@inertiajs/react';
import { Button, Group, Textarea, TextInput, Title } from '@mantine/core';

const CreateCourier = (props) => {
  const { data, setData, post, processing, reset, errors } = useForm({
    full_name: '',
    phone_number: '',
    address: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('couriers.store'), {
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
        <Title mb="md">Tambah Kurir</Title>

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
          placeholder="Masukkan password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          error={errors.password}
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

export default CreateCourier;
