import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserName = ['Abhay', 'Lodha'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'frm_UserCredentials': new FormGroup({
        'ctrl_username': new FormControl('user1', [Validators.required, this.checkUserName.bind(this)]),
        'ctrl_email': new FormControl('a@b.com', [Validators.required, Validators.email])
      }),
      'ctrl_gender': new FormControl('male'),
      'ctrl_hobbies': new FormArray([new FormControl('Hobby1', Validators.required)])
    })
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const form_control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('ctrl_hobbies')).push(form_control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('ctrl_hobbies')).controls;
  }

  checkUserName(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserName.indexOf(control.value) !== -1)
      return ({ 'nameIsForbidden': true })
    else
      return null;
  }

}
