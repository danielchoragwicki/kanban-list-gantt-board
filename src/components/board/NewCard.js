import React from 'react'
import PropTypes from 'prop-types'


const NewCard = ({newCard, handleSubmit, handleChange}) => {
    return (
        <div className="new-card">
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange}  className="new-card__input" placeholder="+ Add card" value={newCard.name} type="text"/>
            </form>
        </div>
    )
}

NewCard.propTypes = {
    newCard: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired, 
    handleChange: PropTypes.func.isRequired
}

export default NewCard;