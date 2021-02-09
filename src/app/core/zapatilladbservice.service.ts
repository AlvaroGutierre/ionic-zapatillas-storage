import { Injectable } from '@angular/core';
import { IZapatilla } from '../shared/interfaces';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ZapatilladbService {
  auxZapatilla: IZapatilla;
  auxZapatillaList: IZapatilla[] = [];
  constructor(private storage: Storage) { }
  // Stores a value
  setItem(reference: string, value: IZapatilla) {
    this.storage.set(reference, {
      id: value.id, name: value.name, category:
        value.category, price: value.price, image: value.image, description:
        value.description
    })
      .then(
        (data) => console.log('Stored first item!', data),
        error => console.error('Error storing item', error)
      );
  }
  // Gets a stored item
  getItem(reference): Promise<IZapatilla> {
    return this.storage.get(reference);
  }
  // check if it is empty
  empty() {
    return this.storage.keys()
      .then(
        (data) => { return true },
        error => { return false }
      );
  }
  // Retrieving all keys
  keys(): Promise<string[]> {
    return this.storage.keys();
  }
  // Retrieving all values
  getAll(): Promise<IZapatilla[]> {
    return this.storage.keys().then((k) => {
      k.forEach(element => {
        this.getItem(element).then(
          (data: IZapatilla) => this.auxZapatillaList.push(data)
        );
      });
      return this.auxZapatillaList;
    });
  }
  // Removes a single stored item
  remove(reference: string) {
    this.storage.remove(reference)
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
  // Removes all stored values.
  clear() {
    this.storage.clear()
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }
}
