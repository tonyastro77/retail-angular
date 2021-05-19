import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  usersCollection: AngularFirestoreCollection<any>;
  user = {username: '', email: '', password: '', remember: false};
  registerForm: FormGroup;
  error = ''

  constructor(public dialogRef: MatDialogRef<SignupComponent>, public dialog: MatDialog,
    public auth: AngularFireAuth, public firestore: AngularFirestore, private fb: FormBuilder ) {
      this.usersCollection = this.firestore.collection('users');
    }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: new FormControl('', [ Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6)])
    });
  }
  openLoginForm() {
    this.dialogRef.close();
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }
  createUser(){
    const { username, email, password } = this.registerForm.value;
    this.auth.createUserWithEmailAndPassword(email, password).then(cred => {
      this.usersCollection.doc(cred.user.uid).set({
          email: email,
          name: username,
      })
      this.dialogRef.close();
    }).catch((error) => this.error="Failed to create user");
  }
}
