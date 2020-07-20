import { FuelType } from "./FuelType.model";

export module RefuellingModel{


    export interface RefuellingReqDTO{
        refuelingDateTime: Date;
        price: number;
        amount: number;
        odometerReading: number;
        fuelType: FuelType;
        refuellingPersonId: number;
    }

    export interface RefuellingResDTO{
        id: number;
        refuelingDateTime: Date;
        price: number;
        amount: number;
        odometerReading: number;
        fuelType: FuelType;
        refuellingPerson: RefuellingModel.RefuellingPersonResDTO;
        cost:number;
    }

    export interface Refuelling{
        id: number;
        refuelingDateTime: Date;
        price: number;
        amount: number;
        odometerReading: number;
        fuelType: FuelType;

        refuellingPersonId: number;
        refuellingPerson:RefuellingModel.RefuellingPersonResDTO
        cost:number;
    }

    export interface RefuellingPersonReqDTO{
        name: string;
        surname: string;
        postCode: string;
        city: string;
        address: string;

        refuellingPersonId: number;
    }

    export interface RefuellingPersonResDTO{
        id: number;
        name: string;
        surname: string;
        postCode: string;
        city: string;
        address: string;
    }

    export interface RefuellingPerson{
        id: number;
        name: string;
        surname: string;
        postCode: string;
        city: string;
        address: string;
    }
}