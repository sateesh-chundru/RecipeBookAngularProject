import { Injectable } from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
   
    constructor(private dataStorageService:DataStorageService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<Recipe[]> {
      
        return this.dataStorageService.fetchRecipes();
    }

}