package com.wegatravel.partnermanager.repository;

import com.wegatravel.partnermanager.domain.Devise;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Devise entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeviseRepository extends JpaRepository<Devise, Long> {

}
