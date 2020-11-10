import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingListService.startedEditing.subscribe((index:number)=>{
      this.index=index;
      this.editMode=true;
      this.editShoppingData();

    })
  }

  onSubmitItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(ingredient,+this.index);
    }else{
    this.shoppingListService.addIngredient(ingredient);
    }
    this.clearFormData();

  }

  onDeleteItem(){
    this.shoppingListService.deleteIngredient(+this.index);
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
    this.editedItem = this.shoppingListService.getIndgredient(this.index);
    this.form.setValue({
      name:this.editedItem.name,
      amount:this.editedItem.amount
    })
  }
}
