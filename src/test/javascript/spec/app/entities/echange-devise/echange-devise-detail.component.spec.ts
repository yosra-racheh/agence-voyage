import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { EchangeDeviseDetailComponent } from 'app/entities/echange-devise/echange-devise-detail.component';
import { EchangeDevise } from 'app/shared/model/echange-devise.model';

describe('Component Tests', () => {
  describe('EchangeDevise Management Detail Component', () => {
    let comp: EchangeDeviseDetailComponent;
    let fixture: ComponentFixture<EchangeDeviseDetailComponent>;
    const route = ({ data: of({ echangeDevise: new EchangeDevise(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [EchangeDeviseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EchangeDeviseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EchangeDeviseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load echangeDevise on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.echangeDevise).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
