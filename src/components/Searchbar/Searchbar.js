import { useState } from 'react';
import { toast } from 'react-toastify';
// import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
export default function Searchbar({ onSubmit }) {
  const [searchItem, setSearchItem] = useState('');

  const handleInputSearch = e => {
    setSearchItem(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (searchItem.trim() === '') {
      toast.error('Enter a word to search for!');
      return;
    }
    onSubmit(searchItem);
    reset();
  };
  const reset = () => {
    setSearchItem('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          onChange={handleInputSearch}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
