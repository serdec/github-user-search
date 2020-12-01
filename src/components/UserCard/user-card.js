import React from 'react';
import { object, string } from 'prop-types';
import styles from './user-card.module.css';
import UserCard__ProfilePicture from './__ProfilePicture/user-card__profile-picture';
import UserCard__Repos from './__Repos/user-card__repos';
import UserCard__Details from './__Details/user-card__details';

const UserCard = ({ user = {}, className = '' } = {}) => (
  <div className={`${styles.userCard} ${className}`}>
    <UserCard__ProfilePicture img={user.avatar_url} />
    <UserCard__Details user={user} />
    <UserCard__Repos repos={user.repos} />
  </div>
);

UserCard.propTypes = {
  user: object,
  className: string,
};
export default UserCard;
