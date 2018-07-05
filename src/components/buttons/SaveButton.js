import React from 'react'
import PropTypes from 'prop-types'


const SaveButton = ({handleClick, disabled}) => {
    return (
        <button 
            onClick={handleClick}
            type="submit"
            className="button button--save">Save</button>
    )
}

SaveButton.propTypes = {
    handleClick: PropTypes.func.isRequired,

}


export default SaveButton;