package com.wegatravel.partnermanager.web.rest;

import com.wegatravel.partnermanager.WegaTravelPartnerManagerApp;
import com.wegatravel.partnermanager.domain.Commission;
import com.wegatravel.partnermanager.repository.CommissionRepository;
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
 * Integration tests for the {@link CommissionResource} REST controller.
 */
@SpringBootTest(classes = WegaTravelPartnerManagerApp.class)
public class CommissionResourceIT {

    private static final String DEFAULT_TAUX = "AAAAAAAAAA";
    private static final String UPDATED_TAUX = "BBBBBBBBBB";

    @Autowired
    private CommissionRepository commissionRepository;

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

    private MockMvc restCommissionMockMvc;

    private Commission commission;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommissionResource commissionResource = new CommissionResource(commissionRepository);
        this.restCommissionMockMvc = MockMvcBuilders.standaloneSetup(commissionResource)
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
    public static Commission createEntity(EntityManager em) {
        Commission commission = new Commission()
            .taux(DEFAULT_TAUX);
        return commission;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commission createUpdatedEntity(EntityManager em) {
        Commission commission = new Commission()
            .taux(UPDATED_TAUX);
        return commission;
    }

    @BeforeEach
    public void initTest() {
        commission = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommission() throws Exception {
        int databaseSizeBeforeCreate = commissionRepository.findAll().size();

        // Create the Commission
        restCommissionMockMvc.perform(post("/api/commissions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commission)))
            .andExpect(status().isCreated());

        // Validate the Commission in the database
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeCreate + 1);
        Commission testCommission = commissionList.get(commissionList.size() - 1);
        assertThat(testCommission.getTaux()).isEqualTo(DEFAULT_TAUX);
    }

    @Test
    @Transactional
    public void createCommissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commissionRepository.findAll().size();

        // Create the Commission with an existing ID
        commission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommissionMockMvc.perform(post("/api/commissions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commission)))
            .andExpect(status().isBadRequest());

        // Validate the Commission in the database
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCommissions() throws Exception {
        // Initialize the database
        commissionRepository.saveAndFlush(commission);

        // Get all the commissionList
        restCommissionMockMvc.perform(get("/api/commissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commission.getId().intValue())))
            .andExpect(jsonPath("$.[*].taux").value(hasItem(DEFAULT_TAUX)));
    }
    
    @Test
    @Transactional
    public void getCommission() throws Exception {
        // Initialize the database
        commissionRepository.saveAndFlush(commission);

        // Get the commission
        restCommissionMockMvc.perform(get("/api/commissions/{id}", commission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commission.getId().intValue()))
            .andExpect(jsonPath("$.taux").value(DEFAULT_TAUX));
    }

    @Test
    @Transactional
    public void getNonExistingCommission() throws Exception {
        // Get the commission
        restCommissionMockMvc.perform(get("/api/commissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommission() throws Exception {
        // Initialize the database
        commissionRepository.saveAndFlush(commission);

        int databaseSizeBeforeUpdate = commissionRepository.findAll().size();

        // Update the commission
        Commission updatedCommission = commissionRepository.findById(commission.getId()).get();
        // Disconnect from session so that the updates on updatedCommission are not directly saved in db
        em.detach(updatedCommission);
        updatedCommission
            .taux(UPDATED_TAUX);

        restCommissionMockMvc.perform(put("/api/commissions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommission)))
            .andExpect(status().isOk());

        // Validate the Commission in the database
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeUpdate);
        Commission testCommission = commissionList.get(commissionList.size() - 1);
        assertThat(testCommission.getTaux()).isEqualTo(UPDATED_TAUX);
    }

    @Test
    @Transactional
    public void updateNonExistingCommission() throws Exception {
        int databaseSizeBeforeUpdate = commissionRepository.findAll().size();

        // Create the Commission

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommissionMockMvc.perform(put("/api/commissions")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(commission)))
            .andExpect(status().isBadRequest());

        // Validate the Commission in the database
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommission() throws Exception {
        // Initialize the database
        commissionRepository.saveAndFlush(commission);

        int databaseSizeBeforeDelete = commissionRepository.findAll().size();

        // Delete the commission
        restCommissionMockMvc.perform(delete("/api/commissions/{id}", commission.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
