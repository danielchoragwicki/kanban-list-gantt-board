import React from 'react'
import PropTypes from 'prop-types'
import ThemeRadio from  '../common/ThemeRadio'
import { config } from '../../utils/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class AddBoardInput extends React.Component {
    state = {
        currentBoard: {
            name: '',
            theme: ''
        },
        // errMessage: '',
        isDisabled: false
    }
    componentDidMount(){
        document.addEventListener("keydown", this.props.handleClick);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.props.handleClick);
    }
    // handleError = () => {
    //     if(this.props.currentBoard.name.length > config.MAX_BOARD_TITLE_LENGTH || this.props.currentBoard.name.length < config.MIN_BOARD_TITLE_LENGTH) {
    //         this.setState({
    //           errMessage: `The length of the title should be between ${config.MIN_BOARD_TITLE_LENGTH} and ${config.MAX_BOARD_TITLE_LENGTH}`,
    //         })} else {
    //         this.setState({
    //           errMessage: '',
    //         })
    //     }
    // }
    handleChange = e => {
        this.props.handleInputChange(e)
        // this.handleError()
    }
    render () {
        const {handleClick, handleSubmit, handleRadioChange, currentBoard, handleDelete} = this.props;
        return (
            <div className="addboard__overlay">
                <form onSubmit={handleSubmit}>
                    <button type="button" className="addboard__button" onClick={handleClick}><FontAwesomeIcon icon={faTimes}/></button>  
                    <div className="addboard__inner">
                        <div className="addboard__input-wrapper">
                            <input type="text" 
                            autoFocus
                            className={"addboard__input"} 
                            value={currentBoard.name} 
                            onChange={this.handleChange}/>
                            {/* <p className="addboard__message">{this.state.errMessage}</p> */}
                        </div>
                        <div className="addboard__themes">
                            {config.THEMES.map(theme =>
                                <ThemeRadio key={theme} theme={theme} handleRadioChange={handleRadioChange} currentTheme={currentBoard.theme} />
                            )}
                        </div>
                        <button 
                            className={`addboard__submit ${this.state.isDisabled ?'addboard__submit--err' : ''}`} 
                            type="submit" 
                            disabled={this.state.isDisabled && false}>Add board</button>
                        {handleDelete && <button 
                            className="addboard__submit addboard__submit--del" 
                            type="submit" 
                            disabled={this.state.isDisabled && true}>Remove board</button>}
                    </div>
                </form>
            </div> 
        )
    }
}

AddBoardInput.propTypes = {
    errSubmit: PropTypes.bool,
    currentBoard: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    handleDelete: PropTypes.func
}

export default AddBoardInput;