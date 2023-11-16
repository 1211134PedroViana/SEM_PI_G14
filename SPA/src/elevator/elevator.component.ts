import { Component } from '@angular/core';

@Component({
  selector: 'app-elevator',
  templateUrl: './elevator.component.html',
  styleUrls: ['./elevator.component.css']
})

export class ElevatorComponent {

  titleText = 'Elevators Management';
  createButtonText = 'Create Elevators';
  updateButtonText = 'Update Elevators';
  listButtonText = 'List Elevators';
  createRoute = '/elevator/create';
  updateRoute = '/elevator/update';
  listRoute = '/elevator/list';
}
