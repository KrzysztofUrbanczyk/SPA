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
  selector: 'app-chart-by-date',
  templateUrl: './chart-by-date.component.html',
  styleUrls: ['./chart-by-date.component.css']
})
export class ChartByDateComponent implements OnInit {

  chart2 = [];

  firstDay: number;
  secondDay: number;
  thirdDay: number;
  fourthDay: number;
  fifthDay: number;

  repairsCollection: AngularFirestoreCollection<Repairs>;
  repairs: Observable<Repairs[]>;

  repairsTable: Repairs[] = [];


  constructor(private db: AngularFirestore) {
    this.firstDay = 0;
    this.secondDay = 0;
    this.thirdDay = 0;
    this.fourthDay = 0;
    this.fifthDay = 0;

    this.repairsCollection = this.db.collection('repairs', ref => {
      return ref.orderBy('createdAt', 'desc').limit(40);
    });
    this.repairs = this.repairsCollection.valueChanges();
    this.createCharByDate();
  }

  createCharByDate() {
    this.repairs.subscribe(repairs => {
      this.repairsTable = repairs as Repairs[];
      this.repairsTable.forEach(element => {
        if (element.createdAt === new CurrentDateService().getFormattedRecentDate(0)) {
          this.firstDay++;
        } else if (element.createdAt === new CurrentDateService().getFormattedRecentDate(1)) {
          this.secondDay++;
        } else if (element.createdAt === new CurrentDateService().getFormattedRecentDate(2)) {
          this.thirdDay++;
        } else if (element.createdAt === new CurrentDateService().getFormattedRecentDate(3)) {
          this.fourthDay++;
        } else if (element.createdAt === new CurrentDateService().getFormattedRecentDate(4)) {
          this.fifthDay++;
        }
      });
      this.makeAChar(this.firstDay, this.secondDay, this.thirdDay, this.fourthDay, this.fifthDay);
    });
  }

  makeAChar(firstDay: number, secondDay: number, thirdDay: number, fourthDay: number, fifthDay: number) {
    this.chart2 = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['Dziś', 'Wczoraj', '2 dni', '3 dni', '4 dni'],
        datasets: [{
          label: 'Liczba zleceń w ostanich 5 dniach',
          data: [firstDay, secondDay, thirdDay, fourthDay, fifthDay],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderWidth: 1
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
