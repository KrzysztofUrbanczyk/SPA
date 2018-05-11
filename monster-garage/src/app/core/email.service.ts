import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmailService {

  constructor(private http: HttpClient) {
  }

  sendEmail() {
    const url = `https://us-central1-monstergarage-4cdc9.cloudfunctions.net/httpEmail`;
    let params = new HttpParams();

    params = params.append('to', 'urbanczykkr@gmail.com');

    return this.http.post(url, params)
      .toPromise()
      .catch(err => {
        console.log(err);
      });
  }

}
