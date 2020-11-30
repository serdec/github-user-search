import React from 'react';
import { object, string } from 'prop-types';
import styles from './user-card.module.css';
import UserCard__Followers from './__Followers/user-card__followers';
import UserCard__ProfilePicture from './__ProfilePicture/user-card__profile-picture';
import UserCard__Repos from './__Repos/user-card__repos';
import UserCard__Name from './__Name/user-card__name';

const UserCard = ({ user = {}, className = '' } = {}) => (
  <div className={`${styles.userCard} ${className}`}>
    <UserCard__ProfilePicture img={user.avatar_url} />
    <UserCard__Name name={user.login} />
    <UserCard__Followers followers={user.followers} />
    <UserCard__Repos repos={user.repos} />
  </div>
);

UserCard.propTypes = {
  user: object,
  className: string,
};
export default UserCard;
