import { Container } from '@mantine/core';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Container p={16} style={{ textAlign: 'center', color: '#555' }}>
      © {year} AHASS Group
    </Container>
  );
};
