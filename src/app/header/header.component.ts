import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    templateUrl:"./header.component.html",
    selector:"app-header",
    styleUrls:['./header.component.css']
})
export class HeaderComponent{
    @Output("showRecipes") showReciepeEmitter: EventEmitter<any> = new EventEmitter();
    @Output("showShoppingList") showShoppingListEmitter: EventEmitter<any> = new EventEmitter();

    showRecipes(){
        this.showReciepeEmitter.emit(true);
    }

    showShoppingList(){
        this.showShoppingListEmitter.emit(true);
    }

}