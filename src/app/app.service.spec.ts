import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';


import { AppService } from './app.service';


describe('AppService', () => {

  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(
    () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AppService],
      })

      // inject the service
      service = TestBed.get(AppService);
      httpMock = TestBed.get(HttpTestingController);
      
    });

    
});
