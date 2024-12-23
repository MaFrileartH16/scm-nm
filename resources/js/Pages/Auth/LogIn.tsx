import { LoginForm } from '@/Components/LogInForm';
import { GuestLayout } from '@/Layouts/GuestLayout';
import { PageProps } from '@/types';
import { Box, Center } from '@mantine/core';
import { useEffect } from 'react';

const Login = (props: PageProps) => {
  useEffect(() => {
    const blockBackNavigation = () => {
      window.history.pushState(null, '', window.location.href);
    };

    blockBackNavigation();

    const handlePopState = () => {
      blockBackNavigation();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <GuestLayout {...props}>
      <Center flex={1}>
        <Box
          w={{
            base: '100%',
            xs: '80%',
            sm: '60%',
            md: '40%',
            lg: '20%',
            xl: '10%',
          }}
        >
          <LoginForm />
        </Box>
      </Center>
    </GuestLayout>
  );
};

export default Login;
