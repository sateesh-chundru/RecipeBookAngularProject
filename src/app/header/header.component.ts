import { Component, EventEmitter, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    templateUrl:"./header.component.html",
    selector:"app-header",
    styleUrls:['./header.component.css']
})
export class HeaderComponent{

    constructor(private dataStorageService:DataStorageService){}

    onSaveData(){
       this.dataStorageService.storeRecipes();
    }

    onFetchData(){
       this .dataStorageService.fetchRecipes().subscribe();
    }

}