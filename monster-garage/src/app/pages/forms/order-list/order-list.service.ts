import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

export interface Order {
  category: string;
  company: string;
  product: string;
  quantity: string;
}

@Injectable()
export class OrderListService {

  ordersCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;

  constructor(private afs: AngularFirestore) {}

  getData() {
    this.ordersCollection = this.afs.collection('/Orders/root/Order');
    return this.ordersCollection.valueChanges();
  }

  addOrder(data: any) {
    this.ordersCollection.add(data as Order);
  }
}
