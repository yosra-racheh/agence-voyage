import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { AgenceVoyageComponent } from 'app/entities/agence-voyage/agence-voyage.component';
import { AgenceVoyageService } from 'app/entities/agence-voyage/agence-voyage.service';
import { AgenceVoyage } from 'app/shared/model/agence-voyage.model';

describe('Component Tests', () => {
  describe('AgenceVoyage Management Component', () => {
    let comp: AgenceVoyageComponent;
    let fixture: ComponentFixture<AgenceVoyageComponent>;
    let service: AgenceVoyageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [AgenceVoyageComponent]
      })
        .overrideTemplate(AgenceVoyageComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgenceVoyageComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgenceVoyageService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AgenceVoyage(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.agenceVoyages && comp.agenceVoyages[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
