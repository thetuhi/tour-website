package com.tour.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ── English localization ─────────────────────────────
    private String titleEn;

    @Column(columnDefinition = "TEXT")
    private String descriptionEn;

    // ── Russian localization ─────────────────────────────
    private String titleRu;

    @Column(columnDefinition = "TEXT")
    private String descriptionRu;

    // ── Multi-image support ──────────────────────────────
    @ElementCollection
    @CollectionTable(name = "tour_images", joinColumns = @JoinColumn(name = "tour_id"))
    @Column(name = "image_url")
    private List<String> imageUrls;

    /**
     * Category determines the 3-tier homepage placement.
     * Accepted values: YACHT, INCITY, OUTCITY
     */
    private String category;

    private boolean isTopDestination;

    @ElementCollection
    private List<String> includedItems;
}
