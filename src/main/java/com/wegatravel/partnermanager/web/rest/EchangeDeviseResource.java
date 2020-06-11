package com.wegatravel.partnermanager.web.rest;

import com.wegatravel.partnermanager.domain.EchangeDevise;
import com.wegatravel.partnermanager.repository.EchangeDeviseRepository;
import com.wegatravel.partnermanager.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.wegatravel.partnermanager.domain.EchangeDevise}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EchangeDeviseResource {

    private final Logger log = LoggerFactory.getLogger(EchangeDeviseResource.class);

    private static final String ENTITY_NAME = "echangeDevise";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EchangeDeviseRepository echangeDeviseRepository;

    public EchangeDeviseResource(EchangeDeviseRepository echangeDeviseRepository) {
        this.echangeDeviseRepository = echangeDeviseRepository;
    }

    /**
     * {@code POST  /echange-devises} : Create a new echangeDevise.
     *
     * @param echangeDevise the echangeDevise to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new echangeDevise, or with status {@code 400 (Bad Request)} if the echangeDevise has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/echange-devises")
    public ResponseEntity<EchangeDevise> createEchangeDevise(@RequestBody EchangeDevise echangeDevise) throws URISyntaxException {
        log.debug("REST request to save EchangeDevise : {}", echangeDevise);
        if (echangeDevise.getId() != null) {
            throw new BadRequestAlertException("A new echangeDevise cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EchangeDevise result = echangeDeviseRepository.save(echangeDevise);
        return ResponseEntity.created(new URI("/api/echange-devises/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /echange-devises} : Updates an existing echangeDevise.
     *
     * @param echangeDevise the echangeDevise to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated echangeDevise,
     * or with status {@code 400 (Bad Request)} if the echangeDevise is not valid,
     * or with status {@code 500 (Internal Server Error)} if the echangeDevise couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/echange-devises")
    public ResponseEntity<EchangeDevise> updateEchangeDevise(@RequestBody EchangeDevise echangeDevise) throws URISyntaxException {
        log.debug("REST request to update EchangeDevise : {}", echangeDevise);
        if (echangeDevise.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EchangeDevise result = echangeDeviseRepository.save(echangeDevise);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, echangeDevise.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /echange-devises} : get all the echangeDevises.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of echangeDevises in body.
     */
    @GetMapping("/echange-devises")
    public List<EchangeDevise> getAllEchangeDevises() {
        log.debug("REST request to get all EchangeDevises");
        return echangeDeviseRepository.findAll();
    }

    /**
     * {@code GET  /echange-devises/:id} : get the "id" echangeDevise.
     *
     * @param id the id of the echangeDevise to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the echangeDevise, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/echange-devises/{id}")
    public ResponseEntity<EchangeDevise> getEchangeDevise(@PathVariable Long id) {
        log.debug("REST request to get EchangeDevise : {}", id);
        Optional<EchangeDevise> echangeDevise = echangeDeviseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(echangeDevise);
    }

    /**
     * {@code DELETE  /echange-devises/:id} : delete the "id" echangeDevise.
     *
     * @param id the id of the echangeDevise to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/echange-devises/{id}")
    public ResponseEntity<Void> deleteEchangeDevise(@PathVariable Long id) {
        log.debug("REST request to delete EchangeDevise : {}", id);
        echangeDeviseRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
