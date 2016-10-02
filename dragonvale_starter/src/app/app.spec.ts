import { TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import AppComponent from './app.component';

describe('Component AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
          AppComponent
      ]})
  });

  it('should create an instance', () => {
      var instance = new AppComponent();
      expect(instance).toBeTruthy();
  });

});
