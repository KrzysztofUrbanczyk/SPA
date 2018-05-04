import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

export interface Client {
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
export class ClientListService {

  repairsCollection: AngularFirestoreCollection<Client>;
  repairs: Observable<Client[]>;

  constructor(private afs: AngularFirestore) {}

  getData() {
    this.repairsCollection = this.afs.collection('repairs');
    return this.repairsCollection.valueChanges();
  }

  addClient(data: any) {
    this.repairsCollection.add(data as Client);
  }
}
