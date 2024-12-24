import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';

const AddCourier = (props: PageProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    accountType: 'courier',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    router.post(route('couriers.store'), form);
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
          label="Password"
          placeholder="Masukkan password kurir"
          type="password"
          value={form.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          required
          mb="sm"
        />

        <Button onClick={handleSubmit} mt="md">
          Tambah Kurir
        </Button>
      </form>
    </PageSection>
  );
};

export default AddCourier;
