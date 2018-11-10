import React, { Component } from 'react';
import Aux from "../../../hoc/Aux/Aux";
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // this component should be functional, because there is no need to change if Modal is unchanged
    render(){
        const ingredients = Object.keys(this.props.ingredients).map(IgKey => {
            return (
                <li key={IgKey}>
                    <span style={{textTransform: 'capitalize'}}>{IgKey}</span> : {this.props.ingredients[IgKey]}
                </li>
            );
        });

        return (
            <Aux>
            <h3>Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;