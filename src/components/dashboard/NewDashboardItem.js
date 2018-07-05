import React from 'react'
import PropTypes from 'prop-types'

const NewDashboardItem = props => {
    return (
        <div className="board-item">
            <button className="board-item__link board-item__link--add" onClick={props.handleClick}>
                <div className="board-item__icon">+</div>
                <p className="board-item__title">Add board</p>
            </button>
        </div> 
    )
}

NewDashboardItem.propTypes = {
    handleClick: PropTypes.func.isRequired
}
  

export default NewDashboardItem;