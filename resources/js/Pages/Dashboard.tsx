import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';
import { useEffect } from 'react';

const Dashboard = (props: PageProps) => {
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

  return <PageSection {...props}></PageSection>;
};

export default Dashboard;
