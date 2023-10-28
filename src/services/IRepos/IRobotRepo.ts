import { Robot } from "../../domain/robot"
import { Repo } from "../../core/infra/Repo";
import { RobotId } from "../../domain/robotId";
import { RobotCode } from "../../domain/robotCode";


export default interface IRobotRepo extends Repo<Robot> {
    save(robot: Robot): Promise<Robot>;
    findByDomainId(robotId: RobotId | string): Promise<Robot>;
    findByObjectId (robotId: string): Promise<Robot>;
    findByCode(robotCode: RobotCode | string): Promise<Robot>;
    findByNickname(nickname: string): Promise<Robot>;
}