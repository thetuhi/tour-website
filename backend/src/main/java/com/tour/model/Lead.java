package com.tour.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * A contact intent captured when a visitor starts the WhatsApp flow.
 * Deliberately minimal — not a CRM; just enough for future lead tracking.
 */
@Entity
@Table(name = "leads")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long tourId;

    /** Denormalized for readability when scanning leads without joins. */
    private String tourTitle;

    private String language;

    /** Where the contact action started, e.g. "tour-detail", "yacht-listing". */
    private String source;

    /** Yacht time slot when applicable: "day" or "sunset". */
    private String timeSlot;

    private LocalDateTime createdAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
