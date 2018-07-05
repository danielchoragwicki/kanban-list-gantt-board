import React from 'react'
import PropTypes from 'prop-types'


const AddButton = ({handleClick, disabled}) => {
    return (
        <button 
            onClick={handleClick}
            type="submit"
            className={`button button--add ${disabled ?'button--disabled' : ''}`} 
            disabled={disabled && true}>Add board</button>
    )
}

AddButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
}


export default AddButton;