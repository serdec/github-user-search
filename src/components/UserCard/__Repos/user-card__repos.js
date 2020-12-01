import React from 'react';
import Link from 'next/link';
import { array } from 'prop-types';
import styles from '../user-card.module.css';

const orderReposByStarsDesc = (repos) =>
  repos.sort((r1, r2) => r2.stargazers_count - r1.stargazers_count);

const UserCard__Repos = ({ repos = [] } = {}) => {
  const orderedRepos = orderReposByStarsDesc(repos);
  return (
    <div className={styles.userCard__reposList}>
      {orderedRepos.length > 0 && <h4>Repos</h4>}
      {orderedRepos.slice(0, 5).map((repo) => (
        <div key={repo.id} className={styles.userCard__repo}>
          <Link href={repo.html_url}>
            <a>{repo.name}</a>
          </Link>{' '}
          <img src="/star.png" width="15" height="15" />
          {repo.stargazers_count}{' '}
        </div>
      ))}
    </div>
  );
};

UserCard__Repos.propTypes = {
  repos: array,
};

export default UserCard__Repos;
