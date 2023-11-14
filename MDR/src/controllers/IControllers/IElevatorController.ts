import { Request, Response, NextFunction } from 'express';

export default interface IElevatorController  {
    createElevator(req: Request, res: Response, next: NextFunction);
    listElevators(req: Request, res: Response, next: NextFunction);
    listFloorsServedByElevatorInBuilding(req: Request, res: Response, next: NextFunction);
}