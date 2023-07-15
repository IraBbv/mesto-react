function ImagePopup(props) {
  return(
    <div className="popup popup_type_photo">
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
        <img className="popup__image" />
        <p className="popup__subtitle"></p>
      </div>
    </div>
  )
}

export default ImagePopup;