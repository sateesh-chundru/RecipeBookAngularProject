import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth-componet/auth-componet.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[AuthComponent],
    imports:[FormsModule,CommonModule, RouterModule.forChild([ { path: '', component: AuthComponent }]),SharedModule]
})
export class AuthModule{}