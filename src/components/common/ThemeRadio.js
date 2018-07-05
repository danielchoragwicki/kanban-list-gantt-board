import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const ThemeRadio = ({theme, handleRadioChange, currentTheme}) => {
    return (
        <label title={theme} className={`theme-radio ${theme.toLowerCase().replace(" ", "-")}`}>
            <input className="theme-radio__input" onChange={handleRadioChange} checked={currentTheme === theme} type="radio" name="theme" value={theme}/>
            <FontAwesomeIcon className="theme-radio__icon" icon={faCheck}/>
        </label>
    )
}

ThemeRadio.propTypes = {
    theme: PropTypes.string.isRequired,
    currentTheme: PropTypes.string.isRequired,
    handleRadioChange: PropTypes.func.isRequired
}
  

export default ThemeRadio;