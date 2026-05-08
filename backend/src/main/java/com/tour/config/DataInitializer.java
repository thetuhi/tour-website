package com.tour.config;

import com.tour.model.Tour;
import com.tour.repository.TourRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class DataInitializer {

    /**
     * Helper to build a Tour via setters (avoids @AllArgsConstructor arg-order issues).
     */
    private Tour t(String titleEn, String descEn,
                   String titleRu, String descRu,
                   List<String> imageUrls, String category,
                   boolean top, List<String> items) {
        Tour tour = new Tour();
        tour.setTitleEn(titleEn);
        tour.setDescriptionEn(descEn);
        tour.setTitleRu(titleRu);
        tour.setDescriptionRu(descRu);
        tour.setImageUrls(imageUrls);
        tour.setCategory(category);
        tour.setTopDestination(top);
        tour.setIncludedItems(items);
        return tour;
    }

    @Bean
    public CommandLineRunner initData(TourRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                List<Tour> tours = Arrays.asList(

                    // ═══════════════════════════════════════════
                    // YACHT — Single premium listing
                    // ═══════════════════════════════════════════
                    t("Lusca VIP Yacht Tour",
                      "Experience the pinnacle of Mediterranean luxury aboard the Lusca — a world-class VIP yacht. Enjoy complete privacy, gourmet dining prepared by an onboard chef, premium open bar, and crystal-clear swimming stops in secluded turquoise coves. Professional crew, snorkeling gear, and sunset champagne service included. An unforgettable day on the Turkish Riviera.",
                      "VIP Прогулка на Яхте Lusca",
                      "Испытайте вершину средиземноморской роскоши на борту Lusca — яхты VIP-класса мирового уровня. Полная конфиденциальность, изысканная кухня от бортового шеф-повара, премиальный открытый бар и остановки для купания в уединённых бирюзовых бухтах. Профессиональная команда, снаряжение для сноркелинга и шампанское на закате включены. Незабываемый день на Турецкой Ривьере.",
                      Arrays.asList("/images/Yatch_Lusca.jpg", "/images/Yatch_Lusca_2.jpg"),
                      "YACHT", true,
                      Arrays.asList("VIP Captain & Crew", "Gourmet Lunch", "Premium Open Bar", "Snorkeling Equipment", "Sunset Champagne", "Fuel & Insurance")),

                    // ═══════════════════════════════════════════
                    // INCITY — Antalya & immediate surroundings
                    // ═══════════════════════════════════════════
                    t("Triple Thrill Adventure: Canyon, Safari, Rafting",
                      "Combine three heart-pounding adventures into one epic day. Start with white-water rafting on the roaring Köprüçay River, continue with an off-road jeep safari through the rugged Taurus Mountains, and finish with a breathtaking trek along the cliffs of Tazi Canyon. All safety equipment, professional guides, lunch, and round-trip hotel transfer included.",
                      "Тройное приключение: Каньон, Сафари, Рафтинг",
                      "Три захватывающих приключения в одном эпическом дне. Рафтинг по бурным водам реки Кёпрючай, джип-сафари по суровым Таврским горам и захватывающий дух поход вдоль скал каньона Тази. Всё снаряжение, профессиональные гиды, обед и трансфер из отеля включены.",
                      Collections.singletonList("/images/Tazi-Canyon.png"),
                      "INCITY", true,
                      Arrays.asList("Rafting Equipment", "Jeep Safari", "Canyon Trek", "Professional Guide", "Lunch", "Round-Trip Transfer", "Insurance")),

                    t("Land of Legends Theme Park",
                      "A full day at the kingdom of thrills and wonder — Turkey's largest entertainment complex. Ride world-class roller coasters, cool off in the massive waterpark with over 40 slides, watch a spectacular dolphin show, and explore themed adventure zones. Perfect for families and adrenaline seekers alike. All entry tickets and hotel transfer included.",
                      "Тематический Парк Земля Легенд",
                      "Полный день в королевстве восторга и чудес — крупнейшем развлекательном комплексе Турции. Аттракционы мирового класса, огромный аквапарк с более чем 40 горками, захватывающее шоу дельфинов и тематические зоны приключений. Идеально для семей и любителей адреналина. Все входные билеты и трансфер включены.",
                      Collections.singletonList("/images/tema-park.png"),
                      "INCITY", true,
                      Arrays.asList("All Entry Tickets", "Waterpark Access", "Round-Trip Transfer")),

                    t("Antalya Aquarium Complex Experience",
                      "Discover a world of wonder at the Antalya Aquarium Complex — one of the planet's largest tunnel aquariums. Walk through 131 meters of underwater tunnel surrounded by sharks, rays, and tropical marine life. Then explore the legendary DaVinci Wax Museum with lifelike figures of Kobe Bryant, Michael Jackson, and Leonardo da Vinci. Finish with a magical visit to the Snow Room at -5°C. An all-in-one entertainment experience.",
                      "Комплекс Аквариума Анталии",
                      "Откройте мир чудес в Комплексе Аквариума Анталии — одном из крупнейших туннельных аквариумов планеты. Пройдите 131 метр подводного туннеля в окружении акул, скатов и тропических обитателей. Затем исследуйте легендарный Музей восковых фигур Да Винчи с реалистичными фигурами Коби Брайанта, Майкла Джексона и Леонардо да Винчи. Завершите посещение волшебной Снежной комнатой при -5°C. Всё в одном месте.",
                      Arrays.asList(
                          "/images/Antalya-Akvaryum.jpg",
                          "/images/davinci-balmumu.jpg",
                          "/images/michael-balmumu.jpg",
                          "/images/kobe-balmumu.jpg",
                          "/images/Akvaryum-Karodası.png",
                          "/images/Akvaryum-3.jpeg"
                      ),
                      "INCITY", false,
                      Arrays.asList("Aquarium Entry", "Wax Museum Entry", "Snow Room Access", "Round-Trip Transfer")),

                    // ═══════════════════════════════════════════
                    // OUTCITY — Grand excursions beyond Antalya
                    // ═══════════════════════════════════════════
                    t("Istanbul History Tour",
                      "Journey to the city where East meets West on this grand Istanbul excursion. Visit the legendary Hagia Sophia, marvel at the Blue Mosque, explore the opulent Topkapi Palace, and cruise the Bosphorus strait separating two continents. Browse the vibrant Grand Bazaar and savor authentic Turkish cuisine. A journey through 2,500 years of imperial history.",
                      "Исторический тур в Стамбул",
                      "Отправьтесь в город, где Восток встречается с Западом. Посетите легендарный Собор Святой Софии, полюбуйтесь Голубой мечетью, исследуйте роскошный дворец Топкапы и совершите круиз по Босфору, разделяющему два континента. Загляните на оживлённый Гранд-Базар и насладитесь аутентичной турецкой кухней. Путешествие сквозь 2 500 лет имперской истории.",
                      Collections.singletonList("/images/Istanbul.png"),
                      "OUTCITY", true,
                      Arrays.asList("Round-Trip Flight", "Hotel (1 Night)", "Breakfast & Lunch", "All Entry Tickets", "Licensed Guide", "Bosphorus Cruise")),

                    t("Pamukkale Hierapolis Day Trip",
                      "Journey to the UNESCO World Heritage Site of Pamukkale — the breathtaking Cotton Castle of cascading white travertine terraces and warm thermal pools. Walk barefoot on the ancient calcium formations, swim in Cleopatra's thermal pool, and explore the remarkably preserved Greco-Roman city of Hierapolis with its grand theatre and sacred necropolis. Breakfast, lunch, and all entry fees included.",
                      "Поездка в Памуккале — Иераполис",
                      "Отправьтесь к объекту Всемирного наследия ЮНЕСКО Памуккале — захватывающему «Хлопковому замку» из каскадных белых травертиновых террас и тёплых термальных бассейнов. Пройдитесь босиком по древним кальциевым образованиям, искупайтесь в термальном бассейне Клеопатры и исследуйте прекрасно сохранившийся греко-римский город Иераполис с его величественным театром и священным некрополем.",
                      Collections.singletonList("/images/Pamukkale.png"),
                      "OUTCITY", true,
                      Arrays.asList("Breakfast", "Lunch", "All Entry Tickets", "Cleopatra's Pool", "Round-Trip Transfer", "Licensed Guide")),

                    t("Cappadocia Adventure & Balloons",
                      "Embark on an unforgettable two-day journey to the magical land of Cappadocia. Stay in an authentic cave hotel carved into the volcanic rock, explore underground cities built millennia ago, visit ancient Byzantine cave churches, and optionally soar above the iconic fairy chimneys in a hot air balloon at sunrise. All meals, accommodation, and professional guide included.",
                      "Приключения и воздушные шары в Каппадокии",
                      "Отправьтесь в незабываемое двухдневное путешествие в волшебную Каппадокию. Остановитесь в аутентичном пещерном отеле, исследуйте подземные города, посетите древние византийские пещерные церкви и по желанию поднимитесь над знаменитыми каменными столбами на воздушном шаре на рассвете. Все приёмы пищи, проживание и профессиональный гид включены.",
                      Collections.singletonList("/images/Kapadokya.jpg"),
                      "OUTCITY", true,
                      Arrays.asList("Cave Hotel (1 Night)", "Breakfast & Dinner", "All Entry Tickets", "Round-Trip Transfer", "Licensed Guide"))
                );
                repository.saveAll(tours);
            }
        };
    }
}
