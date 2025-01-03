import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';
import { router } from '@inertiajs/react';
import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const EditBranch = (props) => {
  const form = useForm({
    initialValues: {
      full_name: props.branch?.full_name || '',
      phone_number: props.branch?.phone_number || '',
      email: props.branch?.email || '',
      password: '',
    },
    validate: {
      full_name: (value) => (value.trim() ? null : 'Nama cabang harus diisi'),
      phone_number: (value) =>
        value.trim() ? null : 'Nomor telepon cabang harus diisi',
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : 'Email tidak valid',
      password: (value) =>
        value.length === 0 || value.length >= 8
          ? null
          : 'Kata sandi minimal 8 karakter',
    },
  });

  const handleSubmit = (values) => {
    router.put(route('branches.update', { id: props.branch.id }), values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <AuthenticatedLayout
        appLayoutProps={{
          title: props.page_title,
          notification: props.notification,
        }}
        headerProps={{
          user: props.auth.user,
        }}
        pageHeadingsProps={{
          title: props.page_title,
          breadcrumbs: [
            { title: 'Cabang', route: 'branches.index' },
            { title: 'Edit', route: 'branches.edit' },
          ],
          actionButtonProps: {
            isVisible: props.auth.user.role === 'Admin',
            label: 'Simpan',
            type: 'submit',
          },
        }}
      >
        <TextInput
          label="Nama Cabang"
          placeholder="Masukkan nama cabang"
          {...form.getInputProps('full_name')}
          required
          styles={{
            wrapper: { marginBottom: 16 },
            label: { marginBottom: 8 },
            input: { height: 48 },
          }}
        />

        <TextInput
          label="Nomor Telepon"
          placeholder="Masukkan nomor telepon"
          {...form.getInputProps('phone_number')}
          required
          styles={{
            wrapper: { marginBottom: 16 },
            label: { marginBottom: 8 },
            input: { height: 48 },
          }}
        />

        <TextInput
          label="Email"
          placeholder="Masukkan email cabang"
          {...form.getInputProps('email')}
          required
          styles={{
            wrapper: { marginBottom: 16 },
            label: { marginBottom: 8 },
            input: { height: 48 },
          }}
        />

        <TextInput
          label="Kata Sandi"
          placeholder="Kosongkan jika tidak ingin mengubah"
          type="password"
          {...form.getInputProps('password')}
          styles={{
            wrapper: { marginBottom: 16 },
            label: { marginBottom: 8 },
            input: { height: 48 },
          }}
        />
      </AuthenticatedLayout>
    </form>
  );
};

export default EditBranch;
