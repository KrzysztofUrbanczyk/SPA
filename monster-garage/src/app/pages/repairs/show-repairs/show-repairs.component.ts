import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Client, ShowRepairsService } from './show-repairs.service';
import { Router } from '@angular/router';
import { StatusConst } from '../../../constants/statusConst';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrController } from 'ng2-toastr-notifications';


@Component({
  selector: 'app-show-repairs',
  templateUrl: './show-repairs.component.html',
  styles: [`nb-card {
      transform: translate3d(0, 0, 0);
  }`],
})
export class ShowRepairsComponent {

  private statusList = [
    {
      value: StatusConst.IN_PROGRESS,
      title: StatusConst.IN_PROGRESS
    },
    {
      value: StatusConst.FOR_REALIZATION,
      title: StatusConst.FOR_REALIZATION
    },
    {
      value: StatusConst.REALIZED,
      title: StatusConst.REALIZED
    },
  ];

  settings = {
    actions: {
      add: false,
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
      },
      customerEmail: {
        title: 'E-mail',
      },
      car: {
        title: 'Samochód',
      },
      plates: {
        title: 'Tablice',
      },
      comment: {
        title: 'Komentarz',
      },
      status: {
        title: 'Status',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: this.statusList,
          }
        }
      },
      createdAt: {
        title: 'Data',
      },
      deadline: {
        title: 'Termin',
      },
      price: {
        title: 'Cena',
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();
  clients: Client[] = [];

  constructor(private service: ShowRepairsService,
    private router: Router,
    private http: HttpClient,
    private toastCtrl: ToastrController) {
    this.service.getData().subscribe(clients => {
      this.clients = clients as Client[];
      this.source.load(this.clients);
    });
  }

  onEditConfirm(event) {
    this.service.editClient(event.newData)
      .then(() => {
        if (event.data.status !== StatusConst.REALIZED && event.newData.status === StatusConst.REALIZED) {
          const url = `https://us-central1-monstergarage-4cdc9.cloudfunctions.net/httpEmail`;

          let Params = new HttpParams();
          Params = Params.append('to', event.data.customerEmail);
          Params = Params.append('price', event.data.price);

          return this.http.post(url, Params)
            .toPromise()
            .then(res => {
              this.toastCtrl.show({
                type: 'success',
                title: 'Sukces',
                message: 'Użytkownik został powiadomiony o zrealizowaniu naprawy!'
              });
            })
            .catch(err => {
              console.log(err);
            });

        }
      });
  }

  onDeleteConfirm(event) {
    this.service.deleteClient(event.data);
  }
}
