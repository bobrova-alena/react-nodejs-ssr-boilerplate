import { IRandomService as IRandomService, IRandomServiceOptions } from './api';

export class RandomService implements IRandomService {
  private _onNumberChanged: (number: number) => void;

  constructor(options: IRandomServiceOptions) {
    this._onNumberChanged = options.onNumberChanged;
  }

  public update(): void {
    const random = () => Math.floor(Math.random() * 100);
    this._onNumberChanged(random());
  }
}
