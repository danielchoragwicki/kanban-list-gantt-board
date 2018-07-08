import React from 'react'
import PropTypes from 'prop-types'


const NewList = ({newListName, handleSubmit, handleChange}) => {
    return (
        <div className="list new-list">
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} placeholder="+ Add board" className="new-list__input" value={newListName} type="text"/>
            </form>
        </div>
    )
}

NewList.propTypes = {
    newListName: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default NewList;