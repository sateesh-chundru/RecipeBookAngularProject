import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const shoppingListRoutes = [{ path: '', component: ShoppingListComponent }]

@NgModule({
    declarations: [ShoppingListComponent,
        ShoppingEditComponent],


    imports: [SharedModule, FormsModule, RouterModule.forChild(shoppingListRoutes)],
    exports: [ShoppingListComponent,
        ShoppingEditComponent]
})
export class ShoppingListModule {

}