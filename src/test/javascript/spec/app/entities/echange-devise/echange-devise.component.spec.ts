import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { EchangeDeviseComponent } from 'app/entities/echange-devise/echange-devise.component';
import { EchangeDeviseService } from 'app/entities/echange-devise/echange-devise.service';
import { EchangeDevise } from 'app/shared/model/echange-devise.model';

describe('Component Tests', () => {
  describe('EchangeDevise Management Component', () => {
    let comp: EchangeDeviseComponent;
    let fixture: ComponentFixture<EchangeDeviseComponent>;
    let service: EchangeDeviseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [EchangeDeviseComponent]
      })
        .overrideTemplate(EchangeDeviseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EchangeDeviseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EchangeDeviseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EchangeDevise(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.echangeDevises && comp.echangeDevises[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
