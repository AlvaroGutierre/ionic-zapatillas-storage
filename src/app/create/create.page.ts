import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ZapatillascrudService } from '../core/zapatillacrud.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IZapatilla } from '../shared/interfaces';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  zapatilla: IZapatilla;
  zapatillaForm: FormGroup;
  constructor(
    private router: Router,
    private zapatillascrudService: ZapatillascrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.zapatillaForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar Zapatilla',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveZapatilla();
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
  saveZapatilla() {
    this.zapatilla = this.zapatillaForm.value;
    let nextKey = this.zapatilla.name.trim();
    this.zapatilla.id = nextKey;
    this.zapatillascrudService.create_Zapatilla(this.zapatilla);
    console.warn(this.zapatillaForm.value);
  }
}
