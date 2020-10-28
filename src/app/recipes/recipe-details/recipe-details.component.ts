import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeSevice } from '../recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
@Input() recipe:Recipe;
  constructor(private recipeService: RecipeSevice) { }

  ngOnInit(): void {
  }

  onAddToShopppingList(){
    this.recipeService.addIngredientsToshoppingList(this.recipe.ingredients);
  }

}
