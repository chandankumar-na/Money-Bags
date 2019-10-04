import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AppService } from './../app.service';
import { UserDetailsObject } from "./../interfaces/userDetails.interface";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core'
import { Router } from '@angular/router'
import { By } from '@angular/platform-browser'
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HomeComponent } from '../home/home.component';
import { Observable } from 'rxjs/Observable';
declare var jQuery: any;
// ADDED CLASS
class MockRouter {
  navigateByUrl(url: string) { return url; }
}
class appServiceMock {
  public login() {
    const users = new UserDetailsObject("test", "test")
    return Observable.of(users);
  }

}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  let appService: AppService;
  let componentService: AppService
  let backend: MockBackend = null;

  let model = new UserDetailsObject();
  let error_message: any;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [LoginComponent, HomeComponent],
      imports: [FormsModule],
      providers: [{provide:AppService,useClass:appServiceMock}, { provide: Router, useClass: MockRouter }],
    }).compileComponents();

    TestBed.overrideComponent(
      LoginComponent,
      { set: { providers: [{ provide: AppService }] } }
    );
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;


    const username = fixture.debugElement.query(By.css('input[name="userName"]'));
    const password = fixture.debugElement.query(By.css('input[type="password"]'));
    const loginbutton = fixture.debugElement.query(By.css('#loginSubmit')).nativeElement;
    fixture.detectChanges();
  }))

  it('should create ', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the Heading Login', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Login');
  });


  it('should show registration form, onclick of Register ', () => {
    const reghyperlink = fixture.debugElement.query(By.css('#reg')).nativeElement;
    reghyperlink.click()
    component.login_register_flag = true
    fixture.detectChanges();
  });

  it('should show Login form, onclick of Login ', () => {
    const loghyperlink = fixture.debugElement.query(By.css('#log')).nativeElement;
    loghyperlink.click()
    component.login_register_flag = false
    fixture.detectChanges();
  });



  //actual valid user n password
  let valid_username = 'test'
  let valid_password = 'test'


  it(' Invalid Login Credentials', () => {


    component.model.userName = 'invalid user'
    component.model.password = 'invalid password'

    component.error_message = "Invalid user name or password"

    fixture.detectChanges();

    expect(component.model.userName).not.toBe(valid_username);
    expect(component.model.password).not.toBe(valid_password);

  });

  it(' Valid Login Credentials', () => {
    component.model.userName = 'test'
    component.model.password = 'test'

    fixture.detectChanges();

    expect(component.model.userName).toBe(valid_username);
    expect(component.model.password).toBe(valid_password);

    // this.appServiceMock.login()

  });

});
