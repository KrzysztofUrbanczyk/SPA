

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.css']
})
export class OrderProductsComponent implements OnInit {

  private owner: string;
  private newCategory: string;
  private newCompany: string;
  private newCompanyEmail: string;

  private categories: Observable<{}>;
  private companies: Observable<{}>;
  private orders: Observable<{}>;

  private categoriesCollection: AngularFirestoreCollection<any>;
  private companiesCollection: AngularFirestoreCollection<any>;
  private orderCollection: AngularFirestoreCollection<any>;

  private selectedCategory: string;
  private selectedCompany: string;
  private productName: string;
  private quantity: string;

  myform: FormGroup;
  productNameControl: FormControl;
  quantityControl: FormControl;
  email: FormControl;
  password: FormControl;
  categoryControl: FormControl;
  categorySelectControl: FormControl;
  companySelectControl: FormControl;
  newCategoryNameControl: FormControl;
  newCompanyNameControl: FormControl;

  disabledControl: boolean;
  public elo: string;
  sendIsClicked: boolean;
  sendCategoryIsClicked: boolean;
  addCompanyIsClicked: boolean;
  wasSend: boolean;

  constructor(db: AngularFirestore) {
    this.sendIsClicked = false;
    this.sendCategoryIsClicked = false;
    this.addCompanyIsClicked = false;
    this.wasSend = true;

    this.elo = 'fds';
    this.owner = 'root';
    this.categoriesCollection = db.collection('Categories');
    this.companiesCollection = db.collection('Companies');
    this.orderCollection = db.collection('Orders');

    this.categories = this.categoriesCollection.doc(this.owner).collection('Category').valueChanges();
    this.companies = this.companiesCollection.doc(this.owner).collection('Company').valueChanges();
    this.orders = this.orderCollection.doc(this.owner).collection('Order').valueChanges();
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.categorySelectControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]);
    this.productNameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]);
    this.quantityControl = new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+')
    ]);
    this.companySelectControl = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]);
    this.newCategoryNameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.newCompanyNameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      categorySelectControl: this.categorySelectControl,
      productNameControl: this.productNameControl,
      quantityControl: this.quantityControl,
      companySelectControl: this.companySelectControl,
      newCategoryNameControl: this.newCategoryNameControl,
      email: this.email,
      newCompanyNameControl: this.newCompanyNameControl
  //    password: this.password,
//      language: this.categoryControl
    });
  }

  addNewCategory() {
    if (this.isNewCategoryCorrect()) {
      this.categoriesCollection.doc(this.owner).collection('Category').doc(this.newCategory).set({
        name: this.newCategory
      });
      this.newCategoryNameControl.setValue('    ');
    }
  }

  addNewCompany() {
    if (this.isNewCompanyCorrect()) {
      this.companiesCollection.doc(this.owner).collection('Company').doc(this.newCompany).set({
        name: this.newCompany,
        eMail: this.newCompanyEmail
     });
    }
  }

  clearNewCategoryInput() {
    this.newCategoryNameControl.setValue('');
  }

  clearNewCompanyInputs() {
    this.newCompanyNameControl.setValue('');
    this.email.setValue('');
  }

  isNewCompanyCorrect() {
    return this.newCompanyNameControl.valid && this.email.valid;
  }

  isNewCategoryCorrect() {
    return this.newCategoryNameControl.valid;
  }

  isOrderCorrect() {
    return this.categorySelectControl.status === 'VALID' && this.productNameControl.status === 'VALID'
    && this.quantityControl.status === 'VALID' && this.companySelectControl.status === 'VALID';
  }

  sendOrder() {
    console.log(this.selectedCategory);
    console.log('gdsfsF' + this.quantityControl.status + ' ' + this.email.status + ' ' +
      this.productNameControl.status + ' ');
      console.log('gdsfsF' + this.categorySelectControl.status);
      console.log('gdsfsF' + this.productName); // trzeba usunac z taga form ten heroform i my form oraz required przed tagu select
      console.log('gdsfsF' + this.selectedCompany);
      this.sendIsClicked = true;

      if (this.isOrderCorrect()) {
       // this.orderCollection.doc(this.owner).collection('Order').add({
       // category: this.selectedCategory,
       // product: this.productName,
       // quantity: this.quantity,
       // company: this.selectedCompany
       console.log('Dodaje ========= ');
       console.log('Kategoria: ' + this.selectedCategory);
       console.log('Product/name: ' + this.productName);
       console.log('Ilosc: ' + this.quantity);
       console.log('Kontrahent: ' + this.selectedCompany);
       this.sendIsClicked = false;
       this.myform.reset();
      } // );
    }
}
