package com.wegatravel.partnermanager.web.rest;

import com.wegatravel.partnermanager.WegaTravelPartnerManagerApp;
import com.wegatravel.partnermanager.domain.EchangeDevise;
import com.wegatravel.partnermanager.repository.EchangeDeviseRepository;
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
 * Integration tests for the {@link EchangeDeviseResource} REST controller.
 */
@SpringBootTest(classes = WegaTravelPartnerManagerApp.class)
public class EchangeDeviseResourceIT {

    private static final String DEFAULT_CODE_1 = "AAAAAAAAAA";
    private static final String UPDATED_CODE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_CODE_2 = "AAAAAAAAAA";
    private static final String UPDATED_CODE_2 = "BBBBBBBBBB";

    private static final Float DEFAULT_TAUXCHANGE = 1F;
    private static final Float UPDATED_TAUXCHANGE = 2F;

    @Autowired
    private EchangeDeviseRepository echangeDeviseRepository;

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

    private MockMvc restEchangeDeviseMockMvc;

    private EchangeDevise echangeDevise;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EchangeDeviseResource echangeDeviseResource = new EchangeDeviseResource(echangeDeviseRepository);
        this.restEchangeDeviseMockMvc = MockMvcBuilders.standaloneSetup(echangeDeviseResource)
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
    public static EchangeDevise createEntity(EntityManager em) {
        EchangeDevise echangeDevise = new EchangeDevise()
            .code1(DEFAULT_CODE_1)
            .code2(DEFAULT_CODE_2)
            .tauxchange(DEFAULT_TAUXCHANGE);
        return echangeDevise;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EchangeDevise createUpdatedEntity(EntityManager em) {
        EchangeDevise echangeDevise = new EchangeDevise()
            .code1(UPDATED_CODE_1)
            .code2(UPDATED_CODE_2)
            .tauxchange(UPDATED_TAUXCHANGE);
        return echangeDevise;
    }

    @BeforeEach
    public void initTest() {
        echangeDevise = createEntity(em);
    }

    @Test
    @Transactional
    public void createEchangeDevise() throws Exception {
        int databaseSizeBeforeCreate = echangeDeviseRepository.findAll().size();

        // Create the EchangeDevise
        restEchangeDeviseMockMvc.perform(post("/api/echange-devises")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(echangeDevise)))
            .andExpect(status().isCreated());

        // Validate the EchangeDevise in the database
        List<EchangeDevise> echangeDeviseList = echangeDeviseRepository.findAll();
        assertThat(echangeDeviseList).hasSize(databaseSizeBeforeCreate + 1);
        EchangeDevise testEchangeDevise = echangeDeviseList.get(echangeDeviseList.size() - 1);
        assertThat(testEchangeDevise.getCode1()).isEqualTo(DEFAULT_CODE_1);
        assertThat(testEchangeDevise.getCode2()).isEqualTo(DEFAULT_CODE_2);
        assertThat(testEchangeDevise.getTauxchange()).isEqualTo(DEFAULT_TAUXCHANGE);
    }

    @Test
    @Transactional
    public void createEchangeDeviseWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = echangeDeviseRepository.findAll().size();

        // Create the EchangeDevise with an existing ID
        echangeDevise.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEchangeDeviseMockMvc.perform(post("/api/echange-devises")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(echangeDevise)))
            .andExpect(status().isBadRequest());

        // Validate the EchangeDevise in the database
        List<EchangeDevise> echangeDeviseList = echangeDeviseRepository.findAll();
        assertThat(echangeDeviseList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEchangeDevises() throws Exception {
        // Initialize the database
        echangeDeviseRepository.saveAndFlush(echangeDevise);

        // Get all the echangeDeviseList
        restEchangeDeviseMockMvc.perform(get("/api/echange-devises?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(echangeDevise.getId().intValue())))
            .andExpect(jsonPath("$.[*].code1").value(hasItem(DEFAULT_CODE_1)))
            .andExpect(jsonPath("$.[*].code2").value(hasItem(DEFAULT_CODE_2)))
            .andExpect(jsonPath("$.[*].tauxchange").value(hasItem(DEFAULT_TAUXCHANGE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getEchangeDevise() throws Exception {
        // Initialize the database
        echangeDeviseRepository.saveAndFlush(echangeDevise);

        // Get the echangeDevise
        restEchangeDeviseMockMvc.perform(get("/api/echange-devises/{id}", echangeDevise.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(echangeDevise.getId().intValue()))
            .andExpect(jsonPath("$.code1").value(DEFAULT_CODE_1))
            .andExpect(jsonPath("$.code2").value(DEFAULT_CODE_2))
            .andExpect(jsonPath("$.tauxchange").value(DEFAULT_TAUXCHANGE.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEchangeDevise() throws Exception {
        // Get the echangeDevise
        restEchangeDeviseMockMvc.perform(get("/api/echange-devises/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEchangeDevise() throws Exception {
        // Initialize the database
        echangeDeviseRepository.saveAndFlush(echangeDevise);

        int databaseSizeBeforeUpdate = echangeDeviseRepository.findAll().size();

        // Update the echangeDevise
        EchangeDevise updatedEchangeDevise = echangeDeviseRepository.findById(echangeDevise.getId()).get();
        // Disconnect from session so that the updates on updatedEchangeDevise are not directly saved in db
        em.detach(updatedEchangeDevise);
        updatedEchangeDevise
            .code1(UPDATED_CODE_1)
            .code2(UPDATED_CODE_2)
            .tauxchange(UPDATED_TAUXCHANGE);

        restEchangeDeviseMockMvc.perform(put("/api/echange-devises")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEchangeDevise)))
            .andExpect(status().isOk());

        // Validate the EchangeDevise in the database
        List<EchangeDevise> echangeDeviseList = echangeDeviseRepository.findAll();
        assertThat(echangeDeviseList).hasSize(databaseSizeBeforeUpdate);
        EchangeDevise testEchangeDevise = echangeDeviseList.get(echangeDeviseList.size() - 1);
        assertThat(testEchangeDevise.getCode1()).isEqualTo(UPDATED_CODE_1);
        assertThat(testEchangeDevise.getCode2()).isEqualTo(UPDATED_CODE_2);
        assertThat(testEchangeDevise.getTauxchange()).isEqualTo(UPDATED_TAUXCHANGE);
    }

    @Test
    @Transactional
    public void updateNonExistingEchangeDevise() throws Exception {
        int databaseSizeBeforeUpdate = echangeDeviseRepository.findAll().size();

        // Create the EchangeDevise

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEchangeDeviseMockMvc.perform(put("/api/echange-devises")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(echangeDevise)))
            .andExpect(status().isBadRequest());

        // Validate the EchangeDevise in the database
        List<EchangeDevise> echangeDeviseList = echangeDeviseRepository.findAll();
        assertThat(echangeDeviseList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEchangeDevise() throws Exception {
        // Initialize the database
        echangeDeviseRepository.saveAndFlush(echangeDevise);

        int databaseSizeBeforeDelete = echangeDeviseRepository.findAll().size();

        // Delete the echangeDevise
        restEchangeDeviseMockMvc.perform(delete("/api/echange-devises/{id}", echangeDevise.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EchangeDevise> echangeDeviseList = echangeDeviseRepository.findAll();
        assertThat(echangeDeviseList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
