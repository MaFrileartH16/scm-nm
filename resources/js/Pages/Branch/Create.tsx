import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';

const CreateBranch = (props: PageProps) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    accountType: 'branch',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    router.post(route('branches.store'), form);
  };

  return (
    <PageSection {...props}>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label="Nama Cabang"
          placeholder="Masukkan nama cabang"
          value={form.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Email"
          placeholder="Masukkan email cabang"
          value={form.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Password"
          placeholder="Masukkan password"
          type="password"
          value={form.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          required
          mb="sm"
        />

        <Button onClick={handleSubmit} mt="md">
          Tambah Cabang
        </Button>
      </form>
    </PageSection>
  );
};

export default CreateBranch;
