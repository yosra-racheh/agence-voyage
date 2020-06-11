package com.wegatravel.partnermanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
/**
 * A AgenceVoyage.
 */
@Entity
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)

@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AgenceVoyage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String lieu;

    private String ville;

    @OneToMany(mappedBy = "agencevoyage")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reservation> reservations = new HashSet<>();

    @ManyToOne
    //@JsonIgnoreProperties("agenceVoyages")
    private Commission commission;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)

    @JoinTable(name = "agence_voyage_devise",
               joinColumns = @JoinColumn(name = "agence_voyage_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "devise_id", referencedColumnName = "id"))

    private Set<Devise> devises = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public AgenceVoyage nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLieu() {
        return lieu;
    }

    public AgenceVoyage lieu(String lieu) {
        this.lieu = lieu;
        return this;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getVille() {
        return ville;
    }

    public AgenceVoyage ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public AgenceVoyage reservations(Set<Reservation> reservations) {
        this.reservations = reservations;
        return this;
    }

    public AgenceVoyage addReservation(Reservation reservation) {
        this.reservations.add(reservation);
        reservation.setAgencevoyage(this);
        return this;
    }

    public AgenceVoyage removeReservation(Reservation reservation) {
        this.reservations.remove(reservation);
        reservation.setAgencevoyage(null);
        return this;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

    public Commission getCommission() {
        return commission;
    }

    public AgenceVoyage commission(Commission commission) {
        this.commission = commission;
        return this;
    }

    public void setCommission(Commission commission) {
        this.commission = commission;
    }

    public Set<Devise> getDevises() {
        return devises;
    }

    public AgenceVoyage devises(Set<Devise> devises) {
        this.devises = devises;
        return this;
    }

    public AgenceVoyage addDevise(Devise devise) {
        this.devises.add(devise);
        devise.getAgencevoyages().add(this);
        return this;
    }

    public AgenceVoyage removeDevise(Devise devise) {
        this.devises.remove(devise);
        devise.getAgencevoyages().remove(this);
        return this;
    }

    public void setDevises(Set<Devise> devises) {
        this.devises = devises;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AgenceVoyage)) {
            return false;
        }
        return id != null && id.equals(((AgenceVoyage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "AgenceVoyage{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", lieu='" + getLieu() + "'" +
            ", ville='" + getVille() + "'" +
            "}";
    }
}
