import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  selectedRole: string = "";
  isVisible: boolean = true;

  constructor(private router: Router) {
  }

  onSubmit(): void {
    this.isVisible = false;
    if (this.selectedRole === "Campus") {
      this.router.navigate(["/campus"]);
    } else if (this.selectedRole === "Fleet") {
      this.router.navigate(["/fleet"]);
    } else if (this.selectedRole === "Task") {
      this.router.navigate(["/task"]);
    } else if(this.selectedRole === "Admin") {
      this.router.navigate(["/admin"]);
    }else{
      this.router.navigate(["/user"]);
    }
  }

  startRegistration() {
    // Navegue para a página de registro. Substitua 'register' pelo caminho da sua página de registro.
    this.router.navigate(['/register']);
  }

}
