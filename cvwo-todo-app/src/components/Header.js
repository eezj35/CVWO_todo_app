import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({title}) => {
    return (
        <header>
            <h1>{title}</h1>
            <Button color='green' text='Hello'/>
        </header>    
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string
}

export default Header
