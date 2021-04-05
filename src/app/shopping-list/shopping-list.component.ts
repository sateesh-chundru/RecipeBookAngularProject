import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from './shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Observable<{ingredient:Ingredient[]}>;
  private subscriptions: Subscription[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList:{ingredient:Ingredient[]}}>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    //this.ingredients = this.shoppingListService.getIngredients();
    // const sub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // });
    // this.subscriptions.push(sub);
  }



  onIngredientAdded(ingredient: Ingredient) {
    // this.ingredients.push(ingredient);
  }

  onEditItem(index:number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
  ngOnDestroy() {
    // this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
