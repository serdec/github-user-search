import React from 'react';
import { object, func } from 'prop-types';
import styles from './pagination.module.css';
import { createPages } from '../Users/reducer';

const noop = () => {};

const isOnePage = ({ pages = createPages } = {}) =>
  !pages.last.page && !pages.first.page;

const getLastPageOrCurrent = ({ pages = createPages() } = {}) =>
  pages.last.page ? parseInt(pages.last.page) : parseInt(pages.current.page);

const createArrayWithTotalNumberOfPages = (lastPage = 1) =>
  Array.from(Array(lastPage), (_, i) => i + 1);

const Pagination = ({ pages = createPages(), handleSearch = noop } = {}) => {
  if (isOnePage({ pages })) return null;

  const lastPage = getLastPageOrCurrent({ pages });
  const pagesArr = createArrayWithTotalNumberOfPages(lastPage);

  return (
    <div className={styles.pagination}>
      {pages.prev.page && (
        <button
          className={styles.pagination__page}
          onClick={() =>
            handleSearch({ page: parseInt(pages.current.page) - 1 })
          }
        >
          Prev
        </button>
      )}
      {pagesArr.map((page) => {
        let selected =
          page === parseInt(pages.current.page)
            ? styles.pagination__page_selected
            : '';

        return (
          <button
            key={page}
            className={`${styles.pagination__page} ${selected}`}
            onClick={() => handleSearch({ page })}
          >
            {page}
          </button>
        );
      })}
      {pages.next.page && (
        <button
          className={styles.pagination__page}
          onClick={() =>
            handleSearch({ page: parseInt(pages.current.page) + 1 })
          }
        >
          Next
        </button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  pages: object,
  handleSearch: func,
};

export default Pagination;
