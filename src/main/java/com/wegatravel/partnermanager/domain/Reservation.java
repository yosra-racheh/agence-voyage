package com.wegatravel.partnermanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Reservation.
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)

public class Reservation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private Float montant;

    @ManyToOne
  //  @JsonIgnoreProperties("reservations")
    private AgenceVoyage agencevoyage;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Reservation date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Float getMontant() {
        return montant;
    }

    public Reservation montant(Float montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(Float montant) {
        this.montant = montant;
    }

    public AgenceVoyage getAgencevoyage() {
        return agencevoyage;
    }

    public Reservation agencevoyage(AgenceVoyage agenceVoyage) {
        this.agencevoyage = agenceVoyage;
        return this;
    }

    public void setAgencevoyage(AgenceVoyage agenceVoyage) {
        this.agencevoyage = agenceVoyage;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reservation)) {
            return false;
        }
        return id != null && id.equals(((Reservation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Reservation{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", montant=" + getMontant() +
            "}";
    }
}
