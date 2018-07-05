import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ClickOutside extends Component {
    state = {
        isOpen: false
    }
    domRef = React.createRef();
    componentDidMount() {
        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, false);
    }
    handleClick = e => {
        if (this.domRef.contains(e.target) {
            return
        }
        this.handleClickOutside();
    }
    handleClickOutside = e => {
        
    }
    render() {
        const {childern} = this.props
        return (
            <div ref={this.domRef}>{childern}</div>
        )
    }
}

export default ClickOutside;

