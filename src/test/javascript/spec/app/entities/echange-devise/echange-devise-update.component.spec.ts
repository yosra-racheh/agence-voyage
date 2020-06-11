import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { WegaTravelPartnerManagerTestModule } from '../../../test.module';
import { EchangeDeviseUpdateComponent } from 'app/entities/echange-devise/echange-devise-update.component';
import { EchangeDeviseService } from 'app/entities/echange-devise/echange-devise.service';
import { EchangeDevise } from 'app/shared/model/echange-devise.model';

describe('Component Tests', () => {
  describe('EchangeDevise Management Update Component', () => {
    let comp: EchangeDeviseUpdateComponent;
    let fixture: ComponentFixture<EchangeDeviseUpdateComponent>;
    let service: EchangeDeviseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [WegaTravelPartnerManagerTestModule],
        declarations: [EchangeDeviseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EchangeDeviseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EchangeDeviseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EchangeDeviseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EchangeDevise(123);
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
        const entity = new EchangeDevise();
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
