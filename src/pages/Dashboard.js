import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AddBoardInput from '../components/inputs/AddBoardInput'
import BoardsList from '../components/dashboard/BoardsList'
import { generateId, addItem } from '../utils/helpers'
import { config } from '../utils/config'

class Dashboard extends Component {
  state = {
    boards: [],
    isInputOpen: false,
    errSubmit: false,
    currentBoard: {
        name: '',
        theme: 'New Life'
    }
  }
  componentDidMount() {
    this.setState({boards: this.props.boards})
  }
  handleClick = e => {
    if(e.keyCode === 27 && this.state.isInputOpen) {
      this.setState(prevState => ({
          isInputOpen: !prevState.isInputOpen
      }))
    } else if (e.type === "click") {
      this.setState(prevState => ({
          isInputOpen: !prevState.isInputOpen
      }))
    }
  }
  handleInputChange = e => {
    const val = e.target.value;
    this.setState(prevState => ({
        currentBoard: {
            ...prevState.currentBoard,
            name: val
        }
    }))
  }
  handleRadioChange = e => {
    const val = e.target.value;
    this.setState(prevState => ({
        currentBoard: {
            ...prevState.currentBoard,
            theme: val
        }
    }))
  }
  handleSubmit = e => {
    e.preventDefault()
    const newBoard = {
        id: generateId(),
        name: this.state.currentBoard.name,
        theme: this.state.currentBoard.theme,
        lists: []
    }
    const updatedBoards = addItem(this.state.boards, newBoard);
    this.setState({
        boards: updatedBoards,
        isInputOpen: false,
        errSubmit: false,
        currentBoard: {
            name: '',
            theme: 'New Life'
        }
    })
    this.props.handleCreate(newBoard)
  }
  handleErrorSubmit = e => {
    e.preventDefault()
  }
  render () {
    const {currentBoard, boards, errSubmit, isInputOpen} = this.state
    const submit = currentBoard.name.length > config.MAX_BOARD_TITLE_LENGTH 
      || currentBoard.name.length < config.MIN_BOARD_TITLE_LENGTH 
      ? this.handleErrorSubmit
      : this.handleSubmit
    return (
      <div className="container">
          <BoardsList 
            boards={boards} 
            handleClick={this.handleClick} />
          {isInputOpen && <AddBoardInput 
            errSubmit={errSubmit}
            currentBoard={currentBoard}  
            handleClick={this.handleClick} 
            handleInputChange={this.handleInputChange} 
            handleRadioChange={this.handleRadioChange} 
            handleSubmit={submit} />}
      </div>
    )
  }
}

Dashboard.propTypes = {
  boards: PropTypes.array.isRequired,
  handleCreate: PropTypes.func.isRequired
}
 
export default Dashboard;