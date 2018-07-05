import React from 'react'
import PropTypes from 'prop-types'
import DashboardItem from './DashboardItem'
import NewBoardItem from './NewDashboardItem'
 
const BoardsList = ({boards, handleClick}) => {
  return (
    <div className="boards-list">
      {boards.map(board => {
        return <DashboardItem key={board.id} {...board}/> 
      })}
      <NewBoardItem handleClick={handleClick} />
    </div>
  )
}

BoardsList.propTypes = {
  boards: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default BoardsList;