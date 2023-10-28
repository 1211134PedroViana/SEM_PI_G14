import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IFloorService from './IServices/IFloorService';
import IFloorRepo from './IRepos/IFloorRepo';
import IFloorDTO from '../dto/IFloorDTO';
import IBuildingRepo from './IRepos/IBuildingRepo';
import { Description } from '../domain/description';
import { Floor } from '../domain/floor';
import { FloorMap } from '../mappers/FloorMap';
import { Cell } from '../domain/cell';
import IBuildingDTO from "../dto/IBuildingDTO";
import {BuildingMap} from "../mappers/BuildingMap";
import {Building} from "../domain/building";

@Service()
export default class FloorService implements IFloorService {
    constructor(
        @Inject(config.repos.floor.name) private floorRepo : IFloorRepo,
        @Inject(config.repos.building.name) private buildingRepo : IBuildingRepo
    ) {}

    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {          
         
          const building = await this.buildingRepo.findByObjectId(floorDTO.buildingId);
            const descriptionOrError = Description.create(floorDTO.description);
          
          if (building === null) {
            return Result.fail<IFloorDTO>('Building with ID "' + floorDTO.buildingId + '" not found');
          }

          if (descriptionOrError.isFailure && floorDTO.description != undefined) {
            return Result.fail<IFloorDTO>('Invalid Description!');
          }

          const floorOrError = await Floor.create(floorDTO);

          if (floorOrError.isFailure) {
            return Result.fail<IFloorDTO>(floorOrError.errorValue());
          }
      
          const floorResult = floorOrError.getValue();
      
          await this.floorRepo.save(floorResult);
      
          const floorDTOResult = FloorMap.toDTO( floorResult ) as IFloorDTO;
            return Result.ok<IFloorDTO>( floorDTOResult )
          } catch (e) {
            throw e;
        }
    }
    public async updateFloor(floorDTO:IFloorDTO): Promise<Result<IFloorDTO>> {
        try {

            const floor = await this.floorRepo.findByDomainId(floorDTO.id);

            const descriptionOrError = Description.create(floorDTO.description);

            if (floor === null) {
                return Result.fail<IFloorDTO>('Building not found with id:' + floorDTO.id);
            }else{
                if (descriptionOrError.isFailure) {
                    return Result.fail<IFloorDTO>('Error updating building -> Invalid Description!');
                }else{
                    floor.description = descriptionOrError.getValue();

                    await this.floorRepo.save(floor);
                    const floorDTOResult = FloorMap.toDTO( floor ) as IFloorDTO;
                    return Result.ok<IFloorDTO>( floorDTOResult );
                }
            }

        } catch (e) {
            throw e;
        }
    }

    public async getAllFloors(): Promise<Result<IFloorDTO[]>> {
        try {
            const floorList: Floor[] = await this.floorRepo.findAll();
            let floorListDto: IFloorDTO[] = [];

            if (floorList != null){
                for (let i = 0; i < floorList.length; i++)
                    floorListDto.push(FloorMap.toDTO(floorList[i]));
                return Result.ok<IFloorDTO[]>(floorListDto);
            }
            return Result.fail<IFloorDTO[]>("There are no buildings to return.");
        } catch (e) {
            return Result.fail<IFloorDTO[]>(e.message);
        }
    }
}