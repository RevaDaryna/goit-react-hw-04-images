import {useState, useEffect} from "react";
import css from './Modal.module.css'
import PropTypes from "prop-types";

export default function Modal({largeImageURL, modalClose}){

  useEffect(() => {window.addEventListener('keydown', closeModal)}, [])

  const closeModal = e => {
      if (e.target === e.currentTarget || e.code === 'Escape') {
          modalClose();
      }

      return () =>  {window.removeEventListener('keydown', closeModal)}
  }

    return ( 
    <div className={css.Overlay} onClick={closeModal}>
       <div className={css.Modal}>
         <img src={largeImageURL} alt="" />
       </div>
    </div>)

}

Modal.propTypes = {
  modalClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired 
}