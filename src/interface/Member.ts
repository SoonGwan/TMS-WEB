export interface IDriver {
  id: string;
  username: string;
  allow: boolean,
  delivery_status: number,
};

export interface ISelectableDriver extends IDriver {
  selected: boolean,
}