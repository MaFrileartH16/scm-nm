import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';
import { router } from '@inertiajs/react';
import { Button, NumberInput, TextInput } from '@mantine/core';
import { useState } from 'react';

const Edit = (props: PageProps) => {
  const { item } = props;

  const [form, setForm] = useState({
    code: item.code || '',
    name: item.name || '',
    quantity: item.quantity || 0,
    unit: item.unit || '',
  });

  const handleInputChange = (field: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    router.put(route('items.update', { id: item.id }), form);
  };

  return (
    <PageSection {...props}>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label="Kode Barang"
          placeholder="Masukkan kode barang"
          value={form.code}
          onChange={(e) => handleInputChange('code', e.target.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Nama Barang"
          placeholder="Masukkan nama barang"
          value={form.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
          mb="sm"
        />
        <NumberInput
          label="Kuantitas"
          placeholder="Masukkan jumlah"
          value={form.quantity}
          onChange={(value) => handleInputChange('quantity', value || 0)}
          required
          mb="sm"
        />
        <TextInput
          label="Satuan"
          placeholder="Masukkan satuan"
          value={form.unit}
          onChange={(e) => handleInputChange('unit', e.target.value)}
          required
          mb="sm"
        />

        <Button onClick={handleSubmit} mt="md">
          Simpan Perubahan
        </Button>
      </form>
    </PageSection>
  );
};

export default Edit;
