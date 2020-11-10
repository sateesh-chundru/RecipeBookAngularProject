import { Ingredient } from "../shared/ingredient.model";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing= new Subject<Number>();

    ingredients:Ingredient[] = [
        new Ingredient('Apple', 5),
        new Ingredient('Tomatoes', 10)
      
      
      ];


      getIngredients(){
         
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.getIngredients());
      }

      addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.getIngredients());
      }

      updateIngredient(ingredient: Ingredient, index:number){
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.getIngredients());
      }

      getIndgredient(index:Number){
        return this.ingredients[+index];
      }

      deleteIngredient(index:number){
        debugger;
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.getIngredients());
      }
}