import { NextPage } from 'next';
import Head from 'next/head';

import Dashboard from './dashboard';

interface IndexProps {
  userAgent: string;
}

const Index: NextPage<IndexProps> = ({}) => {
  return (
    <div>
      <Head>
        <meta name="description" content="An awesome app powered by Plaid"/>
        <title>Dashboard</title>
      </Head>
      <Dashboard/>
    </div>
  );
};

Index.getInitialProps = async ctx => {
  const { req } = ctx;

  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
}

export default Index;