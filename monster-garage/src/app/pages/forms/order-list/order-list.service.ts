import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

export interface Order {
  uid: string;
  category: string;
  company: string;
  product: string;
  quantity: string;
}

@Injectable()
export class OrderListService {

  ordersCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;

  constructor(private afs: AngularFirestore) {
  }

  getData() {
    this.ordersCollection = this.afs.collection('Orders/');
    return this.ordersCollection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({uid: action.payload.doc.id, ...action.payload.doc.data()}));
      });
  }

  addOrder(data: any) {
    this.ordersCollection.add(data as Order);
  }

  editOrder(order: any) {
    return this.afs.doc<Order>(`Orders/${order.uid}`).set(order);
  }

  deleteOrder(order: any) {
    return this.afs.doc<Order>(`Orders/${order.uid}`).delete();
  }
}
