package com.wegatravel.partnermanager.web.rest;

import com.wegatravel.partnermanager.WegaTravelPartnerManagerApp;
import com.wegatravel.partnermanager.domain.Reservation;
import com.wegatravel.partnermanager.repository.ReservationRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.wegatravel.partnermanager.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ReservationResource} REST controller.
 */
@SpringBootTest(classes = WegaTravelPartnerManagerApp.class)
public class ReservationResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Float DEFAULT_MONTANT = 1F;
    private static final Float UPDATED_MONTANT = 2F;

    @Autowired
    private ReservationRepository reservationRepository;

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

    private MockMvc restReservationMockMvc;

    private Reservation reservation;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReservationResource reservationResource = new ReservationResource(reservationRepository);
        this.restReservationMockMvc = MockMvcBuilders.standaloneSetup(reservationResource)
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
    public static Reservation createEntity(EntityManager em) {
        Reservation reservation = new Reservation()
            .date(DEFAULT_DATE)
            .montant(DEFAULT_MONTANT);
        return reservation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reservation createUpdatedEntity(EntityManager em) {
        Reservation reservation = new Reservation()
            .date(UPDATED_DATE)
            .montant(UPDATED_MONTANT);
        return reservation;
    }

    @BeforeEach
    public void initTest() {
        reservation = createEntity(em);
    }

    @Test
    @Transactional
    public void createReservation() throws Exception {
        int databaseSizeBeforeCreate = reservationRepository.findAll().size();

        // Create the Reservation
        restReservationMockMvc.perform(post("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isCreated());

        // Validate the Reservation in the database
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeCreate + 1);
        Reservation testReservation = reservationList.get(reservationList.size() - 1);
        assertThat(testReservation.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testReservation.getMontant()).isEqualTo(DEFAULT_MONTANT);
    }

    @Test
    @Transactional
    public void createReservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reservationRepository.findAll().size();

        // Create the Reservation with an existing ID
        reservation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReservationMockMvc.perform(post("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isBadRequest());

        // Validate the Reservation in the database
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReservations() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get all the reservationList
        restReservationMockMvc.perform(get("/api/reservations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reservation.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getReservation() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        // Get the reservation
        restReservationMockMvc.perform(get("/api/reservations/{id}", reservation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(reservation.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingReservation() throws Exception {
        // Get the reservation
        restReservationMockMvc.perform(get("/api/reservations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReservation() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        int databaseSizeBeforeUpdate = reservationRepository.findAll().size();

        // Update the reservation
        Reservation updatedReservation = reservationRepository.findById(reservation.getId()).get();
        // Disconnect from session so that the updates on updatedReservation are not directly saved in db
        em.detach(updatedReservation);
        updatedReservation
            .date(UPDATED_DATE)
            .montant(UPDATED_MONTANT);

        restReservationMockMvc.perform(put("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReservation)))
            .andExpect(status().isOk());

        // Validate the Reservation in the database
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeUpdate);
        Reservation testReservation = reservationList.get(reservationList.size() - 1);
        assertThat(testReservation.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testReservation.getMontant()).isEqualTo(UPDATED_MONTANT);
    }

    @Test
    @Transactional
    public void updateNonExistingReservation() throws Exception {
        int databaseSizeBeforeUpdate = reservationRepository.findAll().size();

        // Create the Reservation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReservationMockMvc.perform(put("/api/reservations")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(reservation)))
            .andExpect(status().isBadRequest());

        // Validate the Reservation in the database
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReservation() throws Exception {
        // Initialize the database
        reservationRepository.saveAndFlush(reservation);

        int databaseSizeBeforeDelete = reservationRepository.findAll().size();

        // Delete the reservation
        restReservationMockMvc.perform(delete("/api/reservations/{id}", reservation.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reservation> reservationList = reservationRepository.findAll();
        assertThat(reservationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
