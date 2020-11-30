import React from 'react';
import { string } from 'prop-types';
import styles from '../user-card.module.css';

const UserCard__ProfilePicture = ({ img = '' } = {}) => (
  <div className={styles.userCard__profilePictureContainer}>
    <img src={img} className={styles.userCard__profilePicture} />
  </div>
);

UserCard__ProfilePicture.propTypes = {
  img: string,
};

export default UserCard__ProfilePicture;
