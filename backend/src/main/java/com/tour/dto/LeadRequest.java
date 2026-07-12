package com.tour.dto;

/** Payload sent by the frontend when a visitor starts the WhatsApp contact flow. */
public record LeadRequest(
        Long tourId,
        String language,
        String source,
        String timeSlot
) {
}
