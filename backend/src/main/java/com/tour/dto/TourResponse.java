package com.tour.dto;

import com.tour.model.Tour;

import java.util.List;

/**
 * Public catalog representation of a Tour.
 * Internal fields (active, sortOrder, timestamps) are intentionally not exposed.
 * contactPhone is always resolved: the tour's assigned representative, or the agency default.
 */
public record TourResponse(
        Long id,
        String titleEn,
        String descriptionEn,
        String titleRu,
        String descriptionRu,
        String locationEn,
        String locationRu,
        String durationEn,
        String durationRu,
        List<String> imageUrls,
        String category,
        String slug,
        List<String> includedItems,
        String contactPhone
) {
    public static TourResponse from(Tour tour, String defaultContactPhone) {
        String phone = (tour.getContactPhone() != null && !tour.getContactPhone().isBlank())
                ? tour.getContactPhone()
                : defaultContactPhone;
        return new TourResponse(
                tour.getId(),
                tour.getTitleEn(),
                tour.getDescriptionEn(),
                tour.getTitleRu(),
                tour.getDescriptionRu(),
                tour.getLocationEn(),
                tour.getLocationRu(),
                tour.getDurationEn(),
                tour.getDurationRu(),
                tour.getImageUrls(),
                tour.getCategory(),
                tour.getSlug(),
                tour.getIncludedItems(),
                phone
        );
    }
}
