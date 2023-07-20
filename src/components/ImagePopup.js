function ImagePopup(props) {
  return(
    <div className={`popup popup_type_photo ${props.isOpen && ('popup_opened')}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__subtitle">{props.card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;