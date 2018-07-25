import React, { Component } from 'react';
import Dashboard from './pages/Dashboard';
import Board from './pages/Board'
import { findById, addItem, updateList, removeItem } from './utils/helpers'
import { loadBoards, saveBoards } from './utils/service'
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom"; 
import './styles/styles.css';

class App extends Component {
  state = {
    boards: []
  }
  componentDidMount() {
    const boards = loadBoards()
    this.setState({boards})
  }
  handleCreate = newBoard => {
    const updatedBoards = addItem(this.state.boards, newBoard)
    this.setState({boards: updatedBoards})
    saveBoards(updatedBoards)
  }
  handleRemove = id => {
    const updatedBoards = removeItem(this.state.boards, id)
    this.setState({boards: updatedBoards})
    saveBoards(updatedBoards)
  }
  updatedBoard = board => {
    const upadtedBoard = updateList(this.state.boards, board)
    this.setState({boards: upadtedBoard})
    saveBoards(upadtedBoard)
  }
  render() {  
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path='/' render={props => (<Dashboard 
                    handleCreate={this.handleCreate} 
                    boards={this.state.boards} 
                    {...props}/>)
                }/>
                <Route path="/board/:id" 
                render={props => {
                    const ifCorrectID = findById(props.match.params.id, this.state.boards)
                    return (ifCorrectID 
                      ? <Board id={props.match.params.id} 
                          board={ifCorrectID} 
                          handleRemove={this.handleRemove} 
                          updatedBoard={this.updatedBoard} /> 
                      : <Redirect to='/' />)
                  }
                }/>
                <Redirect to='/'/>
            </Switch>
        </BrowserRouter>
    );
  } 
}

export default App;