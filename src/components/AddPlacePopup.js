import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [location, setLocation] = React.useState('');
  const [link, setLink] = React.useState('');
  function handleLocationChange(e) {
    setLocation(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();
  
    props.onAddPlace({
      location, link
    });
  }

  React.useEffect(() => {
    setLink('');
    setLocation('');
  }, [props.isOpen]);
  
  return(
    <PopupWithForm
      name='add'
      title='Новое место'
      button='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <input 
        className="form__input form__input_type_location"
        type="text"
        name="location"
        minLength="2" maxLength="30"
        placeholder="Название"
        required
        value={location} onChange={handleLocationChange}
      />
      <span className="form__error-message location-error"></span>
      <input
        className="form__input form__input_type_link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку" 
        required
        value={link} onChange={handleLinkChange}
      />
      <span className="form__error-message link-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;