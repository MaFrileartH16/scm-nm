import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';

const EditCourier = (props: PageProps) => {
  const { courier } = props;

  const [form, setForm] = useState({
    name: courier.name || '',
    email: courier.email || '',
    password: '', // Kosongkan jika tidak ingin mengganti password
  });

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    router.put(route('couriers.update', { id: courier.id }), form);
  };

  return (
    <PageSection {...props}>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label="Nama Kurir"
          placeholder="Masukkan nama kurir"
          value={form.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Email"
          placeholder="Masukkan email kurir"
          value={form.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Password Baru"
          placeholder="Masukkan password baru (opsional)"
          type="password"
          value={form.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          mb="sm"
        />

        <Button onClick={handleSubmit} mt="md">
          Simpan Perubahan
        </Button>
      </form>
    </PageSection>
  );
};

export default EditCourier;
