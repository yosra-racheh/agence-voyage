package com.wegatravel.partnermanager.web.rest;

import com.wegatravel.partnermanager.domain.AgenceVoyage;
import com.wegatravel.partnermanager.repository.AgenceVoyageRepository;
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
 * REST controller for managing {@link com.wegatravel.partnermanager.domain.AgenceVoyage}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AgenceVoyageResource {

    private final Logger log = LoggerFactory.getLogger(AgenceVoyageResource.class);

    private static final String ENTITY_NAME = "agenceVoyage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AgenceVoyageRepository agenceVoyageRepository;

    public AgenceVoyageResource(AgenceVoyageRepository agenceVoyageRepository) {
        this.agenceVoyageRepository = agenceVoyageRepository;
    }

    /**
     * {@code POST  /agence-voyages} : Create a new agenceVoyage.
     *
     * @param agenceVoyage the agenceVoyage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new agenceVoyage, or with status {@code 400 (Bad Request)} if the agenceVoyage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/agence-voyages")
    public ResponseEntity<AgenceVoyage> createAgenceVoyage(@RequestBody AgenceVoyage agenceVoyage) throws URISyntaxException {
        log.debug("REST request to save AgenceVoyage : {}", agenceVoyage);
        if (agenceVoyage.getId() != null) {
            throw new BadRequestAlertException("A new agenceVoyage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgenceVoyage result = agenceVoyageRepository.save(agenceVoyage);
        return ResponseEntity.created(new URI("/api/agence-voyages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /agence-voyages} : Updates an existing agenceVoyage.
     *
     * @param agenceVoyage the agenceVoyage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated agenceVoyage,
     * or with status {@code 400 (Bad Request)} if the agenceVoyage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the agenceVoyage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/agence-voyages")
    public ResponseEntity<AgenceVoyage> updateAgenceVoyage(@RequestBody AgenceVoyage agenceVoyage) throws URISyntaxException {
        log.debug("REST request to update AgenceVoyage : {}", agenceVoyage);
        if (agenceVoyage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgenceVoyage result = agenceVoyageRepository.save(agenceVoyage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, agenceVoyage.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /agence-voyages} : get all the agenceVoyages.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of agenceVoyages in body.
     */
    @GetMapping("/agence-voyages")
    public List<AgenceVoyage> getAllAgenceVoyages(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all AgenceVoyages");
        return agenceVoyageRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /agence-voyages/:id} : get the "id" agenceVoyage.
     *
     * @param id the id of the agenceVoyage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the agenceVoyage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/agence-voyages/{id}")
    public ResponseEntity<AgenceVoyage> getAgenceVoyage(@PathVariable Long id) {
        log.debug("REST request to get AgenceVoyage : {}", id);
        Optional<AgenceVoyage> agenceVoyage = agenceVoyageRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(agenceVoyage);
    }

    /**
     * {@code DELETE  /agence-voyages/:id} : delete the "id" agenceVoyage.
     *
     * @param id the id of the agenceVoyage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/agence-voyages/{id}")
    public ResponseEntity<Void> deleteAgenceVoyage(@PathVariable Long id) {
        log.debug("REST request to delete AgenceVoyage : {}", id);
        agenceVoyageRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
