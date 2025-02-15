export interface IDropdown {
  id: number;
  name: string;
}

export interface IRoomType extends IDropdown {
  maxguest: number;
}
