import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { AgenceVoyageDetailComponent } from 'app/entities/agence-voyage/agence-voyage-detail.component';
import { AgenceVoyage } from 'app/shared/model/agence-voyage.model';

describe('Component Tests', () => {
  describe('AgenceVoyage Management Detail Component', () => {
    let comp: AgenceVoyageDetailComponent;
    let fixture: ComponentFixture<AgenceVoyageDetailComponent>;
    const route = ({ data: of({ agenceVoyage: new AgenceVoyage(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [AgenceVoyageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AgenceVoyageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgenceVoyageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load agenceVoyage on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.agenceVoyage).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
