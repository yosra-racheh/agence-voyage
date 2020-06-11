package com.wegatravel.partnermanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A EchangeDevise.
 */
@Entity
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)

public class EchangeDevise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "code_1")
    private String code1;
    @Column(name = "code_2")

    private String code2;
    private Float tauxchange;

    @ManyToOne
    //@JsonIgnoreProperties("echangedevises")
    private Devise devise;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode1() {
        return code1;
    }

    public EchangeDevise code1(String code1) {
        this.code1 = code1;
        return this;
    }

    public void setCode1(String code1) {
        this.code1 = code1;
    }

    public String getCode2() {
        return code2;
    }

    public EchangeDevise code2(String code2) {
        this.code2 = code2;
        return this;
    }

    public void setCode2(String code2) {
        this.code2 = code2;
    }

    public Float getTauxchange() {
        return tauxchange;
    }

    public EchangeDevise tauxchange(Float tauxchange) {
        this.tauxchange = tauxchange;
        return this;
    }

    public void setTauxchange(Float tauxchange) {
        this.tauxchange = tauxchange;
    }

    public Devise getDevise() {
        return devise;
    }

    public EchangeDevise devise(Devise devise) {
        this.devise = devise;
        return this;
    }

    public void setDevise(Devise devise) {
        this.devise = devise;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EchangeDevise)) {
            return false;
        }
        return id != null && id.equals(((EchangeDevise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EchangeDevise{" +
            "id=" + getId() +
            ", code1='" + getCode1() + "'" +
            ", code2='" + getCode2() + "'" +
            ", tauxchange=" + getTauxchange() +
            "}";
    }
}
