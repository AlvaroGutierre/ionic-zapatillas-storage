import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ZapatillascrudService } from '../core/zapatillacrud.service';
import { IZapatilla } from '../shared/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  public zapatilla: IZapatilla;
  zapatillaForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private zapatillascrudService: ZapatillascrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.zapatillaForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(''),
    });
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
            this.zapatillaForm = new FormGroup({
              name: new FormControl(this.zapatilla.name),
              description: new FormControl(this.zapatilla.description),
              category: new FormControl(this.zapatilla.category),
              image: new FormControl(this.zapatilla.image),
              price: new FormControl(this.zapatilla.price),
            });
          }
      });
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Editar zapatilla',
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
    this.zapatilla.id = this.id;
    this.zapatillascrudService.update_Zapatilla(this.id, this.zapatilla);
    console.warn(this.zapatillaForm.value);
  }

}
