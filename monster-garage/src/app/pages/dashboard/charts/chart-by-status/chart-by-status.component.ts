import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Repairs {
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

@Component({
  selector: 'app-chart-by-status',
  templateUrl: './chart-by-status.component.html',
  styleUrls: ['./chart-by-status.component.css']
})

export class ChartByStatusComponent implements OnInit {

  chart1 = [];
  inProgress: number;
  done: number;
  toDo: number;
  repairsCollection: AngularFirestoreCollection<Repairs>;
  repairs: Observable<Repairs[]>;
  repairsTable: Repairs[] = [];

  constructor(private db: AngularFirestore) {
    this.done = 0;
    this.toDo = 0;
    this.inProgress = 0;
    this.repairsCollection = this.db.collection('repairs', ref => {
        return ref.orderBy('createdAt', 'desc').limit(20);
      });
    this.repairs = this.repairsCollection.valueChanges();

    this.createCharByStatsus();
}

createCharByStatsus() {
    this.repairs.subscribe(repairs => {
        this.repairsTable = repairs as Repairs[];
        this.repairsTable.forEach(element => {
            if (element.status === 'Do realizacji') {
                this.toDo++;
            } else if (element.status === 'W trakcie') {
                this.inProgress++;
            } else if (element.status === 'Zrealizowane') {
                this.done++;
            }
        });
        this.makeAChar(this.toDo, this.inProgress, this.done);
    });
}

makeAChar (toDo: number, inProgress: number, done: number) {
    this.chart1 = new Chart('canvas1', {
        type: 'pie',
        data: {
            labels: ['W trakcie', 'Do realizacji', 'Zrealizowane'],
            datasets: [{
                label: 'Status 20 ostatnich zamówień',
                data: [inProgress, toDo, done],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
              display: true,
              text: 'Status 20 ostatnich zamówień'
            }
          }
    });
}

  ngOnInit() {
  }

}
