import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  type:string = "password"
  isText: boolean = false
  eyeIcon : string ="fa-eye-slash";
  loginForm!:FormGroup;
  constructor(private fb: FormBuilder, private http : HttpClient) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group ({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  ok(){
    this.http.get<any>("http://localhost:3000/user")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success");
        this.loginForm.reset();
      } else{
        alert("email or password is invalid!");
      }
    })
  }

  hideshow(){
    this.isText=!this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }else{

      this.validateAllformFildes(this.loginForm);
      alert("your form is invalid")

    }
  }
  private validateAllformFildes(formGroup:FormGroup){
    // Object.keys(formGroup.controls).forEach(field=>{
    //   const control = formGroup.get(field);
    //   if (control instanceof FormControl ){
    //     control?.markAsDirty({onlySelf:true});
    //   } else if (control instanceof FormGroup) {
    //     this.validateAllformFildes(control)
    //   }
    // })

  }

}
