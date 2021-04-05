import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Store } from '@ngrx/store';
import * as ShioppingListActions from '../shopping-list.actions'
import { State, AppState } from '../shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  index:Number;
  editMode:boolean;
  editedItem:Ingredient;
  @ViewChild('f') form:NgForm;
  constructor(private shoppingListService: ShoppingListService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe(stateData =>{
      if(stateData.editedIngredientIndex >-1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
      }else{
        this.editMode = false;
      }
    })
    this.shoppingListService.startedEditing.subscribe((index:number)=>{
      debugger;
      this.index=index;
      this.editMode=true;
      this.editShoppingData();

    })
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShioppingListActions.UpdateIngredient({ index: +this.index, ingredient: ingredient }));
    } else {
      debugger;
      this.store.dispatch(new ShioppingListActions.AddIngredient(ingredient));
    }
    this.clearFormData();

  }

  onDeleteItem(){
    this.store.dispatch(new ShioppingListActions.DeleteIngredient(+this.index));
    this.clearFormData();
  }

  clearFormData(){
    this.form.setValue({
      name:'',
      amount:''
    })
    this.editMode=false;
    this.editedItem=undefined;
  }

  editShoppingData(){
   this.store.select('shoppingList').subscribe(ingredients =>{
    this.editedItem = ingredients.ingredients[+this.index]
      this.form.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    })
   
  }
}
