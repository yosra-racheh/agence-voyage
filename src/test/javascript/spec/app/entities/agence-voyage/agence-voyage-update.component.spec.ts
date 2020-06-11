import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { AgenceVoyageUpdateComponent } from 'app/entities/agence-voyage/agence-voyage-update.component';
import { AgenceVoyageService } from 'app/entities/agence-voyage/agence-voyage.service';
import { AgenceVoyage } from 'app/shared/model/agence-voyage.model';

describe('Component Tests', () => {
  describe('AgenceVoyage Management Update Component', () => {
    let comp: AgenceVoyageUpdateComponent;
    let fixture: ComponentFixture<AgenceVoyageUpdateComponent>;
    let service: AgenceVoyageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [AgenceVoyageUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AgenceVoyageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgenceVoyageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgenceVoyageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgenceVoyage(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgenceVoyage();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
