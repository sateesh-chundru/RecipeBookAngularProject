import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showRecipesB: boolean = true;
  showShoppingListB: boolean = false;


  showRecipes() {
    this.showRecipesB = true;
    this.showShoppingListB = false;
  }

  showShoppingList() {
    this.showRecipesB = false;
    this.showShoppingListB = true;
  }
}
