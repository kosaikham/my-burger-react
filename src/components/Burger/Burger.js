import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(IgKey => {
      return [...Array(props.ingredients[IgKey])].map((_, i) => {
        return <BurgerIngredient key={IgKey + i} type={IgKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients.</p>
    }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
