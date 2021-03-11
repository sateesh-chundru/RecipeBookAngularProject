import { Component, Input } from "@angular/core";

@Component({
    templateUrl: './alert.component.html',
    selector: 'app-alert',
    styleUrls:['./alert.component.css']
})
export class AlertComponent {
 @Input() message:string;
}