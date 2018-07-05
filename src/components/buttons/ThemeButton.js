import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ThemeRadio from  '../common/ThemeRadio'
import { config } from '../../utils/config'

class ThemeButton extends Component {
    state = {
        isOpen: false
    }
    thisRef = React.createRef();
    componentDidMount() {
        document.addEventListener('click', this.handleClick);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }
    handleClick = e => {
        if(this.thisRef.current.contains(e.target)) {
            this.setState(prevState => ({
                isOpen: true
            }))
            return 
        }
        this.setState({isOpen: false})
    }
    render() {
        return (
            <div className="button__wrapper" ref={this.thisRef}>
                <button type="button" className="button">Change Theme</button>
                {this.state.isOpen && <div className="button__inner button__inner--themes">
                    {config.THEMES.map(theme =>
                        <ThemeRadio key={theme} theme={theme} handleRadioChange={this.props.handleRadioChange} currentTheme={this.props.currentTheme} />
                    )}
                </div>}
            </div>
        )
    }
}

ThemeButton.propTypes = {
    handleRadioChange: PropTypes.func.isRequired,
    currentTheme: PropTypes.string.isRequired
}


export default ThemeButton;