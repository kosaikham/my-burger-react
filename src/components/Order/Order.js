import React from "react";
import classes from "./Order.css";

const order = props => {
    const ingredients = [];
    for(let key in props.ingredients){
        ingredients.push({
            amount: props.ingredients[key],
            name: key
        })
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                border: '1px solid #ccc',
                padding: '8px',
                margin: '0 8px'
            }}
            key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
    })

  return (
    <div className={classes.Order}>
      <p>Ingredient: {ingredientOutput}</p>
      <strong>Price: USD {props.price}</strong>
    </div>
  );
};

export default order;
