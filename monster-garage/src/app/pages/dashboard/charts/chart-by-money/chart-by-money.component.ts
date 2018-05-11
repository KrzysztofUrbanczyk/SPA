import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CurrentDateService } from '../../../../core/current-date.service';
import { Chart } from 'chart.js';

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
  selector: 'app-chart-by-money',
  templateUrl: './chart-by-money.component.html',
  styleUrls: ['./chart-by-money.component.css']
})
export class ChartByMoneyComponent implements OnInit {
  chart3 = [];
  pricesPerDay: number[];

  repairsCollection: AngularFirestoreCollection<Repairs>;
  repairs: Observable<Repairs[]>;
  repairsTable: Repairs[] = [];

  constructor(private db: AngularFirestore) {
    this.pricesPerDay = [0, 0, 0, 0, 0, 0, 0];

    this.repairsCollection = this.db.collection('repairs', ref => {
      return ref.orderBy('createdAt', 'desc').limit(100);
    });
    this.repairs = this.repairsCollection.valueChanges();

    this.createCharByPrice();
  }

  createCharByPrice() {
    this.repairs.subscribe(repairs => {
      this.repairsTable = repairs as Repairs[];
      this.repairsTable.forEach(element => {
        for (let i = 0; i < 7; i++) {
          if (element.createdAt === new CurrentDateService().getFormattedRecentDate(i)) {
            this.pricesPerDay[i] = this.pricesPerDay[i] + parseInt(element.price, 10);
          }
        }
      });
      this.makeAChar();
    });
  }

  makeAChar() {
    this.chart3 = new Chart('canvas3', {
      type: 'line',
      data: {
        labels: ['dziś', 'wczoraj', '2 dni', '3 dni', '4 dni', '5 dni', '6 dni'],
        datasets: [{
          label: 'Przychody w ostatnich 7 dniach',
          data: [this.pricesPerDay[0],
            this.pricesPerDay[1],
            this.pricesPerDay[2],
            this.pricesPerDay[3],
            this.pricesPerDay[4],
            this.pricesPerDay[5],
            this.pricesPerDay[6]
          ],
          borderColor: '#3e95cd',
          fill: false
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            }
          }]
        }
      }
    });
  }

  ngOnInit() {
  }

}
