import React, {Component} from 'react'
import PropTypes from 'prop-types'
import DeleteButton from '../buttons/DeleteButton'
import SaveButton from '../buttons/SaveButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class CardEdit extends Component {
    componentDidMount(){
        document.addEventListener("keydown", this.props.handleClick);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.props.handleClick);
    }
    render() {
        const {id, editCard, handleRemove, handleChange, handleSubmit, handleClick} = this.props
        return(
            <div className="card-edit">
                <div className="card-edit__inner">
                    <button className="card-edit__exit-button" onClick={handleClick}><FontAwesomeIcon icon={faTimes}/></button>
                    <form onSubmit={handleSubmit}>
                        <div className="card-edit__form">
                            <input className="card-edit__title" onChange={e => handleChange(e, 'name')} value={editCard.name}/>
                            <textarea placeholder="Descritpion..." className="card-edit__desc" onChange={e => handleChange(e, 'desc')} value={editCard.desc}/>
                            <div className="card-edit__date">
                                Start:
                                <input type="date" onChange={e => handleChange(e, 'startDate')} value={editCard.startDate}/>
                            </div>
                            <div className="card-edit__date">
                                End:
                                <input type="date" onChange={e => handleChange(e, 'endDate')} value={editCard.endDate}/>
                            </div>
                            <div className="card-edit__buttons">
                                <SaveButton handleClick={handleSubmit} />
                                <DeleteButton theme="card" handleRemove={() => handleRemove(id)} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

CardEdit.propTypes = {
    name: PropTypes.string.isRequired, 
    desc: PropTypes.string,  
    startDate: PropTypes.string,  
    endDate: PropTypes.string, 
    handleClick: PropTypes.func.isRequired, 
    handleRemove: PropTypes.func.isRequired, 
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export default CardEdit;