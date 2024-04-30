import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css']
})
export class BreadcrumsComponent implements OnDestroy{

  public titulo?: string;
  public tituloSub$?: Subscription;

  constructor(){}

  ngOnDestroy(): void {
    
  }

}
