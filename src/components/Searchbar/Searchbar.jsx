import {useState} from "react";
import PropTypes from "prop-types";
import css from './Searchbar.module.css'
import {ReactComponent as SearchIcon} from '../icons/icons.svg'
import toast from 'react-hot-toast';

export default function Searchbar({onSubmit}){

  const [query, setQuery] = useState('')

  const handleSubmit = evt => {
    evt.preventDefault();
    if(query.trim() === '') {
      return toast.error('Enter a request')
    }
    onSubmit(query.trim());
    setQuery('')
  };

  const handleChange = evt => {
    setQuery(evt.target.value)
  };  

  return (
      <>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className="button-label"><SearchIcon /></span>
          </button>
      
          <input
            className={css.SearchFormInput}
            value={query}
            onChange={handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
      </>
  )  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
