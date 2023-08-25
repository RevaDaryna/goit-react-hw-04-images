import { useEffect, useCallback} from "react";
import css from './Modal.module.css'
import PropTypes from "prop-types";

export default function Modal({largeImageURL, modalClose}){

  
  const closeModal = useCallback(e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      modalClose();
    }
    
  }, [modalClose])
  
  useEffect(() => {window.addEventListener('keydown', closeModal)

  return () =>  {window.removeEventListener('keydown', closeModal)}

  }, [closeModal])

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