import { AuthenticatedLayout } from '@/Layouts/AuthenticatedLayout.jsx';

const Dashboard = (props) => {
  return (
    <AuthenticatedLayout
      title={props.page_title}
      notification={props.notification}
      user={props.auth.user}
    >
      dasboard
    </AuthenticatedLayout>
  );
};

export default Dashboard;
