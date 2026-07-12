package com.tour.config;

import com.tour.model.Tour;
import com.tour.repository.TourRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Configuration
public class DataInitializer {

    /**
     * Gallery + editorial metadata per experience, keyed by English title.
     * Re-applied to existing rows on startup so content edits here reach the database
     * without manual migration.
     */
    private record ExperienceMeta(List<String> images,
                                  String locationEn, String locationRu,
                                  String durationEn, String durationRu) {}

    private static final Map<String, ExperienceMeta> META = Map.ofEntries(
        Map.entry("Lusca VIP Yacht Tour", new ExperienceMeta(
            List.of("/images/tours/lusca-vip-yacht-tour/Yatch_Lusca.jpg", "/images/tours/lusca-vip-yacht-tour/Yatch_Lusca_2.jpg"),
            "Antalya Marina", "Марина Анталии",
            "4-5 Hours", "4-5 часов")),

        Map.entry("Brabus VIP Yacht Tour", new ExperienceMeta(
            List.of(
                "/images/tours/Brabus-vip-yacht-tour/IMG_3871.jpg",
                "/images/tours/Brabus-vip-yacht-tour/IMG_3872.jpg",
                "/images/tours/Brabus-vip-yacht-tour/IMG_3873.jpg",
                "/images/tours/Brabus-vip-yacht-tour/IMG_3875.jpg",
                "/images/tours/Brabus-vip-yacht-tour/ChatGPT Image 12 Tem 2026 19_33_31.png",
                "/images/tours/Brabus-vip-yacht-tour/ChatGPT Image 12 Tem 2026 19_45_53.png"),
            "Antalya Marina", "Марина Анталии",
            "4-5 Hours", "4-5 часов")),

        Map.entry("Kemer Group Yacht Tour", new ExperienceMeta(
            List.of("/images/tours/Kemer-Group-Yatch-Tour/ChatGPT Image 12 Tem 2026 20_11_36.png"),
            "Kemer Marina", "Марина Кемера",
            "Full Day", "Весь день")),

        Map.entry("Triple Thrill Adventure: Canyon, Safari, Rafting", new ExperienceMeta(
            List.of(
                "/images/tours/triple-thrill-adventure-canyon-safari-rafting/Tazı-kanyon.png",
                "/images/tours/triple-thrill-adventure-canyon-safari-rafting/rafting.jpg",
                "/images/tours/triple-thrill-adventure-canyon-safari-rafting/jepp-safari.png",
                "/images/tours/triple-thrill-adventure-canyon-safari-rafting/monster-jet.png"),
            "Köprülü & Tazı Canyon", "Каньоны Кёпрюлю и Тазы",
            "Full Day", "Весь день")),

        Map.entry("Green Canyon Boat Tour", new ExperienceMeta(
            List.of(
                "/images/tours/green-canyon/Green-Canyon-1.png",
                "/images/tours/green-canyon/ChatGPT Image 12 Tem 2026 20_02_51.png"),
            "Manavgat, Antalya", "Манавгат, Анталия",
            "Full Day", "Весь день")),

        Map.entry("Land of Legends Theme Park", new ExperienceMeta(
            List.of(
                "/images/tours/land-of-legends-theme-park/Tematikpark-2.png",
                "/images/tours/land-of-legends-theme-park/tematikpark-3.png",
                "/images/tours/land-of-legends-theme-park/tematikpark-7png.png",
                "/images/tours/land-of-legends-theme-park/tematikpark10.png",
                "/images/tours/land-of-legends-theme-park/temtatikpark-map.png",
                "/images/tours/land-of-legends-theme-park/tema-park.png"),
            "Belek, Antalya", "Белек, Анталия",
            "Full Day", "Весь день")),

        Map.entry("Antalya Aquarium Complex Experience", new ExperienceMeta(
            List.of(
                "/images/tours/antalya-aquarium-complex-experience/Akvaryum-tunel.png",
                "/images/tours/antalya-aquarium-complex-experience/Antalya-Akvaryum.jpg",
                "/images/tours/antalya-aquarium-complex-experience/davinci-balmumu.jpg",
                "/images/tours/antalya-aquarium-complex-experience/michael-balmumu.jpg",
                "/images/tours/antalya-aquarium-complex-experience/kobe-balmumu.jpg",
                "/images/tours/antalya-aquarium-complex-experience/Akvaryum-Karodası.png",
                "/images/tours/antalya-aquarium-complex-experience/Akvaryum-3.jpeg"),
            "Konyaaltı, Antalya", "Коньяалты, Анталия",
            "Half Day", "Полдня")),

        Map.entry("Istanbul History Tour", new ExperienceMeta(
            List.of(
                "/images/tours/istanbul-history-tour/Istanbul-HagiaSophia.jpg",
                "/images/tours/istanbul-history-tour/Istanbul-kızkulesi.jpg",
                "/images/tours/istanbul-history-tour/Istanbul-5.jpg",
                "/images/tours/istanbul-history-tour/Istanbul-3.jpg",
                "/images/tours/istanbul-history-tour/Istanbul-2.jpg"),
            "Istanbul", "Стамбул",
            "2 Days", "2 дня")),

        Map.entry("Pamukkale Hierapolis Day Trip", new ExperienceMeta(
            List.of(
                "/images/tours/pamukkale-hierapolis-day-trip/Pamukkale-real.png",
                "/images/tours/pamukkale-hierapolis-day-trip/Pamukkale-2.jpg",
                "/images/tours/pamukkale-hierapolis-day-trip/Pamukkale-3.jpg",
                "/images/tours/pamukkale-hierapolis-day-trip/Pamukkale-4.jpg",
                "/images/tours/pamukkale-hierapolis-day-trip/ChatGPT Image 12 Tem 2026 19_58_17.png"),
            "Pamukkale, Denizli", "Памуккале, Денизли",
            "Full Day", "Весь день")),

        Map.entry("Cappadocia Adventure & Balloons", new ExperienceMeta(
            List.of(
                "/images/tours/cappadocia-adventure-balloons/Kapadokya-2.jpg",
                "/images/tours/cappadocia-adventure-balloons/kapadokya-3.jpg",
                "/images/tours/cappadocia-adventure-balloons/kapadokya-4.jpg",
                "/images/tours/cappadocia-adventure-balloons/kapadokya-5.jpg",
                "/images/tours/cappadocia-adventure-balloons/kapadokya-6.jpg",
                "/images/tours/cappadocia-adventure-balloons/kapadokya-7.jpg",
                "/images/tours/cappadocia-adventure-balloons/kapadokya-8.jpg",
                "/images/tours/cappadocia-adventure-balloons/Kapadokya.jpg"),
            "Cappadocia", "Каппадокия",
            "2 Days", "2 дня"))
    );

    /**
     * Helper to build a Tour via setters (avoids @AllArgsConstructor arg-order issues).
     * Images come from {@link #META}; contactPhone stays null so the agency default applies.
     */
    private Tour t(String titleEn, String descEn,
                   String titleRu, String descRu,
                   String category, boolean top, List<String> items) {
        Tour tour = new Tour();
        tour.setTitleEn(titleEn);
        tour.setDescriptionEn(descEn);
        tour.setTitleRu(titleRu);
        tour.setDescriptionRu(descRu);
        tour.setCategory(category);
        tour.setSlug(slugify(titleEn));
        tour.setTopDestination(top);
        tour.setActive(true);
        tour.setIncludedItems(items);
        ExperienceMeta meta = META.get(titleEn);
        if (meta != null) {
            tour.setImageUrls(meta.images());
        }
        return tour;
    }

    private String slugify(String title) {
        return title.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }

    @Bean
    public CommandLineRunner initData(TourRepository repository) {
        return args -> {
                List<Tour> catalog = List.of(

                    // ═══════════════════════════════════════════
                    // YACHT — Single premium listing
                    // ═══════════════════════════════════════════
                    t("Lusca VIP Yacht Tour",
                      "Experience the pinnacle of Mediterranean luxury aboard the Lusca — a world-class VIP yacht. Enjoy complete privacy, gourmet dining prepared by an onboard chef, premium open bar, and crystal-clear swimming stops in secluded turquoise coves. Professional crew, snorkeling gear, and sunset champagne service included. An unforgettable day on the Turkish Riviera.",
                      "VIP Прогулка на Яхте Lusca",
                      "Испытайте вершину средиземноморской роскоши на борту Lusca — яхты VIP-класса мирового уровня. Полная конфиденциальность, изысканная кухня от бортового шеф-повара, премиальный открытый бар и остановки для купания в уединённых бирюзовых бухтах. Профессиональная команда, снаряжение для сноркелинга и шампанское на закате включены. Незабываемый день на Турецкой Ривьере.",
                      "YACHT", true,
                      List.of("VIP Captain & Crew", "Gourmet Lunch", "Premium Open Bar", "Snorkeling Equipment", "Sunset Champagne", "Fuel & Insurance")),

                    t("Brabus VIP Yacht Tour",
                      "Command the coastline aboard the Brabus — a high-performance luxury day yacht that pairs supercar DNA with open-sea freedom. Carve across the turquoise waters of the Turkish Riviera, drop anchor in hidden coves for swimming and snorkeling, and enjoy premium refreshments served by your private crew. For guests who want their day on the water to feel as thrilling as it is exclusive.",
                      "VIP Тур на Яхте Brabus",
                      "Покорите побережье на борту Brabus — высокопроизводительной люксовой яхты, соединившей ДНК суперкара со свободой открытого моря. Пронеситесь по бирюзовым водам Турецкой Ривьеры, бросьте якорь в укромных бухтах для купания и сноркелинга и насладитесь премиальными напитками от личной команды. Для гостей, которые хотят, чтобы день на воде был столь же захватывающим, сколь и эксклюзивным.",
                      "YACHT", true,
                      List.of("Private Captain & Crew", "Premium Refreshments", "Swimming & Snorkeling Stops", "Sound System On Board", "Fuel & Insurance")),

                    t("Kemer Group Yacht Tour",
                      "Set sail from Kemer on a spacious group yacht and spend the day among the most beautiful bays of the Turkish Riviera. Swim in crystal-clear waters beneath the Taurus Mountains, soak up the sun on deck, and enjoy a freshly prepared lunch on board. An easygoing, social way to experience the magic of the Mediterranean.",
                      "Групповой Тур на Яхте из Кемера",
                      "Отправляйтесь из Кемера на просторной яхте и проведите день среди красивейших бухт Турецкой Ривьеры. Купайтесь в кристально чистой воде у подножия Таврских гор, загорайте на палубе и наслаждайтесь свежеприготовленным обедом на борту. Лёгкий и дружеский способ ощутить магию Средиземноморья.",
                      "YACHT", false,
                      List.of("Lunch on Board", "Swimming Stops", "Professional Crew", "Round-Trip Transfer", "Insurance")),

                    // ═══════════════════════════════════════════
                    // INCITY — Antalya & immediate surroundings
                    // ═══════════════════════════════════════════
                    t("Green Canyon Boat Tour",
                      "Cruise the emerald waters of Green Canyon — Turkey's largest canyon reservoir, framed by the pine-covered peaks of the Taurus Mountains. Glide past dramatic cliffs on a comfortable boat, swim in refreshing spring-fed waters, and enjoy a lakeside lunch surrounded by pure mountain silence. A serene escape just beyond Antalya.",
                      "Прогулка на Катере по Грин-Каньону",
                      "Прогулка по изумрудным водам Грин-Каньона — крупнейшего каньонного водохранилища Турции в окружении сосновых вершин Таврских гор. Проплывите мимо величественных скал на комфортабельном катере, искупайтесь в освежающей родниковой воде и пообедайте на берегу в окружении горной тишины. Умиротворяющее путешествие совсем рядом с Анталией.",
                      "INCITY", false,
                      List.of("Boat Cruise", "Lunch", "Swimming Stops", "Round-Trip Transfer", "Professional Guide", "Insurance")),

                    t("Triple Thrill Adventure: Canyon, Safari, Rafting",
                      "Combine three heart-pounding adventures into one epic day. Start with white-water rafting on the roaring Köprüçay River, continue with an off-road jeep safari through the rugged Taurus Mountains, and finish with a breathtaking trek along the cliffs of Tazi Canyon. All safety equipment, professional guides, lunch, and round-trip hotel transfer included.",
                      "Тройное приключение: Каньон, Сафари, Рафтинг",
                      "Три захватывающих приключения в одном эпическом дне. Рафтинг по бурным водам реки Кёпрючай, джип-сафари по суровым Таврским горам и захватывающий дух поход вдоль скал каньона Тази. Всё снаряжение, профессиональные гиды, обед и трансфер из отеля включены.",
                      "INCITY", true,
                      List.of("Rafting Equipment", "Jeep Safari", "Canyon Trek", "Professional Guide", "Lunch", "Round-Trip Transfer", "Insurance")),

                    t("Land of Legends Theme Park",
                      "A full day at the kingdom of thrills and wonder — Turkey's largest entertainment complex. Ride world-class roller coasters, cool off in the massive waterpark with over 40 slides, watch a spectacular dolphin show, and explore themed adventure zones. Perfect for families and adrenaline seekers alike. All entry tickets and hotel transfer included.",
                      "Тематический Парк Земля Легенд",
                      "Полный день в королевстве восторга и чудес — крупнейшем развлекательном комплексе Турции. Аттракционы мирового класса, огромный аквапарк с более чем 40 горками, захватывающее шоу дельфинов и тематические зоны приключений. Идеально для семей и любителей адреналина. Все входные билеты и трансфер включены.",
                      "INCITY", true,
                      List.of("All Entry Tickets", "Waterpark Access", "Round-Trip Transfer")),

                    t("Antalya Aquarium Complex Experience",
                      "Discover a world of wonder at the Antalya Aquarium Complex — one of the planet's largest tunnel aquariums. Walk through 131 meters of underwater tunnel surrounded by sharks, rays, and tropical marine life. Then explore the legendary DaVinci Wax Museum with lifelike figures of Kobe Bryant, Michael Jackson, and Leonardo da Vinci. Finish with a magical visit to the Snow Room at -5°C. An all-in-one entertainment experience.",
                      "Комплекс Аквариума Анталии",
                      "Откройте мир чудес в Комплексе Аквариума Анталии — одном из крупнейших туннельных аквариумов планеты. Пройдите 131 метр подводного туннеля в окружении акул, скатов и тропических обитателей. Затем исследуйте легендарный Музей восковых фигур Да Винчи с реалистичными фигурами Коби Брайанта, Майкла Джексона и Леонардо да Винчи. Завершите посещение волшебной Снежной комнатой при -5°C. Всё в одном месте.",
                      "INCITY", false,
                      List.of("Aquarium Entry", "Wax Museum Entry", "Snow Room Access", "Round-Trip Transfer")),

                    // ═══════════════════════════════════════════
                    // OUTCITY — Grand journeys beyond Antalya
                    // ═══════════════════════════════════════════
                    t("Istanbul History Tour",
                      "Journey to the city where East meets West on this grand Istanbul excursion. Visit the legendary Hagia Sophia, marvel at the Blue Mosque, explore the opulent Topkapi Palace, and cruise the Bosphorus strait separating two continents. Browse the vibrant Grand Bazaar and savor authentic Turkish cuisine. A journey through 2,500 years of imperial history.",
                      "Исторический тур в Стамбул",
                      "Отправьтесь в город, где Восток встречается с Западом. Посетите легендарный Собор Святой Софии, полюбуйтесь Голубой мечетью, исследуйте роскошный дворец Топкапы и совершите круиз по Босфору, разделяющему два континента. Загляните на оживлённый Гранд-Базар и насладитесь аутентичной турецкой кухней. Путешествие сквозь 2 500 лет имперской истории.",
                      "OUTCITY", true,
                      List.of("Round-Trip Flight", "Hotel (1 Night)", "Breakfast & Lunch", "All Entry Tickets", "Licensed Guide", "Bosphorus Cruise")),

                    t("Pamukkale Hierapolis Day Trip",
                      "Journey to the UNESCO World Heritage Site of Pamukkale — the breathtaking Cotton Castle of cascading white travertine terraces and warm thermal pools. Walk barefoot on the ancient calcium formations, swim in Cleopatra's thermal pool, and explore the remarkably preserved Greco-Roman city of Hierapolis with its grand theatre and sacred necropolis. Breakfast, lunch, and all entry fees included.",
                      "Поездка в Памуккале — Иераполис",
                      "Отправьтесь к объекту Всемирного наследия ЮНЕСКО Памуккале — захватывающему «Хлопковому замку» из каскадных белых травертиновых террас и тёплых термальных бассейнов. Пройдитесь босиком по древним кальциевым образованиям, искупайтесь в термальном бассейне Клеопатры и исследуйте прекрасно сохранившийся греко-римский город Иераполис с его величественным театром и священным некрополем.",
                      "OUTCITY", true,
                      List.of("Breakfast", "Lunch", "All Entry Tickets", "Cleopatra's Pool", "Round-Trip Transfer", "Licensed Guide")),

                    t("Cappadocia Adventure & Balloons",
                      "Embark on an unforgettable two-day journey to the magical land of Cappadocia. Stay in an authentic cave hotel carved into the volcanic rock, explore underground cities built millennia ago, visit ancient Byzantine cave churches, and optionally soar above the iconic fairy chimneys in a hot air balloon at sunrise. All meals, accommodation, and professional guide included.",
                      "Приключения и воздушные шары в Каппадокии",
                      "Отправьтесь в незабываемое двухдневное путешествие в волшебную Каппадокию. Остановитесь в аутентичном пещерном отеле, исследуйте подземные города, посетите древние византийские пещерные церкви и по желанию поднимитесь над знаменитыми каменными столбами на воздушном шаре на рассвете. Все приёмы пищи, проживание и профессиональный гид включены.",
                      "OUTCITY", true,
                      List.of("Cave Hotel (1 Night)", "Breakfast & Dinner", "All Entry Tickets", "Round-Trip Transfer", "Licensed Guide"))
                );

                // Insert catalogue entries missing from the database (matched by
                // English title) so tours added here also reach an existing DB,
                // not only a freshly created one.
                Set<String> existingTitles = repository.findAll().stream()
                        .map(Tour::getTitleEn)
                        .collect(Collectors.toSet());
                catalog.stream()
                        .filter(tour -> !existingTitles.contains(tour.getTitleEn()))
                        .forEach(repository::save);

                syncExperienceMeta(repository);
        };
    }

    /** Re-applies gallery and editorial metadata to existing rows on every startup. */
    private void syncExperienceMeta(TourRepository repository) {
        repository.findAll().forEach(tour -> {
            ExperienceMeta meta = META.get(tour.getTitleEn());
            if (meta == null) {
                return;
            }
            tour.setImageUrls(meta.images());
            tour.setLocationEn(meta.locationEn());
            tour.setLocationRu(meta.locationRu());
            tour.setDurationEn(meta.durationEn());
            tour.setDurationRu(meta.durationRu());
            repository.save(tour);
        });
    }
}
