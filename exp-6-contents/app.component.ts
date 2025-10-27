import { Component } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
 
@Component({ 
selector: 'app-root', 
templateUrl: './app.component.html', 
imports: [CommonModule, RouterOutlet],
styleUrls: ['./app.component.css'] 
}) 
export class AppComponent { 
public show:boolean = false; 
public buttonName:any = 'Show'; 
 
 
 
toggle() { 
this.show = !this.show; 
// Change the name of the button. 
if(this.show) 
this.buttonName = "Hide"; 
else 
this.buttonName = "Show"; 
} 
} 