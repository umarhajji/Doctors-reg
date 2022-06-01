import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorsService } from 'src/app/Services/doctors.service';

@Component({
  selector: 'app-register-doc',
  templateUrl: './register-doc.component.html',
  styleUrls: ['./register-doc.component.css']
})
export class RegisterDocComponent implements OnInit {

  constructor(private fb: FormBuilder,
     private doctorsService: DoctorsService,
     private router: Router) { }

registerForm = this.fb.group({
    name: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
    }],
    username: ['', {
      validators: [Validators.required],
      updateOn: 'blur'
  }],
  email: ['', {
    validators: [Validators.required, Validators.email],
    updateOn: 'blur'
  }],
  phone: ['', {
    validators: [Validators.required, Validators.pattern("^[0-9]*$"),
     Validators.minLength(11), Validators.maxLength(11)],
    updateOn: 'blur'
  }],
  city: ['', {
    validators: [Validators.required],
    updateOn: 'blur'
  }],
  website: ['', {
    validators: [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')], updateOn: 'blur'
  }]
  })

  ngOnInit() {

  }
  get email() {
    return this.registerForm.controls['email']
}
  get phone() {
  return this.registerForm.controls['phone'];
}
  get website(){
  return this.registerForm.controls['website']
}
  get city(){
    return this.registerForm.controls['city']

  }

  registerDoc(){
    console.log(this.registerForm.value);
    this.doctorsService.addDoctor(this.registerForm.value).subscribe({
      next:(res)=>{
        alert("Doctor Added Successfully")
        this.router.navigateByUrl('');
      },
      error:()=>{
        alert("Error while Adding Doctor!")
      }
    })
  }

}
