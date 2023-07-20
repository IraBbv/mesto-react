function Card(props) {
  return (
    <div className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} 
      onClick={() => props.onCardClick(props.card)}/>
      <button type="button" className="card__trash-button"></button>
      <div className="card__description">
        <h2 className="card__name">{props.card.name}</h2>
        <div className="card__like-container">
          <button type="button" className="card__like-button"></button>
          <span className="card__like-quantity">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;