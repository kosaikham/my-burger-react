import * as actionTypes from "../action/actionTypes";
import {updatedObject} from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  bacon: 0.7,
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3
};

const addIngredient = (state, action) => {
  const updatedIng_ADD = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
      const updatedIngs_ADD = updatedObject(state.ingredients, updatedIng_ADD);
      const updatedSt_ADD = {
        ingredients: updatedIngs_ADD,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
      return updatedObject(state, updatedSt_ADD);
}

const removeIngredient = (state, action) => {
  const updatedIng_REMOVE = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
      const updatedIngs_REMOVE = updatedObject(state.ingredients, updatedIng_REMOVE);
      const updatedSt_REMOVE = {
        ingredients: updatedIngs_REMOVE,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      }
      return updatedObject(state, updatedSt_REMOVE);
}

const setIngredients = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat
    },
    totalPrice: 4,
    building: false
  })
}

const fetchIngredientsFailed = (state, action) => {
  return updatedObject(state,{error: true});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
};

export default reducer;
