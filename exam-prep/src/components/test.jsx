import PropTypes from 'prop-types';
const Items = (props) => {
    return <h1>Current Quantity of Items in Cart: {props.quantity}</h1>
};

Items.defaultProps = {
    quantity: 0
};
Items.propTypes = { quantity: PropTypes. }


function ShoppingCart() {
    return (
        <Items />
    )
}

export default ShoppingCart