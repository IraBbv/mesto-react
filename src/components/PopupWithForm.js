function PopupWithForm (props) {

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : '' }`}>
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
        <form name={props.name} className="form" onSubmit={props.onSubmit} noValidate>
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button className={`form__submit-button ${props.isDeletePopup && "root__confirm-button-margin"}`} 
                  type="submit">
            {props.button}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;