import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ZapatillascrudService {
  constructor(
    private firestore: AngularFirestore
  ) { }
  create_Zapatilla(record) {
    return this.firestore.collection('Zapatillas').add(record);
  }
  read_Zapatilla() {
    return this.firestore.collection('Zapatillas').snapshotChanges();
  }
  update_Zapatilla(recordID, record) {
    this.firestore.doc('Zapatillas/' + recordID).update(record);
  }
  delete_Zapatilla(record_id) {
    this.firestore.doc('Zapatillas/' + record_id).delete();
  }
}