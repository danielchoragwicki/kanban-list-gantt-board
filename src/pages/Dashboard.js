import React, { Component } from 'react';
import PropTypes from 'prop-types'
import AddBoardInput from '../components/inputs/AddBoardInput'
import BoardsList from '../components/dashboard/BoardsList'
import { generateId } from '../utils/helpers'
import { deleteBoards } from '../utils/service'

class Dashboard extends Component {
  state = {
    isInputOpen: false,
    errSubmit: false,
    currentBoard: {
        name: '',
        theme: 'New Life'
    }
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
    this.setState({
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
    alert('Empty input. Add some text.')
  }
  handleDeleteLocal = e => {
    deleteBoards()
    window.location.reload()
  }
  render () {
    const { currentBoard, errSubmit, isInputOpen } = this.state
    const { boards } = this.props
    const submit = currentBoard.name === '' 
      ? this.handleErrorSubmit
      : this.handleSubmit
    return (
      <div className="dashboard">
          <button className="delete-local" onClick={this.handleDeleteLocal}>Delete localStorage</button>
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