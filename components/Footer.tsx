import { NextPage } from 'next';
import Link from 'next/link';
import Section from '../components/Section';

interface FooterProps {
  userAgent?: string;
}

const Footer: NextPage<FooterProps> = ({}) => {
  const date = new Date().getFullYear();

  return (
    <Section extend="mb-10 lg:block hidden">
      <footer className="flex justify-between items-center">
        <div>
          <span className="opacity-50 text-base">© {date} A Plaid App</span>
        </div>
      </footer>
    </Section>
  )
}

export default Footer;