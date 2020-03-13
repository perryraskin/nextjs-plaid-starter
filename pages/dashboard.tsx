import { NextPage } from 'next';
import PLink from '../components/PLink';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Button from '../components/Button';

import { Twitter, GitHub, Linkedin, Mail } from "react-feather";

interface DashboardProps {
  userAgent?: string;
}

const Dashboard: NextPage<DashboardProps> = ({
  userAgent
}) => {
  return (
    <Layout>
      <Section extend="text-center lg:text-left">
      <p className="text-gray-600 dark:text-neutral-300 text-2xl md:text-4xl">
        Welcome! 👋
      </p>
      <h2 className="text-4xl md:text-6xl leading-tight font-bold dark:text-neutral-10 mb-8 border-b-0">
        Dashboard
      </h2>
      <PLink />
    </Section>
  </Layout>
  );
};

export default Dashboard;