import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import ThemeButton from '../buttons/ThemeButton'
import DeleteButton from '../buttons/DeleteButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class BoardHeader extends React.Component {
    state = {
        currentBoard: {
            name: '',
            theme: ''
        },
        isInputOpen: false,
    }
    componentDidMount() {
        this.setState({
            currentBoard: {
                name: this.props.board.name,
                theme: this.props.board.theme
            }
        })
    }
    handleNameChange = e => {
        const val = e.target.value;
        this.setState(prevState => ({
            currentBoard: {
                ...prevState.currentBoard,
                name: val
            }
        }))
        
    }
    handleSubmit = e => {
        e.preventDefault()
        const upadtedBoard = {
            ...this.state.currentBoard,
        }
        this.props.handleUpdate(upadtedBoard)
    }
    handleRadioChange = e => {
        const val = e.target.value;
        const upadtedBoard = {
            ...this.state.currentBoard,
            theme: val
        }
        this.setState(prevState => ({
            currentBoard: {
                ...prevState.currentBoard,
                theme: val
            }
        }))
        this.props.handleUpdate(upadtedBoard)
    }
    
    render() {
        const {handleDisplayChange, id, handleRemove, display} = this.props 
        return (
            <div className="board-header__wrapper">
                <header className="board-header">
                    <Link className="back-link" to={process.env.PUBLIC_URL + '/'}><FontAwesomeIcon icon={faArrowLeft}/></Link>
                    <div className="board-header__inner">
                        <h1 className="board-header__title">
                            <form onSubmit={this.handleSubmit}>
                                <input className="board-header__input"
                                    value={this.state.currentBoard.name}
                                    onChange={this.handleNameChange} 
                                    onBlur={this.handleSubmit}
                                    type="text"/>
                            </form>
                        </h1>
                        <ThemeButton currentTheme={this.state.currentBoard.theme} handleRadioChange={this.handleRadioChange} />
                        <DeleteButton handleRemove={() => handleRemove(id)} />
                    </div>
                    <div className="board-header__display">
                        <label className={`display display--kanban${display === "kanban" ? ' active' : ''}`}>
                            <input type="checkbox" onChange={handleDisplayChange} checked={display === "kanban"} value="kanban"/>
                            <span className="display__line"></span>
                            <span className="display__line"></span>
                            <span className="display__line"></span>
                        </label>
                        <label className={`display display--list${display === "list" ? ' active' : ''}`}>
                            <input type="checkbox" disabled onChange={handleDisplayChange} checked={display === "list"} value="list"/>
                            <span className="display__line"></span>
                            <span className="display__line"></span>
                            <span className="display__line"></span>
                        </label>
                        <label className={`display display--gantt${display === "gantt" ? ' active' : ''}`}>
                            <input type="checkbox" disabled onChange={handleDisplayChange} checked={display === "gantt"} value="gantt"/>
                            <span className="display__line"></span>
                            <span className="display__line"></span>
                            <span className="display__line"></span>
                        </label>
                    </div>
                </header>
            </div>
        ); 
    }
}

BoardHeader.propTypes = {
    board: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleRemove: PropTypes.func.isRequired
}


export default BoardHeader;