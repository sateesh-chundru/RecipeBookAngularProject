import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeSevice } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(private recipeService: RecipeSevice, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) =>{
      this.id= +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  onAddToShopppingList(){
    this.recipeService.addIngredientsToshoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo:this.route});

  }

}
