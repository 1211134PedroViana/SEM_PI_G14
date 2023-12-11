import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BuildingService } from 'src/buildingService/building.service';
import { FloorService } from 'src/floorService/floor-service';
import { TaskService } from 'src/taskService/task.service';
import SurveillanceTask from 'src/taskService/surveillanceTask';
import PickupAndDeliveryTask from 'src/taskService/pickupAndDeliveryTask';
import { SystemUserService } from 'src/systemUserService/systemUser.service';

@Component({
  selector: 'app-task-by-status',
  templateUrl: './task-by-status.component.html',
  styleUrls: ['./task-by-status.component.css']
})
export class TaskByStatusComponent {

  selectedStatus = '';
  isFormVisible: boolean = true;
  isListVisible: boolean = false;
  survTasks: SurveillanceTask[] = [];
  pickupTasks: PickupAndDeliveryTask[] = [];
  parsedSurvTasks: SurveillanceTask[] = [];

  constructor(private taskService: TaskService, private userService: SystemUserService, private buildingService: BuildingService, 
    private floorService: FloorService, private router: Router) { }

  closeForm() {
    this.router.navigate(["/user/searchTask"]);
  }

  onSubmit() {
    
    this.taskService.getByStatusSurveillanceTask(this.selectedStatus)
      .pipe(
        tap((response) => {
          console.log('Room created successfully', response);
          this.survTasks = response;
          this.parseSurvList();
        }),
        catchError((error) => {
          console.error('Error occurred while listing the tasks', error);
          throw error;
        })
      )
      .subscribe()

    this.taskService.getByStatusPickupAndDelivery(this.selectedStatus)
      .pipe(
        tap((response) => {
          this.pickupTasks = response;
        }),
        catchError((error) => {
          console.error('Error occurred while listing the tasks', error);
          throw error;
        })
      )
      .subscribe()

      this.isFormVisible = false;
      this.isListVisible = true;
    
  }

  parseSurvList() {
    for(let i = 0; i < this.survTasks.length; i++) {
      let building: any;
      let user: any;
      let floors: string[] = [];

      this.userService.getUserById(this.survTasks[i].userId)
      .pipe(
        tap((response) => {
          user = response;

          this.buildingService.getBuildingById(this.survTasks[i].buildingId)
          .pipe(
            tap((response) => {
              building = response;

              for(let j = 0; j < this.survTasks[i].floorIds.length; j++) {
                this.floorService.getFloorById(this.survTasks[i].floorIds[j])
                .pipe(
                tap((response) => {
                  floors.push(response.floorNumber.toString())
                }),
                catchError((error) => {
                  console.error('Error occurred while getting the Floor', error);
                  throw error;
                })
                )
                .subscribe()
              }

              const surveillanceTask = ({
                buildingId: building.name,
                floorIds: floors,
                startPlace: this.survTasks[i].startPlace,
                endPlace: this.survTasks[i].endPlace,
                phoneNumber: this.survTasks[i].phoneNumber,
                status: this.survTasks[i].status,
                userId: user.email
              }) as SurveillanceTask;
        
              this.parsedSurvTasks.push(surveillanceTask);

            }),
          catchError((error) => {
          console.error('Error occurred while getting the Building', error);
          throw error;
        })
        )
        .subscribe()

        }),
        catchError((error) => {
          console.error('Error occurred while getting the User', error);
          throw error;
        })
      )
      .subscribe()  

    }
  }

}
