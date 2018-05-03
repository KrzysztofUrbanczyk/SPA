import {Injectable} from '@angular/core';

@Injectable()
export class ClientListService {
  data = [{
    Name: 'Mark',
    Email: 'mdo@gmail.com',
    Car: 'mondeo',
    Plates: '2asaf8',
    Comment: '2safdasfas gsdgsdg wegwe8',
    Status: 'tak',
    Add: '22-22-2012',
    Deadline: '22-22-2012',
    Price: '282',
  }, {
    Name: 'Mark',
    Email: 'mdo@gmail.com',
    Car: 'mondeo',
    Plates: '2asaf8',
    Comment: '2safdasfas gsdgsdg wegwe8',
    Status: 'tak',
    Add: '22-22-2012',
    Deadline: '22-22-2012',
    Price: '282',
  }];

  getData() {
    return this.data;
  }
}
