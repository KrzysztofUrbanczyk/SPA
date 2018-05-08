import { Component} from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {Order, OrderListService} from '../order-list.service';
@Component({
  selector: 'app-ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`],
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    columns: {
      category: {
        title: 'Kategoria',
        type: 'string',
      },
      company: {
        title: 'Firma',
        type: 'string',
      },
      product: {
        title: 'Produkt',
        type: 'string',
      },
      quantity: {
        title: 'Ilość',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  orders: Order[] = [];

  constructor(private service: OrderListService) {
    this.service.getData().subscribe(orders => {
      this.orders = orders as Order[];
      this.source.load(this.orders);
    });
  }

  onCreateConfirm(event) {
    this.service.addOrder(event.newData);
  }

  onEditConfirm(event) {
    this.service.editOrder(event.newData);
  }

  onDeleteConfirm(event) {
    this.service.deleteOrder(event.data);
  }
}
