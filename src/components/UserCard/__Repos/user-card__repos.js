import React from 'react';
import { array } from 'prop-types';
import styles from '../user-card.module.css';

const orderReposByStarsDesc = (repos) =>
  repos.sort((r1, r2) => r2.stargazers_count - r1.stargazers_count);

const UserCard__Repos = ({ repos = [] } = {}) => {
  const orderedRepos = orderReposByStarsDesc(repos);
  return (
    <div className={styles.userCard__repos}>
      {orderedRepos.slice(0, 5).map((repo) => (
        <div key={repo.id}>{repo.name}</div>
      ))}
    </div>
  );
};

UserCard__Repos.propTypes = {
  repos: array,
};

export default UserCard__Repos;
