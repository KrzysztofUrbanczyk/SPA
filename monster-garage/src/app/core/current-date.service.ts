export class CurrentDateService {
  private today;
  private dd;
  private mm;
  private yyyy;
  private daa: Date;

  getCurrentFormattedDate() {
    this.today = new Date();
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth() + 1;
    this.yyyy = this.today.getFullYear();

    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }

    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }

    return this.today = this.yyyy + '-' + this.mm + '-' + this.dd;
  }

  getFormattedRecentDate(numberOfDays: number) {
    this.today = this.removeDays(new Date(), numberOfDays);
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth() + 1;
    this.yyyy = this.today.getFullYear();
    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }

    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }

    return this.today = this.yyyy + '-' + this.mm + '-' + this.dd;
  }

  removeDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
}

}
