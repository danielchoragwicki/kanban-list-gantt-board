import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CardEdit from './CardEdit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faAlignLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

class Card extends Component {
    state = {
        name: '', 
        desc: '', 
        startDate: '', 
        endDate: '',
        isEditable: false,
        editCard: {
            name: '', 
            desc: '', 
            startDate: '', 
            endDate: '',
        }
    }
    componentDidMount() {
        this.setState({
            ...this.props,
            editCard: {
                ...this.props
            }
        })
    }  
    handleClick = e => {
        if(e.keyCode === 27 && this.state.isEditable) {
          this.setState(prevState => ({
            isEditable: !prevState.isEditable
          }))
        } else if (e.type === "click") {
          this.setState(prevState => ({
            isEditable: !prevState.isEditable
          }))
        }
    }
    handleChange = (e, property) => {
        const val = e.target.value;
        this.setState(prevState => ({
            editCard: {
                ...prevState.editCard,
                [property]: val
            }
        }))
    }
    handleRemove = id => {
        this.props.handleCardRemove(id);
    }
    handleSubmit = e => {
        e.preventDefault()
        const updatedCard = {
            ...this.state.editCard
        }
        this.setState({
            ...updatedCard,
            isEditable: false
        })
        this.props.handleCardEdit(updatedCard);
    }
    render() {
        const { name, desc, startDate, endDate, isEditable } = this.state 
        return(
            <div>
                <div className="card">
                    <p className="card__title">{name}</p>
                    <div className="card__info">
                        {desc && <FontAwesomeIcon className="card__icon card__icon--desc" icon={faAlignLeft}/>}
                        {(startDate || endDate) && <p className="card__dates">
                            <FontAwesomeIcon className="card__icon card__icon--calendar" icon={faCalendarAlt}/>
                            <span className="card__date">{startDate ? startDate : '??'}</span>
                            <span>-</span>
                            <span className="card__date">{endDate ? endDate : '??'}</span>
                        </p>}
                    </div>
                    <button className="card__edit-button" onClick={this.handleClick}><FontAwesomeIcon className="card__icon" icon={faPencilAlt}/></button>
                </div>
                {isEditable
                    && <CardEdit {...this.state}
                            id={this.props.id}
                            handleClick={this.handleClick}
                            handleRemove={this.handleRemove}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}/>}
            </div>
        )
    }
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
}

export default Card;