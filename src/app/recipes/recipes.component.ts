import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeSevice } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers:[RecipeSevice]
})
export class RecipesComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe;
  recipeSubScription: Subscription;
  constructor(private recipeService: RecipeSevice) { }

  ngOnInit(){
    this.recipeSubScription = this.recipeService.recipeSelected.subscribe((recipe:Recipe)=>{
      this.selectedRecipe = recipe;
    });
  }


  ngOnDestroy(){
    this.recipeSubScription.unsubscribe();
  }
}
