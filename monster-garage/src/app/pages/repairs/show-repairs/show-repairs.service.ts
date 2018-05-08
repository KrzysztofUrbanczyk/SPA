import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface Client {
  uid: string;
  customerName: string;
  customerEmail: string;
  car: string;
  plates: string;
  comment: string;
  status: string;
  createdAt: string;
  deadline: string;
  price: string;
}

@Injectable()
export class ShowRepairsService {

  repairsCollection: AngularFirestoreCollection<Client>;
  repairs: Observable<Client[]>;

  constructor(private afs: AngularFirestore) { }

  getData() {
    this.repairsCollection = this.afs.collection('repairs');
    return this.repairsCollection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({ uid: action.payload.doc.id, ...action.payload.doc.data() }));
      });
  }

  addClient(data: any) {
    this.repairsCollection.add(data as Client);
  }

  editClient(client: any) {
    return this.afs.doc<Client>(`repairs/${client.uid}`).set(client);
  }

  deleteClient(client: any) {
    return this.afs.doc<Client>(`repairs/${client.uid}`).delete();
  }
}
