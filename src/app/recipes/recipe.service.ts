import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from '../shopping-list/shopping-list.actions'

@Injectable()
export class RecipeSevice {
     recipesChanged = new Subject<Recipe[] >();

    constructor(private slService: ShoppingListService,
        private store:Store<{shoppingList: {ingredients: Ingredient[]}}>){}
    // recipes: Recipe[] = [
    //     new Recipe('A Test recipe', 'Test Recipe for testing',
    //         'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    //         [new Ingredient('Meat', 1),
    //         new Ingredient('Freach fries', 1)]),
    //     new Recipe('A Test recipe', 'Test Recipe for testing',
    //         'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
    //         [new Ingredient('Buns', 1),
    //         new Ingredient('Meat', 1)])
    // ];


    recipes: Recipe[] =[];

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToshoppingList(ingredients:Ingredient[]){
        debugger;
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    // this.slService.addIngredients(ingredients);
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

   updateRecipe(recipe:Recipe, index:number){
        this.recipes[index]=recipe;
        this.recipesChanged.next(this.getRecipes());

    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1)
        this.recipesChanged.next(this.getRecipes());

    }

    setRecipes(recipes : Recipe[]){
        this.recipes=recipes;
        this.recipesChanged.next(this.getRecipes());

    }


} 