import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZapatillascrudService } from '../core/zapatillacrud.service';
import { IZapatilla } from '../shared/interfaces';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public zapatilla: IZapatilla;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private zapatillascrudService: ZapatillascrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.zapatillascrudService.read_Zapatilla().subscribe(data => {
      let zapatillas = data.map(e => {
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
      console.log(zapatillas);
      zapatillas.forEach(element => {
          if(element.id == this.id){
            this.zapatilla = element;
          }
      });
    });
  }

  editRecord(zapatilla) {
    this.router.navigate(['edit', zapatilla.id])
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar zapatilla',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.zapatillascrudService.delete_Zapatilla(id);
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}