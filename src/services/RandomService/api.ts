export interface IRandomServiceOptions {
  onNumberChanged: (number: number) => void;
}

export type IRandomService = {
  update: () => void;
};
