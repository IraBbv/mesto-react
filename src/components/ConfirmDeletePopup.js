import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup(props) {

  function confirmDeleteSubmit(evt) {
    evt.preventDefault();
    props.onSubmit();
  }
  return (

    <PopupWithForm 
      name='confirm'
      title='Вы уверены?'
      button='Да'
      isOpen={props.isOpen}
      onClose={props.onClose}
      isDeletePopup={true}
      onSubmit={confirmDeleteSubmit}
    />
  )
}

export default ConfirmDeletePopup;