import { NgModule } from "@angular/core";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { RecipeSevice } from "./recipes/recipe.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
    providers:[ShoppingListService,  RecipeSevice, 
        {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService, multi:true}]
})
export class CoreModule{

}