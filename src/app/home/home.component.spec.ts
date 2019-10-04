import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AppService } from './../app.service';
import { UserDetailsObject } from "./../interfaces/userDetails.interface";
import { ToDoList } from './../interfaces/toDoList.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core'
import { Router } from '@angular/router'
import { By } from '@angular/platform-browser'
import { Observable } from 'rxjs/Observable'; 

declare var jQuery: any;
// ADDED CLASS
class MockRouter {
  navigateByUrl(url: string) { return url; }
}

class appServiceMock {
  router:Router;
   toDoList=new ToDoList()
  fetchToDo():Observable<ToDoList>{
    this.toDoList.name="one"
    return Observable.of(this.toDoList);
  }

}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

  let appService: AppService;
  let componentService: AppService

  let model = new UserDetailsObject();
  let error_message: any;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [FormsModule],
      providers: [{provide:AppService,useClass:appServiceMock}, { provide: Router, useClass: MockRouter }],
  
    }).compileComponents();

    TestBed.overrideComponent(
      HomeComponent,
      { set: { providers: [{ provide: AppService }] } }
    );
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    component.toDoList1 = new ToDoList();
    component.user_name='test'
    component.toDoList1.todo_task = "todo"
    component.toDoList1.userName ='test'

    fixture.detectChanges();

  }))

  // it('should create ', () => {

  //   // const app = fixture.debugElement.componentInstance;
  //   // expect(app).toBeTruthy();
  // });


});
