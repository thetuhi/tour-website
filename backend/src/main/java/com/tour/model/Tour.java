package com.tour.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
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

    private String category;

    // ── Editorial metadata ───────────────────────────────
    private String locationEn;

    private String locationRu;

    private String durationEn;

    private String durationRu;

    // ── Lead routing: WhatsApp number of the assigned representative;
    //    the agency default is used when null ─────────────
    private String contactPhone;

    @Column(unique = true)
    private String slug;

    private boolean isTopDestination;

    private Boolean active = true;

    private Integer sortOrder = 0;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @ElementCollection
    private List<String> includedItems;

    @PrePersist
    void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
        if (active == null) {
            active = true;
        }
        if (sortOrder == null) {
            sortOrder = 0;
        }
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
        if (active == null) {
            active = true;
        }
        if (sortOrder == null) {
            sortOrder = 0;
        }
    }
}
