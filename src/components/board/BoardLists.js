import React, {Component} from 'react'
import PropTypes from 'prop-types'
import List from  './List'
import NewList from './NewList'
import { generateId, addItem, updateList, removeItem, findById, reorder, move } from '../../utils/helpers'
import { Scrollbars } from 'react-custom-scrollbars';
import { DragDropContext } from 'react-beautiful-dnd';

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
  onDragEnd = result => {
    const { source, destination } = result;
    
    if (!destination) {
        return;
    }

    if (source.droppableId === destination.droppableId) {
        const list = findById(source.droppableId, this.props.lists)
        const items = reorder(
            list.items,
            source.index,
            destination.index
        );
        const newList = {
          ...list,
          items: items
        }
        this.handleListChange(newList)
    } else {
        const sourceList = findById(source.droppableId, this.props.lists)
        const destList = findById(destination.droppableId, this.props.lists)
        const result = move(
            sourceList.items,
            destList.items,
            source,
            destination
        );
        const newSourceList = {
          ...sourceList,
          items: result[source.droppableId]
        }
        const newDestList = {
          ...destList,
          items: result[destination.droppableId]
        }
        this.handleListChange(newSourceList)
        this.handleListChange(newDestList)
      }
  }
  render() {
    return (
      <div className="board-lists__wrapper">
        <Scrollbars>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="board-lists">
                {this.props.lists.map(list => (

                  <List handleListChange={this.handleListChange} handleRemove={this.handleRemove} key={list.id} {...list}/>
                
                ))}
                <NewList
                  newListName={this.state.newListName}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit} />
            </div>
          </DragDropContext>
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