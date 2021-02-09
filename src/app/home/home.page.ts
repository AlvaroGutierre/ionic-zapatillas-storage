import { Component, OnInit } from '@angular/core';
import { IZapatilla } from '../shared/interfaces';
import { ZapatilladbService } from '../core/zapatilladbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public zapatillas: IZapatilla[];
  zapatillasinit: IZapatilla[] = [
    {
      id: '1',
      name: 'Air Jordan 4 Starfish',
      description: "Con un diseño inspirado en las expediciones espaciales, este modelo llega con toda la fuerza y la belleza de los materiales técnicos que se usan en los trajes de astronauta.",
      category: 'Vestir',
      image:
        'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/bbb86c37-c657-4367-a5d1-84e5b24e04d3/fecha-de-lanzamiento-de-las-air-jordan-4-starfish.jpg',
        price: '199.99'
      },
    {
      id: '2',
      name: 'Air Max 1 LV8 Dark Teal Green',
      description: "Las Nike Air Max 1 LV8 rediseñan las legendarias originales que siguen en lo más alto de su reinado desde 1987.",
      category: 'Andar',
      image:
        'https://static.nike.com/a/images/t_prod_ss/w_640,c_limit,f_auto/a238e26b-b109-4964-83f4-504063d5e9d3/fecha-de-lanzamiento-de-las-air-max-1-lv8-dark-teal-green.jpg',
        price: '149.99'
    }
  ]
  constructor(private zapatilladbService: ZapatilladbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.zapatillas !== undefined) {
      this.zapatillas.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.zapatilladbService.empty()) {
      this.zapatillasinit.forEach(zapatilla => {
        this.zapatilladbService.setItem(zapatilla.id, zapatilla);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.zapatilladbService.getAll().then(
      (data) => this.zapatillas = data
    );
  }
  zapatillaTapped(zapatilla) {
    this.route.navigate(['details', zapatilla.id]);
  }
}