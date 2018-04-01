export class Poll {

  _id: string;
  title: string;
  options: [{
    option: String,
    score: Number,
  }];
  user: string;
  endDate: Date;

  constructor() {

  }
}