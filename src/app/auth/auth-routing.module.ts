import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth-componet/auth-componet.component";
import { RouterModule } from "@angular/router";

const authRoutes =[ { path: 'auth', component: AuthComponent }];
@NgModule({
    imports:[RouterModule.forChild(authRoutes)],
    exports:[RouterModule]
})
export class AuthRoutingModule{

}