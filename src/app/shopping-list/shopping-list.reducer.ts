import { Ingredient } from "../shared/ingredient.model";
import { Action} from '@ngrx/store'
import { ADD_INGREDIENT, ADD_INGREDIENTS, UPDATE_INGREDIENT, DELETE_INGREDIENT, ShoppingListActions, START_EDIT, STOP_EDIT } from './shopping-list.actions'
export interface State{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;

}
export interface AppState{
    shoppingList:State;
}
const initialState:State = {
    editedIngredient: null,
    editedIngredientIndex:-1,
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
    ],
    

};
export function ShoppingListReducer(state = initialState, action: ShoppingListActions) {

    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }

        case UPDATE_INGREDIENT:
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }

            const updatedIngredinets = [...state.ingredients];
            updatedIngredinets[action.payload.index] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredinets
            }

        case DELETE_INGREDIENT:
            const updatedIngredinetsForDelete = [...state.ingredients];
            updatedIngredinetsForDelete.splice(action.payload, 1);
            return {
                ...state,
                ingredients: updatedIngredinetsForDelete
            }

        case START_EDIT:
            return {
                ...state,
                editedInredientInex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            }
        case STOP_EDIT:
            return {
                ...state,
                editedInredientInex:-1,
                editedIngredient:null
            }

        default:
            return state;
    }
}