import {
  FieldState,
  useFormFieldsWithComponents,
} from '@/hooks/useFormFieldsWithComponents';
import { useForm } from '@inertiajs/react';
import { Button, Title } from '@mantine/core';
import {
  IconBarcode,
  IconBox,
  IconNumbers,
  IconScale,
} from '@tabler/icons-react';
import { FormEvent } from 'react';

export const AddItemForm = () => {
  const form = useForm({
    code: '',
    name: '',
    quantity: '',
    unit: '',
  });

  const fields: FieldState<typeof form.data>[] = [
    {
      type: 'text',
      name: 'code',
      label: 'Kode Barang',
      placeholder: 'Masukkan kode barang',
      required: true,
      autoFocus: true,
      leftSection: <IconBarcode />,
      validate: (value) => {
        if (!value) {
          form.setError('code', 'Kode barang tidak boleh kosong.');
          return;
        }
        form.clearErrors('code');
      },
    },
    {
      type: 'text',
      name: 'name',
      label: 'Nama Barang',
      placeholder: 'Masukkan nama barang',
      required: true,
      leftSection: <IconBox />,
      validate: (value) => {
        if (!value) {
          form.setError('name', 'Nama barang tidak boleh kosong.');
          return;
        }
        form.clearErrors('name');
      },
    },
    {
      type: 'text',
      name: 'quantity',
      label: 'Kuantitas',
      placeholder: 'Masukkan jumlah',
      required: true,
      leftSection: <IconNumbers />,
      validate: (value) => {
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
          form.setError(
            'quantity',
            'Kuantitas harus berupa angka dan lebih dari nol.',
          );
          return;
        }
        form.clearErrors('quantity');
      },
    },
    {
      type: 'text',
      name: 'unit',
      label: 'Satuan',
      placeholder: 'Pilih satuan',
      required: true,
      leftSection: <IconScale />,
      validate: (value) => {
        if (!value) {
          form.setError('unit', 'Satuan harus dipilih.');
          return;
        }
        form.clearErrors('unit');
      },
    },
  ];

  const { renderFields, validateForm } = useFormFieldsWithComponents<
    typeof form.data
  >({
    fields,
    values: form.data,
    errors: form.errors,
    onChange: (name, value) => form.setData(name, value),
  });

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    form.post(route('items.store'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title order={3} mt="md" mb="xl">
        Tambah Barang Baru
      </Title>

      {renderFields()}

      <Button
        mt="md"
        type="submit"
        variant="filled"
        fullWidth
        h={48}
        disabled={
          form.hasErrors || Object.values(form.data).some((value) => !value)
        }
        loading={form.processing}
      >
        Tambah Barang
      </Button>
    </form>
  );
};

export default AddItemForm;
