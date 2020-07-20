import { FuelType } from "./FuelType.model";

export module RefuellingModel{


    export interface RefuellingReqDTO{
        refuelingDateTime: Date;
        price: number;
        amount: number;
        odometerReading: number;
        fuelType: FuelType;
    }

    export interface RefuellingResDTO{
        id: number;
        refuelingDateTime: Date;
        price: number;
        amount: number;
        odometerReading: number;
        fuelType: FuelType;
    }

    export interface Refuelling extends RefuellingResDTO{
        
    }
}