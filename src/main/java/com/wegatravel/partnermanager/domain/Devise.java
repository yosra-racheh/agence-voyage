package com.wegatravel.partnermanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)

/**
 * A Devise.
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Devise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String code;

    @OneToMany(mappedBy = "devise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<EchangeDevise> echangedevises = new HashSet<>();

    //@ManyToMany(mappedBy = "devise")
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
   // @JsonIgnore
    private Set<AgenceVoyage> agencevoyages = new HashSet<>();

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

    public Devise nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCode() {
        return code;
    }

    public Devise code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Set<EchangeDevise> getEchangedevises() {
        return echangedevises;
    }

    public Devise echangedevises(Set<EchangeDevise> echangeDevises) {
        this.echangedevises = echangeDevises;
        return this;
    }

    public Devise addEchangedevise(EchangeDevise echangeDevise) {
        this.echangedevises.add(echangeDevise);
        echangeDevise.setDevise(this);
        return this;
    }

    public Devise removeEchangedevise(EchangeDevise echangeDevise) {
        this.echangedevises.remove(echangeDevise);
        echangeDevise.setDevise(null);
        return this;
    }

    public void setEchangedevises(Set<EchangeDevise> echangeDevises) {
        this.echangedevises = echangeDevises;
    }

    public Set<AgenceVoyage> getAgencevoyages() {
        return agencevoyages;
    }

    public Devise agencevoyages(Set<AgenceVoyage> agenceVoyages) {
        this.agencevoyages = agenceVoyages;
        return this;
    }

    public Devise addAgencevoyage(AgenceVoyage agenceVoyage) {
        this.agencevoyages.add(agenceVoyage);
        agenceVoyage.getDevises().add(this);
        return this;
    }

    public Devise removeAgencevoyage(AgenceVoyage agenceVoyage) {
        this.agencevoyages.remove(agenceVoyage);
        agenceVoyage.getDevises().remove(this);
        return this;
    }

    public void setAgencevoyages(Set<AgenceVoyage> agenceVoyages) {
        this.agencevoyages = agenceVoyages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Devise)) {
            return false;
        }
        return id != null && id.equals(((Devise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Devise{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", code='" + getCode() + "'" +
            "}";
    }
}
