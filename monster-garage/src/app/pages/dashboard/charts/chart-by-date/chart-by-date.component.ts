import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CurrentDateService } from '../../../../core/current-date.service';

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

  chart = [];

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
                console.log('Pierszy dzien: ' + this.firstDay);
            } else if (element.status === new CurrentDateService().getFormattedRecentDate(1)) {
                this.secondDay++;
                console.log('Drugi dzien: ' + this.secondDay);
            } else if (element.status === new CurrentDateService().getFormattedRecentDate(12)) {
                this.thirdDay++;
                console.log('trzeci dzien: ' + this.thirdDay);
            }
        });
        // this.makeAChar(this.toDo, this.inProgress, this.done);
    });
}

  ngOnInit() {
  }

}
