export class NumberRequest {
  constructor(public number: number) {}
}

export interface INumberResponse {
  number: number;
}

export interface IHomePageResponse {
  data: {
    number: number;
  };
}
