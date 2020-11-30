import React, { useState } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import styles from '../search.module.css';
import Search__Button from '../__Button/search__button';
import Search__Input from '../__Input/search__input';
import { getUsers_sagaAction } from '../../Users/saga';

const mapDispatchToProps = {
  getUsers: getUsers_sagaAction,
};
const noop = () => {};

export const Search__InputContainer = ({ getUsers = noop } = {}) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const content = e.target.value;
    setInputValue(content);
  };

  const handleSearch = async () => {
    console.log(inputValue);
    getUsers({ q: inputValue });
  };

  return (
    <div className={styles.search__inputContainer}>
      <Search__Input
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        onEnterPress={handleSearch}
      />
      <Search__Button onClick={handleSearch} />
    </div>
  );
};

Search__InputContainer.propTypes = {
  getUsers: func,
};

export default connect(null, mapDispatchToProps)(Search__InputContainer);
