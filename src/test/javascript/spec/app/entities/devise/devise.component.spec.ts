import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { DeviseComponent } from 'app/entities/devise/devise.component';
import { DeviseService } from 'app/entities/devise/devise.service';
import { Devise } from 'app/shared/model/devise.model';

describe('Component Tests', () => {
  describe('Devise Management Component', () => {
    let comp: DeviseComponent;
    let fixture: ComponentFixture<DeviseComponent>;
    let service: DeviseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [DeviseComponent]
      })
        .overrideTemplate(DeviseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DeviseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DeviseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Devise(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.devises && comp.devises[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
