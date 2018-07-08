import React, {Component} from 'react'
import PropTypes from 'prop-types'
import List from  './List'
import NewList from './NewList'
import { generateId, addItem, updateList, removeItem } from '../../utils/helpers'
import { Scrollbars } from 'react-custom-scrollbars';
 
class BoardLists extends Component {
  state = {
    newListName: ''
  }
  handleChange = e => {
    this.setState({newListName: e.target.value})
  }
  handleSubmit = e => {
    e.preventDefault()
    const newList = {
      "id": generateId(),
      "name": this.state.newListName,
      "items": []
    }
    this.setState({newListName: ''})
    const updatedLists = addItem(this.props.lists, newList);
    this.props.handleListsUpdate(updatedLists);
  }
  handleRemove = id => {
    const updatedLists = removeItem(this.props.lists, id);
    this.props.handleListsUpdate(updatedLists);
  }
  handleListChange = list => {
    const updatedLists = updateList(this.props.lists, list);
    this.props.handleListsUpdate(updatedLists);
  }
  render() {
    return (
      <div className="board-lists__wrapper">
        <Scrollbars>
          <div className="board-lists">
              {this.props.lists.map(list => {
                return <List handleListChange={this.handleListChange} handleRemove={this.handleRemove} key={list.id} {...list}/>
              })}
              <NewList
                newListName={this.state.newListName}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />
          </div>
        </Scrollbars>
      </div>
    )
  }
} 

BoardLists.propTypes = {
    lists: PropTypes.array.isRequired,
    handleListsUpdate: PropTypes.func.isRequired
}

export default BoardLists;