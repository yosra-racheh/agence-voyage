package com.wegatravel.partnermanager.repository;

import com.wegatravel.partnermanager.domain.AgenceVoyage;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the AgenceVoyage entity.
 */
@Repository
public interface AgenceVoyageRepository extends JpaRepository<AgenceVoyage, Long> {

    @Query(value = "select distinct agenceVoyage from AgenceVoyage agenceVoyage left join fetch agenceVoyage.devises",
        countQuery = "select count(distinct agenceVoyage) from AgenceVoyage agenceVoyage")
    Page<AgenceVoyage> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct agenceVoyage from AgenceVoyage agenceVoyage left join fetch agenceVoyage.devises")
    List<AgenceVoyage> findAllWithEagerRelationships();

    @Query("select agenceVoyage from AgenceVoyage agenceVoyage left join fetch agenceVoyage.devises where agenceVoyage.id =:id")
    Optional<AgenceVoyage> findOneWithEagerRelationships(@Param("id") Long id);

}
