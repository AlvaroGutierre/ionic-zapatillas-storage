import { Component, OnInit } from '@angular/core';
import { IZapatilla } from '../shared/interfaces';
import { ZapatillascrudService } from '../core/zapatillacrud.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public zapatillas: IZapatilla[];
  constructor(private zapatillascrudService: ZapatillascrudService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.zapatillascrudService.read_Zapatilla().subscribe(data => {
      this.zapatillas = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          category: e.payload.doc.data()['category'],
          image: e.payload.doc.data()['image'],
          price: e.payload.doc.data()['price']
        };
      })
  })}
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.zapatillas !== undefined) {
      this.zapatillas.splice(0);
    }
    this.retrieveValues();
  }
  retrieveValues() {
    // Retrieve values
    this.zapatillascrudService.read_Zapatilla().subscribe(data => {
      this.zapatillas = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          name: e.payload.doc.data()['name'],
          description: e.payload.doc.data()['description'],
          category: e.payload.doc.data()['category'],
          image: e.payload.doc.data()['image'],
          price: e.payload.doc.data()['price']
        };
      })
  })}
  
  zapatillaTapped(zapatilla) {
    this.route.navigate(['details', zapatilla.id]);
  }
}