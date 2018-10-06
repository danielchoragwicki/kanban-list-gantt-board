import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BoardHeader from '../components/board/BoardHeader'
import BoardLists from '../components/board/BoardLists'
import { generateId, addItem } from '../utils/helpers'

class Board extends Component {
    state = {
        board: {
            name: '',
            theme: '',
            lists: []
        },
        display: "kanban",
        newList: ''
    }
    componentDidMount() {
        this.setState({board: this.props.board})
    }
    handleUpdate = update => {
        const upadtedBoard = {
            ...this.state.board,
            id: this.props.id,
            name: update.name,
            theme: update.theme
        }
        this.setState(prevState => ({
            board: {
                ...prevState.board,
                name: update.name,
                theme: update.theme
            }
        }))
        this.props.updatedBoard(upadtedBoard)
    }
    handleDisplayChange = e => {
        this.setState({display: e.target.value})
    }
    handleAddListChange = e => {
        this.setState({newList: e.target.value})
    }
    handleAddListSubmit = e => {
        e.preventDefault()
        const newList = {
            id: generateId(),
            name: this.state.newList,
            items: []
        }
        const addList = addItem(this.state.board.lists, newList)
        const upadtedBoard = {
            ...this.state.board,
            lists: addList
        }
        this.setState(prevState => ({
            board: {
                ...prevState.board,
                lists: addList
            },
            display: "default",
            newList: ''
        }))
        this.props.updatedBoard(upadtedBoard)
    }
    handleListsUpdate = lists => {
        const upadtedBoard = {
            ...this.state.board,
            lists: lists
        }
        this.setState(prevState => ({
            board: {
                ...prevState.board,
                lists: lists
            }
        })) 
        this.props.updatedBoard(upadtedBoard)
    }
    render() {
        return (
            <div className={`board ${this.state.board.theme.toLowerCase().split(' ').join('-')}`}>
                <BoardHeader id={this.props.id} 
                    name={this.state.board.name} 
                    handleRemove={this.props.handleRemove} 
                    handleDisplayChange={this.handleDisplayChange}
                    board={this.props.board} 
                    display={this.state.display}
                    handleUpdate={this.handleUpdate} />
                <BoardLists 
                    id={this.props.id}
                    lists={this.state.board.lists} 
                    handleListsUpdate={this.handleListsUpdate} />
                <div className="theme-background"></div>
            </div>
        )
    }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
  updatedBoard: PropTypes.func.isRequired,
}

export default Board; 
