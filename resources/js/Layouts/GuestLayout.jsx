import { AppLayout } from '@/Layouts/AppLayout.jsx';

export const GuestLayout = (props) => {
  return (
    <AppLayout title={props.title} notification={props.notification}>
      {props.children}
    </AppLayout>
  );
};
