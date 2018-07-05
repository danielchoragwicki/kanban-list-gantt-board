import React, { Component } from 'react';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board'
import { findById, addItem, updateList, removeItem } from './utils/helpers'
import { loadBoards, createBoard, saveBoard, destroyBoard } from './utils/service'
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"; 
import './styles/styles.css';

class App extends Component {
  state = {
    boards: []
  }
  componentDidMount() {
    loadBoards()
      .then(boards => this.setState({boards}))
  }
  handleCreate = newBoard => {
    const updatedBoards = addItem(this.state.boards, newBoard)
    this.setState({boards: updatedBoards})
    createBoard(newBoard)
      .then(() => console.log(`Board ${newBoard.name} added`))
  }
  handleRemove = id => {
    const updatedBoards = removeItem(this.state.boards, id)
    this.setState({boards: updatedBoards})
    destroyBoard(id)
      .then(() => console.log(`Board with ID ${id} removed`))
  }
  updatedBoard = board => {
    const upadtedBoard = updateList(this.state.boards, board)
    this.setState({boards: upadtedBoard})
    saveBoard(board)
      .then(() => console.log(`Board ${board.name} updated`))
  }
  render() {
    return (
      <BrowserRouter>
            <Switch>
                <Route exact path="/" render={props => (
                    this.state.boards.length > 0 
                      ? <Dashboard 
                          handleCreate={this.handleCreate} 
                          boards={this.state.boards} 
                          {...props}/> 
                      : <div>Loading...</div> 
                  )
                }/>
                <Route path="/board/:id" 
                render={props => {
                    const ifCorrectID = findById(props.match.params.id, this.state.boards)
                    if(this.state.boards.length > 0) return (
                      ifCorrectID 
                      ? <Board id={props.match.params.id} 
                          board={ifCorrectID} 
                          handleRemove={this.handleRemove} 
                          updatedBoard={this.updatedBoard} /> 
                      : <Redirect to="/" />
                    )
                    return <div>Loading...</div> 
                  }
                }/>
                <Redirect to="/"/>
            </Switch>
        </BrowserRouter>
    );
  } 
}

export default App;