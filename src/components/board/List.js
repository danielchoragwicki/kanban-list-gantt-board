import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import NewCard from './NewCard'
import ListDeleteButton from '../buttons/ListDeleteButton'
import { generateId, addItem, updateList, removeItem } from '../../utils/helpers'

class List extends Component {
  state = {
    list: {
      name: '',
      items: []
    },
    newCard: {
      name: '',
      desc: '',
      startDate: '',
      endDate: ''
    }
  }
  componentDidMount() {
    this.setState({
      list: {
        name: this.props.name,
        items: this.props.items
      }
    })
  }  
  handleChange = e => {
    const val = e.target.value;
    this.setState(prevState => ({
        list: {
            ...prevState.list,
            name: val
        }
    }))
  }
  handleCardChange = e => {
    const val = e.target.value;
    this.setState(prevState => ({
        newCard: {
            ...prevState.newCard,
            name: val
        }
    }))
  }
  handleCardRemove = id => {
    const updatedCards = removeItem(this.props.items, id)
    const updatedList = {
        ...this.state.list,
        id: this.props.id,
        items: updatedCards
    }
    this.setState(prevState => ({
      list: {
          ...prevState.list,
          items: updatedCards
      }
  }))
    this.props.handleListChange(updatedList);
  }
  handleCardEdit = card => {
    const updatedCards = updateList(this.props.items, card);
    const updatedList = {
      ...this.state.list,
      id: this.props.id,
      items: updatedCards
    }
    this.setState(prevState => ({
        list: {
            ...prevState.list,
            items: updatedCards
        }
    }))
    this.props.handleListChange(updatedList);
  }
  handleSubmit = e => {
    e.preventDefault()
    const updatedList = {
      ...this.state.list,
      id: this.props.id,
      name: this.state.list.name
    }
    this.props.handleListChange(updatedList);
  }
  handleCardSubmit = e => {
    e.preventDefault()
    const newCard = {
      ...this.state.newCard,
      id: generateId(),
      name: this.state.newCard.name,
    }
    const updatedItems = addItem(this.state.list.items, newCard)
    const updatedList = {
      ...this.state.list,
      id: this.props.id,
      items: updatedItems
    }
    this.setState(prevState => ({
      list: {
        ...prevState.list,
        items: updatedItems
      },
      newCard: {
          ...prevState.newCard,
          name: ''
      }
    }))
    this.props.handleListChange(updatedList);
  }
  render() {
    return (
      <div className="list">
        <form onSubmit={this.handleSubmit}>
          <div className="list__header">
              <input onChange={this.handleChange} onBlur={this.handleSubmit} className="list__title" value={this.state.list.name}/>
              <ListDeleteButton theme="list" handleRemove={() => this.props.handleRemove(this.props.id)} />
          </div>
        </form>
        {this.props.items.map(card => { 
          return <Card key={card.id} {...card} handleCardRemove={this.handleCardRemove} handleCardEdit={this.handleCardEdit}/>
        })}
        <NewCard 
          newCard={this.state.newCard} 
          handleChange={this.handleCardChange}
          handleSubmit={this.handleCardSubmit}/>
      </div>
    )
  }
}
List.propTypes = {
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    handleRemove: PropTypes.func.isRequired,
    handleListChange: PropTypes.func.isRequired
}

export default List;