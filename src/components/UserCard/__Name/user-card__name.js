import React from 'react';
import { string } from 'prop-types';
import styles from '../user-card.module.css';

const UserCard__Name = ({ name = '' } = {}) => (
  <div className={styles.userCard__name}> {name}</div>
);

UserCard__Name.propTypes = {
  name: string,
};

export default UserCard__Name;
