package com.wegatravel.partnermanager.repository;

import com.wegatravel.partnermanager.domain.EchangeDevise;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EchangeDevise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EchangeDeviseRepository extends JpaRepository<EchangeDevise, Long> {

}
