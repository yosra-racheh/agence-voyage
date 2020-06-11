package com.wegatravel.partnermanager.web.rest;

import com.wegatravel.partnermanager.WegaTravelPartnerManagerApp;
import com.wegatravel.partnermanager.domain.Devise;
import com.wegatravel.partnermanager.repository.DeviseRepository;
import com.wegatravel.partnermanager.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.wegatravel.partnermanager.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DeviseResource} REST controller.
 */
@SpringBootTest(classes = WegaTravelPartnerManagerApp.class)
public class DeviseResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private DeviseRepository deviseRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restDeviseMockMvc;

    private Devise devise;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeviseResource deviseResource = new DeviseResource(deviseRepository);
        this.restDeviseMockMvc = MockMvcBuilders.standaloneSetup(deviseResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Devise createEntity(EntityManager em) {
        Devise devise = new Devise()
            .nom(DEFAULT_NOM)
            .code(DEFAULT_CODE);
        return devise;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Devise createUpdatedEntity(EntityManager em) {
        Devise devise = new Devise()
            .nom(UPDATED_NOM)
            .code(UPDATED_CODE);
        return devise;
    }

    @BeforeEach
    public void initTest() {
        devise = createEntity(em);
    }

    @Test
    @Transactional
    public void createDevise() throws Exception {
        int databaseSizeBeforeCreate = deviseRepository.findAll().size();

        // Create the Devise
        restDeviseMockMvc.perform(post("/api/devises")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(devise)))
            .andExpect(status().isCreated());

        // Validate the Devise in the database
        List<Devise> deviseList = deviseRepository.findAll();
        assertThat(deviseList).hasSize(databaseSizeBeforeCreate + 1);
        Devise testDevise = deviseList.get(deviseList.size() - 1);
        assertThat(testDevise.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testDevise.getCode()).isEqualTo(DEFAULT_CODE);
    }

    @Test
    @Transactional
    public void createDeviseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deviseRepository.findAll().size();

        // Create the Devise with an existing ID
        devise.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeviseMockMvc.perform(post("/api/devises")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(devise)))
            .andExpect(status().isBadRequest());

        // Validate the Devise in the database
        List<Devise> deviseList = deviseRepository.findAll();
        assertThat(deviseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDevises() throws Exception {
        // Initialize the database
        deviseRepository.saveAndFlush(devise);

        // Get all the deviseList
        restDeviseMockMvc.perform(get("/api/devises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(devise.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)));
    }
    
    @Test
    @Transactional
    public void getDevise() throws Exception {
        // Initialize the database
        deviseRepository.saveAndFlush(devise);

        // Get the devise
        restDeviseMockMvc.perform(get("/api/devises/{id}", devise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(devise.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE));
    }

    @Test
    @Transactional
    public void getNonExistingDevise() throws Exception {
        // Get the devise
        restDeviseMockMvc.perform(get("/api/devises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDevise() throws Exception {
        // Initialize the database
        deviseRepository.saveAndFlush(devise);

        int databaseSizeBeforeUpdate = deviseRepository.findAll().size();

        // Update the devise
        Devise updatedDevise = deviseRepository.findById(devise.getId()).get();
        // Disconnect from session so that the updates on updatedDevise are not directly saved in db
        em.detach(updatedDevise);
        updatedDevise
            .nom(UPDATED_NOM)
            .code(UPDATED_CODE);

        restDeviseMockMvc.perform(put("/api/devises")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDevise)))
            .andExpect(status().isOk());

        // Validate the Devise in the database
        List<Devise> deviseList = deviseRepository.findAll();
        assertThat(deviseList).hasSize(databaseSizeBeforeUpdate);
        Devise testDevise = deviseList.get(deviseList.size() - 1);
        assertThat(testDevise.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testDevise.getCode()).isEqualTo(UPDATED_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingDevise() throws Exception {
        int databaseSizeBeforeUpdate = deviseRepository.findAll().size();

        // Create the Devise

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeviseMockMvc.perform(put("/api/devises")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(devise)))
            .andExpect(status().isBadRequest());

        // Validate the Devise in the database
        List<Devise> deviseList = deviseRepository.findAll();
        assertThat(deviseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDevise() throws Exception {
        // Initialize the database
        deviseRepository.saveAndFlush(devise);

        int databaseSizeBeforeDelete = deviseRepository.findAll().size();

        // Delete the devise
        restDeviseMockMvc.perform(delete("/api/devises/{id}", devise.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Devise> deviseList = deviseRepository.findAll();
        assertThat(deviseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
