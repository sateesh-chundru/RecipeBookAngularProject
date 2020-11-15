import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeSevice {
     recipesChanged = new Subject<Recipe[] >();

    constructor(private slService: ShoppingListService){}
    recipes: Recipe[] = [
        new Recipe('A Test recipe', 'Test Recipe for testing',
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
            [new Ingredient('Meat', 1),
            new Ingredient('Freach fries', 1)]),
        new Recipe('A Test recipe', 'Test Recipe for testing',
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
            [new Ingredient('Buns', 1),
            new Ingredient('Meat', 1)])
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToshoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
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


} 