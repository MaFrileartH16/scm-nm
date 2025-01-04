import { GuestLayout } from '@/Layouts/GuestLayout.jsx';
import { router } from '@inertiajs/react';
import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Image,
  Space,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconEye,
  IconEyeOff,
  IconMail,
  IconPassword,
} from '@tabler/icons-react';
import { useState } from 'react';

const Login = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values) => {
    const normalizedValues = {
      ...values,
      email: values.email.toLowerCase(),
    };

    router.post(route('login'), normalizedValues);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <GuestLayout title={props.page_title} notification={props.notification}>
        <Flex flex={1}>
          <Container
            size="xs"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Image
              h={48}
              w={48}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/1120px-Honda_Logo.svg.png"
            />

            <Space h={16} />

            <Title align="center">Masuk Akun</Title>

            <Space h={32} />

            <TextInput
              w="100%"
              autoFocus
              label="Alamat Surel"
              placeholder="email@ahass.id"
              {...form.getInputProps('email')}
              required
              leftSection={<IconMail />}
              styles={{
                section: { width: 24, margin: '0 16px' },
                wrapper: { marginBottom: 0 },
                label: { marginBottom: 8 },
                input: { padding: '0 16px 0 56px', height: 48 },
              }}
            />

            <Space h={16} />

            <TextInput
              w="100%"
              type={isPasswordVisible ? 'text' : 'password'}
              label="Kata Sandi"
              placeholder="********"
              {...form.getInputProps('password')}
              required
              leftSection={<IconPassword />}
              rightSection={
                <Tooltip
                  p={16}
                  offset={0}
                  arrowSize={16}
                  withArrow
                  arrowRadius={8}
                  label={
                    isPasswordVisible
                      ? 'Sembunyikan kata sandi'
                      : 'Tampilkan kata sandi'
                  }
                >
                  <ActionIcon
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    variant="transparent"
                    color="neutral"
                  >
                    {isPasswordVisible ? (
                      <IconEyeOff size={24} />
                    ) : (
                      <IconEye size={24} />
                    )}
                  </ActionIcon>
                </Tooltip>
              }
              styles={{
                section: { width: 24, margin: '0 16px' },
                wrapper: { marginBottom: 0 },
                label: { marginBottom: 8 },
                input: { padding: '0 56px', height: 48 },
              }}
            />

            <Space h={32} />

            <Button h={48} type="submit" fullWidth>
              Masuk
            </Button>
          </Container>
        </Flex>
      </GuestLayout>
    </form>
  );
};

export default Login;
