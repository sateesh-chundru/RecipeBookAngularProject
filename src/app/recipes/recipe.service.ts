import { Recipe } from "./recipe.model";
import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeSevice {

    constructor(private slService: ShoppingListService){}

    recipeSelected = new EventEmitter<Recipe>();
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


} 