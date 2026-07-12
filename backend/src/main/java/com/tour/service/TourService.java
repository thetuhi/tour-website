package com.tour.service;

import com.tour.dto.TourResponse;
import com.tour.model.Tour;
import com.tour.repository.TourRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class TourService {

    private final TourRepository tourRepository;
    private final String defaultContactPhone;

    public TourService(TourRepository tourRepository,
                       @Value("${app.default-contact-phone}") String defaultContactPhone) {
        this.tourRepository = tourRepository;
        this.defaultContactPhone = defaultContactPhone;
    }

    public List<TourResponse> getAllTours() {
        return toPublicCatalog(tourRepository.findAll());
    }

    public List<TourResponse> getTopTours() {
        return toPublicCatalog(tourRepository.findByIsTopDestinationTrue());
    }

    public List<TourResponse> getToursByCategory(String category) {
        return toPublicCatalog(tourRepository.findByCategoryIgnoreCase(category));
    }

    public Optional<TourResponse> getTourById(Long id) {
        return tourRepository.findById(id)
                .filter(this::isActive)
                .map(tour -> TourResponse.from(tour, defaultContactPhone));
    }

    /** Public catalog: only active tours, ordered by sortOrder then id. */
    private List<TourResponse> toPublicCatalog(List<Tour> tours) {
        return tours.stream()
                .filter(this::isActive)
                .sorted(Comparator
                        .comparing(Tour::getSortOrder, Comparator.nullsLast(Comparator.naturalOrder()))
                        .thenComparing(Tour::getId))
                .map(tour -> TourResponse.from(tour, defaultContactPhone))
                .toList();
    }

    private boolean isActive(Tour tour) {
        return !Boolean.FALSE.equals(tour.getActive());
    }
}
