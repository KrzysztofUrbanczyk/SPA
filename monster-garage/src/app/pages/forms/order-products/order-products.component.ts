import { Component, OnInit } from '@angular/core';
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

  private orderProductForm: FormGroup;

  private categorySelectControl: FormControl;
  private newCategoryNameControl: FormControl;
  private productNameControl: FormControl;
  private quantityControl: FormControl;
  private companySelectControl: FormControl;
  private newCompanyEmailControl: FormControl;
  private newCompanyNameControl: FormControl;

  private sendOrderIsClicked: boolean;

  constructor(db: AngularFirestore) {
    // this.owner = 'root';
    this.categoriesCollection = db.collection('Categories');
    this.companiesCollection = db.collection('Companies');
    this.orderCollection = db.collection('Orders');

    this.categories = this.categoriesCollection.valueChanges();
    this.companies = this.companiesCollection.valueChanges();
    this.orders = this.orderCollection.valueChanges();
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
    this.newCategoryNameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
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
    this.newCompanyEmailControl = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.newCompanyNameControl = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);
  }

  createForm() {
    this.orderProductForm = new FormGroup({
      categorySelectControl: this.categorySelectControl,
      newCategoryNameControl: this.newCategoryNameControl,
      productNameControl: this.productNameControl,
      quantityControl: this.quantityControl,
      companySelectControl: this.companySelectControl,
      newCompanyEmailControl: this.newCompanyEmailControl,
      newCompanyNameControl: this.newCompanyNameControl
    });
  }

  addNewCategory() {
    if (this.isNewCategoryCorrect()) {
      this.categoriesCollection.doc(this.newCategory).set({
        name: this.newCategory
      });
    }
  }

  addNewCompany() {
    if (this.isNewCompanyCorrect()) {
      this.companiesCollection.doc(this.newCompany).set({
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
    this.newCompanyEmailControl.setValue('');
  }

  isNewCompanyCorrect() {
    return this.newCompanyNameControl.valid && this.newCompanyEmailControl.valid;
  }

  isNewCategoryCorrect() {
    return this.newCategoryNameControl.valid;
  }

  isOrderCorrect() {
    return this.categorySelectControl.status === 'VALID' && this.productNameControl.status === 'VALID'
      && this.quantityControl.status === 'VALID' && this.companySelectControl.status === 'VALID';
  }

  sendOrder() {
    this.sendOrderIsClicked = true;
    if (this.isOrderCorrect()) {
      this.orderCollection.add({
        category: this.selectedCategory,
        product: this.productName,
        quantity: this.quantity,
        company: this.selectedCompany
      });
      this.sendOrderIsClicked = false;
      this.orderProductForm.reset();
    }
  }
}
