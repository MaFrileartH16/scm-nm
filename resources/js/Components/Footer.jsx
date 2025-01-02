import { Container } from '@mantine/core';

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Container p={16} c="neutral">
      © {year} Penjadwalan Uji Emisi
    </Container>
  );
};
