package com.tour.controller;

import com.tour.dto.TourResponse;
import com.tour.service.TourService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    @GetMapping
    public List<TourResponse> getAllTours() {
        return tourService.getAllTours();
    }

    @GetMapping("/top")
    public List<TourResponse> getTopTours() {
        return tourService.getTopTours();
    }

    @GetMapping("/yachts")
    public List<TourResponse> getYachtTours() {
        return tourService.getToursByCategory("YACHT");
    }

    @GetMapping("/in-city")
    public List<TourResponse> getInCityTours() {
        return tourService.getToursByCategory("INCITY");
    }

    @GetMapping("/out-of-city")
    public List<TourResponse> getOutOfCityTours() {
        return tourService.getToursByCategory("OUTCITY");
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourResponse> getTourById(@PathVariable Long id) {
        return tourService.getTourById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
