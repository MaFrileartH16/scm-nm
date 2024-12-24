import {
  FieldState,
  useFormFieldsWithComponents,
} from '@/hooks/useFormFieldsWithComponents';
import { useForm } from '@inertiajs/react';
import { Button, ThemeIcon, Title } from '@mantine/core';
import {
  IconLock,
  IconLockOpen,
  IconMail,
  IconPassword,
  IconPhoto,
} from '@tabler/icons-react';
import { FormEvent } from 'react';

export const LoginForm = () => {
  const form = useForm({
    email: '',
    password: '',
  });

  const fields: FieldState<typeof form.data>[] = [
    {
      type: 'text',
      name: 'email',
      label: 'Alamat Surel',
      placeholder: 'email@scm.id',
      required: true,
      autoFocus: true,
      leftSection: <IconMail />,
      validate: (value) => {
        if (!value) {
          form.setError('email', 'Alamat surel tidak boleh kosong.');
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) {
          form.setError('email', 'Format alamat surel tidak sah.');
          return;
        }
        form.clearErrors('email');
      },
    },
    {
      type: 'password',
      name: 'password',
      label: 'Kata Sandi',
      placeholder: '********',
      required: true,
      leftSection: <IconPassword />,
      validate: (value) => {
        if (!value) {
          form.setError('password', 'Kata sandi tidak boleh kosong.');
          return;
        }
        if (value.length < 8) {
          form.setError(
            'password',
            'Kata sandi harus memiliki minimal 8 karakter.',
          );
          return;
        }
        if (!/[A-Z]/.test(value)) {
          form.setError('password', 'Kata sandi harus memiliki huruf kapital.');
          return;
        }
        if (!/[0-9]/.test(value)) {
          form.setError('password', 'Kata sandi harus memiliki angka.');
          return;
        }
        form.clearErrors('password');
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
    form.post(route('login'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ThemeIcon variant="light" radius="xl" size={48} color="amaranth">
        <IconPhoto />
      </ThemeIcon>

      <Title order={3} mt="md" mb="xl">
        Selamat Datang, <br /> Silakan Masuk
      </Title>

      {renderFields()}

      <Button
        leftSection={
          form.hasErrors || Object.values(form.data).some((value) => !value) ? (
            <IconLock />
          ) : (
            <IconLockOpen />
          )
        }
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
        Masuk Akun
      </Button>
    </form>
  );
};
