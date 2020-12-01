import React from 'react';
import { object } from 'prop-types';
import styles from '../user-card.module.css';
import Link from 'next/link';
import { createUser } from '../../Users/reducer';

const UserCard__Details = ({ user = createUser() } = {}) => (
  <div className={styles.userCard__details}>
    <Link href={user.html_url}>
      <a>{user.login}</a>
    </Link>
    <h4>{user.name}</h4>
    <h4>Followers:{user.followers}</h4>
    <p>{user.bio}</p>
  </div>
);

UserCard__Details.propTypes = {
  user: object,
};

export default UserCard__Details;
