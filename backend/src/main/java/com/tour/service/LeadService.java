package com.tour.service;

import com.tour.dto.LeadRequest;
import com.tour.model.Lead;
import com.tour.repository.LeadRepository;
import com.tour.repository.TourRepository;
import org.springframework.stereotype.Service;

@Service
public class LeadService {

    private final LeadRepository leadRepository;
    private final TourRepository tourRepository;

    public LeadService(LeadRepository leadRepository, TourRepository tourRepository) {
        this.leadRepository = leadRepository;
        this.tourRepository = tourRepository;
    }

    public void recordLead(LeadRequest request) {
        Lead lead = new Lead();
        lead.setTourId(request.tourId());
        if (request.tourId() != null) {
            tourRepository.findById(request.tourId())
                    .ifPresent(tour -> lead.setTourTitle(tour.getTitleEn()));
        }
        lead.setLanguage(truncate(request.language(), 10));
        lead.setSource(truncate(request.source(), 50));
        lead.setTimeSlot(truncate(request.timeSlot(), 20));
        leadRepository.save(lead);
    }

    /** Public endpoint: keep arbitrary input within column limits. */
    private String truncate(String value, int maxLength) {
        if (value == null) {
            return null;
        }
        return value.length() <= maxLength ? value : value.substring(0, maxLength);
    }
}
