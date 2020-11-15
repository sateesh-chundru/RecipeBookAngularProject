import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeSevice } from '../recipe.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit ,OnDestroy{
   
  recipes: Recipe[];

  subscriptions:Subscription[]=[];
  constructor(private recipeService:RecipeSevice, private router: Router, private route:ActivatedRoute) { }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    const subscription=this.recipeService.recipesChanged.subscribe(recipes=>{
      this.recipes = recipes;
    })

    this.subscriptions.push(subscription);
    
  }
  onNewRecipe(){
  this.router.navigate(['new'], {relativeTo:this.route})
  }

  

}
