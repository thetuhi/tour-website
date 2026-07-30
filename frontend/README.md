# ANTALYA JOURNEY (frontend)

ANTALYA JOURNEY markasının tanıtım ve rezervasyon sitesi. Backend yoktur:
tüm tur kataloğu statik veri olarak repoda durur, rezervasyon talepleri
WhatsApp / Telegram üzerinden ilerler.

Marka ANTALYA JOURNEY'dir; arkasındaki lisanslı acente MARŞ TRAVEL, TÜRSAB
belge no 8926'dır. Bu üç değer `src/config/agency.js` içinde tek kaynaktan
gelir, hiçbir yerde elle yazılmaz.

## Teknoloji

React 19, Vite 8, Tailwind CSS 3, React Router 7, framer-motion (LazyMotion
ile `m` bileşenleri), i18next (EN + RU). Görsel işleme için sharp.

## Kurulum ve komutlar

```bash
npm install
npm run dev      # geliştirme sunucusu
npm run build    # dist/ altına production build
npm run preview  # build çıktısını yerelde sunar
npm run lint     # ESLint
```

Ortam değişkenleri `.env.example` dosyasında listelidir. Tek değişken
`VITE_GA_MEASUREMENT_ID`'dir; boş bırakılırsa analytics tamamen devre dışı
kalır ve site GA olmadan da sorunsuz çalışır.

## Klasör yapısı

```
src/
  components/   paylaşılan arayüz parçaları (Navbar, Footer, TourCard, ...)
  config/       acente kimliği (marka, lisans, ofis)
  content/      SSS ve politika metinleri (EN + RU aynı dosyada)
  context/      ThemeContext (açık/koyu tema)
  data/tours.js tüm tur kataloğu, tek kaynak
  i18n/         i18next kurulumu ve locales/en.json, locales/ru.json
  motion/       ortak animasyon presetleri ve açılış (splash) zamanlaması
  pages/        rota bileşenleri (Home, TourDetail, YachtListing, FAQ, ...)
  utils/        WhatsApp/Telegram linkleri, lead kaydı, ölçümleme
public/images/  siteye servis edilen optimize WebP görseller
scripts/        tek seferlik yardımcılar (görsel optimizasyonu)
originals/      tam çözünürlüklü görsel masterları (git'e girmez)
```

## Tur ve içerik ekleme

Tur eklemek veya düzenlemek için `src/data/tours.js` yeterlidir. Her turun
`imageUrls` dizisi galeriyi belirler; listeleme kartında görünen fotoğraf
varsayılan olarak dizinin ilkidir. Kart fotoğrafını galeri sırasını bozmadan
değiştirmek için tura `coverImage` alanı eklenir.

Metinler EN ve RU olarak yan yana durur (`titleEn` / `titleRu` gibi).
Arayüz metinleri ise `src/i18n/locales/` altındaki iki JSON dosyasındadır;
birine eklenen anahtar diğerine de eklenmelidir.

## Görsel akışı

Yeni fotoğraf ilgili turun `public/images/tours/<slug>/` klasörüne konur,
`scripts/optimize-images.mjs` içindeki eşleme listesine kaynak ve hedef adı
yazılır, sonra:

```bash
node scripts/optimize-images.mjs
```

Script kaynağı en fazla 2000 piksele küçültüp kalite 85 WebP üretir, EXIF
yönünü sabitler ve ağır orijinali `originals/` altına taşır. Tekrar
çalıştırmak güvenlidir: taşınmış kaynaklar atlanır.
