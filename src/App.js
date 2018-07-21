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
      <BrowserRouter>
            <Switch>
                <Route exact path={process.env.PUBLIC_URL + '/'} render={props => (<Dashboard 
                    handleCreate={this.handleCreate} 
                    boards={this.state.boards} 
                    {...props}/>)
                }/>
                <Route path={process.env.PUBLIC_URL + '/board/:id'} 
                render={props => {
                  if (this.state.boards.length > 0) {
                    const ifCorrectID = findById(props.match.params.id, this.state.boards)
                    return (ifCorrectID 
                      ? <Board id={props.match.params.id} 
                          board={ifCorrectID} 
                          handleRemove={this.handleRemove} 
                          updatedBoard={this.updatedBoard} /> 
                      : <Redirect to={process.env.PUBLIC_URL + '/'} />)
                    } else {
                      <div>Loading...</div>
                    }
                  }
                }/>
                <Redirect to={process.env.PUBLIC_URL + '/'}/>
            </Switch>
        </BrowserRouter>
    );
  } 
}

export default App;