import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { ReservationDetailComponent } from 'app/entities/reservation/reservation-detail.component';
import { Reservation } from 'app/shared/model/reservation.model';

describe('Component Tests', () => {
  describe('Reservation Management Detail Component', () => {
    let comp: ReservationDetailComponent;
    let fixture: ComponentFixture<ReservationDetailComponent>;
    const route = ({ data: of({ reservation: new Reservation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [ReservationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReservationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReservationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load reservation on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reservation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
