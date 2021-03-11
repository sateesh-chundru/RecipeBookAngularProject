import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { AuthGaurd } from "../auth/auth.guard";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RouterModule } from "@angular/router";

const recipeRoutes =  [{
    path: '', 
    component: RecipesComponent,
    canActivate:[AuthGaurd],
     resolve: [RecipesResolverService], children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent},
      {
        path: ':id',
        component: RecipeDetailsComponent,
        resolve: [RecipesResolverService]
      },
      { path: ':id/edit', component: RecipeEditComponent }

    ]
  }]

@NgModule({
    imports:[RouterModule.forChild(recipeRoutes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule{

}