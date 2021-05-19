import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
  error = ''
  constructor(public dialogRef: MatDialogRef<LoginComponent>, public dialog: MatDialog, private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  onSubmit() {
  }
  openSignupForm() {
    this.dialogRef.close();
    this.dialog.open(SignupComponent, {width: '500px', height: '450px'});
  }
  onLogin(){
    this.auth.signInWithEmailAndPassword(this.user.username, this.user.password).then((userCredential) => {
      this.dialogRef.close();
    }).catch((error) => this.error = "Wrong username or password!");
  }
}
