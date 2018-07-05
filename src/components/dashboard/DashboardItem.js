import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"; 
import { truncate } from '../../utils/helpers'

const DashboardItem = ({id, name, lists, theme}) => {
    const cards = lists.reduce((sum, item) => {
        sum += item.items.length
        return sum
    }, 0)
    return (
        <div className="board-item">
            <Link to={`/board/${id}`} className={`board-item__link ${theme.toLowerCase().replace(" ", "-")}`}>
                <p className="board-item__title">{truncate(name, 20, '...')}</p>
                <div className="board-stats">
                    <p className="board-stats__item">
                        <span className="board-stats__text board-stats__text--number">{lists.length}</span>
                        <span className="board-stats__text">Lists</span> 
                    </p>
                    <p className="board-stats__item">
                        <span className="board-stats__text board-stats__text--number">{cards}</span>
                        <span className="board-stats__text">Cards</span> 
                    </p>
                </div>
            </Link>
        </div> 
    )
}

DashboardItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lists: PropTypes.array.isRequired,
    theme: PropTypes.string.isRequired
}

export default DashboardItem;