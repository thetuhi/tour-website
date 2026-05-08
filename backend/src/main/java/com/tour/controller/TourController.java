package com.tour.controller;

import com.tour.model.Tour;
import com.tour.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    @Autowired
    private TourRepository tourRepository;

    /** GET /api/tours — every tour */
    @GetMapping
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    /** GET /api/tours/top — flagged as top destinations */
    @GetMapping("/top")
    public List<Tour> getTopTours() {
        return tourRepository.findByIsTopDestinationTrue();
    }

    // ── Three-tier endpoints (category based) ────────────

    /** GET /api/tours/yachts — premium yacht charters */
    @GetMapping("/yachts")
    public List<Tour> getYachtTours() {
        return tourRepository.findByCategoryIgnoreCase("YACHT");
    }

    /** GET /api/tours/in-city — Antalya in-city tours */
    @GetMapping("/in-city")
    public List<Tour> getInCityTours() {
        return tourRepository.findByCategoryIgnoreCase("INCITY");
    }

    /** GET /api/tours/out-of-city — excursions beyond Antalya */
    @GetMapping("/out-of-city")
    public List<Tour> getOutOfCityTours() {
        return tourRepository.findByCategoryIgnoreCase("OUTCITY");
    }

    /** GET /api/tours/{id} — single tour by ID */
    @GetMapping("/{id}")
    public ResponseEntity<Tour> getTourById(@PathVariable Long id) {
        return tourRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
