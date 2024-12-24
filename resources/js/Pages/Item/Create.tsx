import AddItemForm from '@/Components/AddItemForm';
import { PageSection } from '@/Components/PageSection';
import { PageProps } from '@/types';

const Create = (props: PageProps) => {
  return (
    <PageSection {...props}>
      <AddItemForm />
    </PageSection>
  );
};

export default Create;
