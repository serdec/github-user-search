import React from 'react';
import { string } from 'prop-types';
import App from '../components/App/app';
import page from '../components/HOCs/page';
import { initOctokit } from '../components/Users/saga';

const Home = ({ token }) => {
  initOctokit(token);
  return <App />;
};

Home.propTypes = {
  token: string,
};
export const getStaticProps = async () => {
  return {
    props: {
      token: process.env.GITHUB_CLIENT_SECRET,
    },
  };
};

export default page(Home);
