import { NextPage } from 'next';
import Container from './Container';

interface SectionProps {
  children: any;
  extend?: string;
}

const Section: NextPage<SectionProps> = ({
    children,
    extend
}) => {
  return (
    <section className={`mt-10 ${extend}`}>
      <Container>{children}</Container>
    </section>
  )
}

export default Section;