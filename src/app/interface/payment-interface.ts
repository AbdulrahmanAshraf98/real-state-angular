import { UnitInterface } from './unit-interface';
import { userInterface } from './userInterface';
export interface PaymentInterface {
  _id: string;
  unit: UnitInterface;
  owner: userInterface;
  employee: userInterface;
  paymentMethod: string;
  numberOfYears: number;
  amountPaid: number;
  remainingAmount: number;
  totalPaidAmount: number;
  requiredAmount: number;
  createdAt: Date;
  updatedBy: object;
  updatedAt: Date;
}
