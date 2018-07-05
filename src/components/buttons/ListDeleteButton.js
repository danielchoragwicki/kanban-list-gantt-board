import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class ListDeleteButton extends Component {
    state = {
        isAlertOpen: false
    }
    thisRef = React.createRef();
    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }
    handleClick = e => {
        if(this.thisRef.current.contains(e.target)) {
            this.setState(prevState => ({
                isAlertOpen: !prevState.isAlertOpen
            }))
            return 
        }
        this.setState({isAlertOpen: false})
    }
    render() {
        return (
            <div className="button__wrapper" ref={this.thisRef}>
                <button type="button" className="list__del-button"><FontAwesomeIcon className="list__icon" icon={faTrashAlt}/></button>
                {this.state.isAlertOpen && <div className={`button__inner${this.props.theme === 'card' || 'list' ? ' button__inner--card' : ''}`}>
                    <p className="button__inner-text">Are you sure?</p>
                    <button onClick={this.props.handleRemove} type="button"className="button button--delete">Delete</button>
                </div>}
            </div>
        )
    }
}

ListDeleteButton.propTypes = {
    handleRemove: PropTypes.func.isRequired,
    theme: PropTypes.string
}


export default ListDeleteButton;