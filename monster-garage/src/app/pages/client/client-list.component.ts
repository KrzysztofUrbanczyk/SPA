import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Client, ClientListService } from './client-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styles: [`nb-card {
  transform: translate3d(2, 2, 2);
  }`],
})
export class ClientListComponent {

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
      customerName: {
        title: 'Imię',
        type: 'string',
      },
      customerEmail: {
        title: 'E-mail',
        type: 'string',
      },
      car: {
        title: 'Samochód',
        type: 'string',
      },
      plates: {
        title: 'Tablice',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  clients: Client[] = [];

  constructor(private service: ClientListService,
    private router: Router) {
    this.service.getData().subscribe(clients => {
      this.clients = clients as Client[];
      this.source.load(this.clients);
    });
  }

  onCreateConfirm(event) {
    this.service.addClient(event.newData);
  }

  onEditConfirm(event) {
    this.service.editClient(event.newData);
  }

  onDeleteConfirm(event) {
    this.service.deleteClient(event.data);
  }
}
