import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeSevice } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
   
  recipes: Recipe[];
  constructor(private recipeService:RecipeSevice) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }


  

}
