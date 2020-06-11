import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { DeviseDetailComponent } from 'app/entities/devise/devise-detail.component';
import { Devise } from 'app/shared/model/devise.model';

describe('Component Tests', () => {
  describe('Devise Management Detail Component', () => {
    let comp: DeviseDetailComponent;
    let fixture: ComponentFixture<DeviseDetailComponent>;
    const route = ({ data: of({ devise: new Devise(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [DeviseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DeviseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DeviseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load devise on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.devise).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
