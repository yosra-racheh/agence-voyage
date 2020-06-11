package com.wegatravel.partnermanager.web.rest;

import com.wegatravel.partnermanager.WegaTravelPartnerManagerApp;
import com.wegatravel.partnermanager.domain.AgenceVoyage;
import com.wegatravel.partnermanager.repository.AgenceVoyageRepository;
import com.wegatravel.partnermanager.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.wegatravel.partnermanager.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AgenceVoyageResource} REST controller.
 */
@SpringBootTest(classes = WegaTravelPartnerManagerApp.class)
public class AgenceVoyageResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_LIEU = "AAAAAAAAAA";
    private static final String UPDATED_LIEU = "BBBBBBBBBB";

    private static final String DEFAULT_VILLE = "AAAAAAAAAA";
    private static final String UPDATED_VILLE = "BBBBBBBBBB";

    @Autowired
    private AgenceVoyageRepository agenceVoyageRepository;

    @Mock
    private AgenceVoyageRepository agenceVoyageRepositoryMock;

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

    private MockMvc restAgenceVoyageMockMvc;

    private AgenceVoyage agenceVoyage;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgenceVoyageResource agenceVoyageResource = new AgenceVoyageResource(agenceVoyageRepository);
        this.restAgenceVoyageMockMvc = MockMvcBuilders.standaloneSetup(agenceVoyageResource)
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
    public static AgenceVoyage createEntity(EntityManager em) {
        AgenceVoyage agenceVoyage = new AgenceVoyage()
            .nom(DEFAULT_NOM)
            .lieu(DEFAULT_LIEU)
            .ville(DEFAULT_VILLE);
        return agenceVoyage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgenceVoyage createUpdatedEntity(EntityManager em) {
        AgenceVoyage agenceVoyage = new AgenceVoyage()
            .nom(UPDATED_NOM)
            .lieu(UPDATED_LIEU)
            .ville(UPDATED_VILLE);
        return agenceVoyage;
    }

    @BeforeEach
    public void initTest() {
        agenceVoyage = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgenceVoyage() throws Exception {
        int databaseSizeBeforeCreate = agenceVoyageRepository.findAll().size();

        // Create the AgenceVoyage
        restAgenceVoyageMockMvc.perform(post("/api/agence-voyages")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agenceVoyage)))
            .andExpect(status().isCreated());

        // Validate the AgenceVoyage in the database
        List<AgenceVoyage> agenceVoyageList = agenceVoyageRepository.findAll();
        assertThat(agenceVoyageList).hasSize(databaseSizeBeforeCreate + 1);
        AgenceVoyage testAgenceVoyage = agenceVoyageList.get(agenceVoyageList.size() - 1);
        assertThat(testAgenceVoyage.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testAgenceVoyage.getLieu()).isEqualTo(DEFAULT_LIEU);
        assertThat(testAgenceVoyage.getVille()).isEqualTo(DEFAULT_VILLE);
    }

    @Test
    @Transactional
    public void createAgenceVoyageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agenceVoyageRepository.findAll().size();

        // Create the AgenceVoyage with an existing ID
        agenceVoyage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgenceVoyageMockMvc.perform(post("/api/agence-voyages")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agenceVoyage)))
            .andExpect(status().isBadRequest());

        // Validate the AgenceVoyage in the database
        List<AgenceVoyage> agenceVoyageList = agenceVoyageRepository.findAll();
        assertThat(agenceVoyageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAgenceVoyages() throws Exception {
        // Initialize the database
        agenceVoyageRepository.saveAndFlush(agenceVoyage);

        // Get all the agenceVoyageList
        restAgenceVoyageMockMvc.perform(get("/api/agence-voyages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agenceVoyage.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].lieu").value(hasItem(DEFAULT_LIEU)))
            .andExpect(jsonPath("$.[*].ville").value(hasItem(DEFAULT_VILLE)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAgenceVoyagesWithEagerRelationshipsIsEnabled() throws Exception {
        AgenceVoyageResource agenceVoyageResource = new AgenceVoyageResource(agenceVoyageRepositoryMock);
        when(agenceVoyageRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAgenceVoyageMockMvc = MockMvcBuilders.standaloneSetup(agenceVoyageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAgenceVoyageMockMvc.perform(get("/api/agence-voyages?eagerload=true"))
        .andExpect(status().isOk());

        verify(agenceVoyageRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAgenceVoyagesWithEagerRelationshipsIsNotEnabled() throws Exception {
        AgenceVoyageResource agenceVoyageResource = new AgenceVoyageResource(agenceVoyageRepositoryMock);
            when(agenceVoyageRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAgenceVoyageMockMvc = MockMvcBuilders.standaloneSetup(agenceVoyageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAgenceVoyageMockMvc.perform(get("/api/agence-voyages?eagerload=true"))
        .andExpect(status().isOk());

            verify(agenceVoyageRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getAgenceVoyage() throws Exception {
        // Initialize the database
        agenceVoyageRepository.saveAndFlush(agenceVoyage);

        // Get the agenceVoyage
        restAgenceVoyageMockMvc.perform(get("/api/agence-voyages/{id}", agenceVoyage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(agenceVoyage.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.lieu").value(DEFAULT_LIEU))
            .andExpect(jsonPath("$.ville").value(DEFAULT_VILLE));
    }

    @Test
    @Transactional
    public void getNonExistingAgenceVoyage() throws Exception {
        // Get the agenceVoyage
        restAgenceVoyageMockMvc.perform(get("/api/agence-voyages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgenceVoyage() throws Exception {
        // Initialize the database
        agenceVoyageRepository.saveAndFlush(agenceVoyage);

        int databaseSizeBeforeUpdate = agenceVoyageRepository.findAll().size();

        // Update the agenceVoyage
        AgenceVoyage updatedAgenceVoyage = agenceVoyageRepository.findById(agenceVoyage.getId()).get();
        // Disconnect from session so that the updates on updatedAgenceVoyage are not directly saved in db
        em.detach(updatedAgenceVoyage);
        updatedAgenceVoyage
            .nom(UPDATED_NOM)
            .lieu(UPDATED_LIEU)
            .ville(UPDATED_VILLE);

        restAgenceVoyageMockMvc.perform(put("/api/agence-voyages")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgenceVoyage)))
            .andExpect(status().isOk());

        // Validate the AgenceVoyage in the database
        List<AgenceVoyage> agenceVoyageList = agenceVoyageRepository.findAll();
        assertThat(agenceVoyageList).hasSize(databaseSizeBeforeUpdate);
        AgenceVoyage testAgenceVoyage = agenceVoyageList.get(agenceVoyageList.size() - 1);
        assertThat(testAgenceVoyage.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testAgenceVoyage.getLieu()).isEqualTo(UPDATED_LIEU);
        assertThat(testAgenceVoyage.getVille()).isEqualTo(UPDATED_VILLE);
    }

    @Test
    @Transactional
    public void updateNonExistingAgenceVoyage() throws Exception {
        int databaseSizeBeforeUpdate = agenceVoyageRepository.findAll().size();

        // Create the AgenceVoyage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgenceVoyageMockMvc.perform(put("/api/agence-voyages")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agenceVoyage)))
            .andExpect(status().isBadRequest());

        // Validate the AgenceVoyage in the database
        List<AgenceVoyage> agenceVoyageList = agenceVoyageRepository.findAll();
        assertThat(agenceVoyageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgenceVoyage() throws Exception {
        // Initialize the database
        agenceVoyageRepository.saveAndFlush(agenceVoyage);

        int databaseSizeBeforeDelete = agenceVoyageRepository.findAll().size();

        // Delete the agenceVoyage
        restAgenceVoyageMockMvc.perform(delete("/api/agence-voyages/{id}", agenceVoyage.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AgenceVoyage> agenceVoyageList = agenceVoyageRepository.findAll();
        assertThat(agenceVoyageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
