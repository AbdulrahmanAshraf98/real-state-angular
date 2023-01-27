export interface UnitInterface {
  _id: string;
  name: string;
  buildingId: string;
  unitAddress: string;
  price: number;
  status: boolean;
  createdBy?: string;
  unitImages: string[];
}
