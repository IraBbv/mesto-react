function ImagePopup(props) {
  return(
    <div className={`popup popup_type_photo ${props.card.link && ('popup_opened')}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} />
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;