import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { Button, TextInput } from '@mantine/core';
import { useState } from 'react';

const EditBranch = (props: PageProps) => {
  const { branch } = props;

  const [form, setForm] = useState({
    name: branch.name || '',
    email: branch.email || '',
    password: '', // Kosongkan jika tidak ingin mengganti password
    accountType: 'branch',
  });

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    router.put(route('branches.update', { id: branch.id }), form);
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

export default EditBranch;
