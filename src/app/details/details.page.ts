import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZapatilladbService } from '../core/zapatilladbservice.service';
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
    private zapatilladbService: ZapatilladbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.zapatilladbService.getItem(this.id).then(
      (data: IZapatilla) => this.zapatilla = data
    );
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
            this.zapatilladbService.remove(id);
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