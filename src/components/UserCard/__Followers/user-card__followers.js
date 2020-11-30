import React from 'react';
import { number } from 'prop-types';
import styles from '../user-card.module.css';

const UserCard__Followers = ({ followers = 0 } = {}) => (
  <div className={styles.userCard__followers}> Followers: {followers}</div>
);

UserCard__Followers.propTypes = {
  followers: number,
};

export default UserCard__Followers;
