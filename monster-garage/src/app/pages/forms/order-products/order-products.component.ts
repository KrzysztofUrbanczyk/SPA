import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent implements OnInit {

  public db: AngularFirestore;
  private owner: string;
  private newCategory: string;
  private newCompany: string;
  private newCompanyEmail: string;

  public categories: Observable<{}>;
  private companies: Observable<{}>;

  private categoriesCollection: AngularFirestoreCollection<any>;
  private companiesCollection: AngularFirestoreCollection<any>;
  private orderCollection: AngularFirestoreCollection<any>;

  private selectedCategory: string;
  private selectedCompany: string;
  private productName: string;
  private quantity: string;

  constructor(db: AngularFirestore) {
    this.owner = 'root';
    this.categoriesCollection = db.collection('Categories');
    this.companiesCollection = db.collection('Companies');
    this.orderCollection = db.collection('Orders');

    this.categories = this.categoriesCollection.doc(this.owner).collection('Category').valueChanges();
    this.companies = this.companiesCollection.doc(this.owner).collection('Company').valueChanges();
   }

  ngOnInit() {
  }

  addNewCategory() {
    this.categoriesCollection.doc(this.owner).collection('Category').doc(this.newCategory).set({
      name: this.newCategory
    });
  }

  addNewCompany() {
    this.companiesCollection.doc(this.owner).collection('Company').doc(this.newCompany).set({
       name: this.newCompany,
       eMail: this.newCompanyEmail
    });
  }

  sendOrder() {
    this.orderCollection.doc(this.owner).collection('Order').add({
      category: this.selectedCategory,
      product: this.productName,
      quantity: this.quantity,
      company: this.selectedCompany
    });
  }

}
