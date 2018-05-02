import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
declare let notify: any;
export interface Msg {
  content: string;
  style: string;
}

@Injectable()
export class NotifyService {
  message: string;
  public _msgSource = new Subject<Msg | null>();

  msg = this._msgSource.asObservable();

  update(content: string, style: 'error' | 'info' | 'success') {
    const msg: Msg = {content, style};
    this._msgSource.next(msg);

  }
  updateData() {
      this.message = 'Aktualizacja udana!';
  }

  clear() {
    this._msgSource.next(null);
  }

}
