package com.tour.repository;

import com.tour.model.Tour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    List<Tour> findByIsTopDestinationTrue();
    List<Tour> findByCategoryIgnoreCase(String category);
}
