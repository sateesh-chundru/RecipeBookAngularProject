import { Component,OnInit, OnDestroy } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl:"./header.component.html",
    selector:"app-header",
    styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    
    isAuthenticated =false;
    private subscription:Subscription;

    constructor(private dataStorageService:DataStorageService, private authService:AuthService){}
  
   
    ngOnInit(): void {
        this.subscription = this.authService.user.subscribe(userData =>{
           this.isAuthenticated = !!userData;
      });

    }

    onSaveData(){
       this.dataStorageService.storeRecipes();
    }

    onFetchData(){
       this .dataStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onLogout(){
        this.authService.logout();
    }
    

}