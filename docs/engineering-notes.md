# Aura Tours Mühendislik Notları

Son güncelleme: 2026-05-08

Bu notlar, Aura Tours projesinin yerel bir tur çalışmasından uluslararası ölçekli bir turizm portalına dönüşümünde alınan teknik ve tasarımsal kararları özetler. Kapsam; dil stratejisi, PostgreSQL tabanlı veri modeli, Spring Boot backend mimarisi, React frontend akışı, yat rezervasyon hunisi, WhatsApp entegrasyonu, görsel yönetimi ve ilerideki konteynerizasyon yolunu içerir.

## Proje Vizyonu ve Dil Stratejisi

Aura Tours artık yerel pazar odaklı çok dilli bir demo yerine, küresel pazara hitap eden bir turizm portalı olarak kurgulanmıştır. Bu karar doğrultusunda Türkçe destek sistemden çıkarılmış, uygulama varsayılan olarak İngilizce (`EN`) ve Rusça (`RU`) hizmet verecek şekilde yapılandırılmıştır.

Bu değişim yalnızca arayüz metinleriyle sınırlı değildir. Veritabanındaki içerik yapısı da çok dilli yayın modeline uygun olacak biçimde yeniden ele alınmıştır. Tur başlıkları ve açıklamaları backend tarafında ayrı İngilizce ve Rusça alanlarda tutulur; frontend ise kullanıcının seçtiği dile göre doğru alanı ekrana taşır.

## Teknoloji Temeli

Backend tarafında Spring Boot kullanılmaktadır. Veri yönetiminin merkezinde PostgreSQL bulunur. PostgreSQL, ilişkisel veri bütünlüğü, JPA uyumluluğu ve ilerideki üretim dağıtımı için sağlam bir temel sağlar.

Veritabanı erişimi doğrudan SQL yazılarak değil, Spring Data JPA ve Hibernate üzerinden yapılır. Örneğin Java tarafında kategoriye göre tur çekmek için çağrılan repository metodu, Hibernate tarafından PostgreSQL sorgusuna çevrilir. Bu yaklaşım SQL ayrıntılarını uygulama kodundan uzak tutar ve backend kodunu daha okunabilir hale getirir.

## Tour Tablosunun Anatomisi

Uygulamanın merkezinde `Tour` entity'si yer alır. Bu model, yerel acente seviyesinden çıkarılıp global ve çok dilli bir turizm portalı ihtiyacına göre genişletilmiştir.

### Kimlik ve Kategori

- `id`: Her turun benzersiz veritabanı kimliğidir ve primary key olarak kullanılır.
- `category`: Turun anasayfada hangi bölümde listeleneceğini belirler. Geçerli değerler `YACHT`, `INCITY` ve `OUTCITY` olarak kurgulanmıştır.
- `isTopDestination`: Turun öne çıkan destinasyon davranışını destekleyen ek işaret alanıdır.

### Çok Dilli İçerik

- `titleEn`: Turun İngilizce başlığıdır.
- `descriptionEn`: Turun İngilizce açıklamasıdır ve uzun metin için `TEXT` kolon tanımıyla tutulur.
- `titleRu`: Turun Rusça başlığıdır.
- `descriptionRu`: Turun Rusça açıklamasıdır ve uzun metin için `TEXT` kolon tanımıyla tutulur.

Bu alan ayrımı, frontend tarafında dil değiştiğinde backend verisinin yeniden anlamlandırılmasına gerek kalmadan doğru içeriğin seçilmesini sağlar.

### Resim Koleksiyonu

Önceki tek görsel yaklaşımı yerine, her turun birden fazla görsel taşıyabileceği liste tabanlı bir yapı kurulmuştur. `imageUrls` alanı JPA `ElementCollection` olarak tanımlanır ve ana `Tour` kaydına bağlı ayrı bir `tour_images` tablosunda saklanır.

Bu yapı özellikle çok görselli tur detaylarında önemlidir. Frontend tarafındaki Swiper slider, backend'den gelen görsel yollarını sırayla okuyarak profesyonel bir galeri deneyimi sunar.

### Dahil Olan Hizmetler

`includedItems` alanı da liste yapısındadır. Bu alan turun fiyat veya paket kapsamına dahil olan hizmetleri göstermek için kullanılır. Yat turlarında kaptan, mürettebat, yemek, açık bar ve sigorta gibi maddeler; şehir dışı turlarda transfer, rehberlik ve bilet gibi kalemler bu alanda taşınabilir.

## Spring Boot ve Veritabanı İletişimi

Backend mimarisi Spring Boot, Spring Data JPA ve Hibernate üzerine kuruludur. Repository katmanı kategori bazlı sorguları soyutlar. Controller katmanı frontend'in ihtiyaç duyduğu tur listelerini ve detay verilerini API üzerinden sunar.

Bu mimarinin temel kazanımları şunlardır:

- SQL yazımı uygulama kodundan ayrılır.
- PostgreSQL tablo yapısı Java entity modeliyle uyumlu yönetilir.
- Kategori ve çok dilli alanlar frontend tüketimine hazır biçimde servis edilir.
- Gelecekte filtreleme, sıralama, admin paneli veya içerik yönetimi eklemek daha kolay hale gelir.

## DataInitializer'ın Rolü

`DataInitializer`, uygulama başlangıcında veritabanının boş kalmasını engelleyen başlangıç veri katmanıdır. Repository sayımı sıfır olduğunda örnek turlar otomatik olarak kaydedilir.

Bu sınıf şu sorumlulukları üstlenir:

- İngilizce ve Rusça tur başlıklarını eşleştirir.
- İngilizce ve Rusça açıklamaları doğru entity alanlarına yerleştirir.
- Her tura ait yerel görsel yollarını `imageUrls` listesine ekler.
- Turları `YACHT`, `INCITY` ve `OUTCITY` kategorilerine dağıtır.
- Tur kapsamındaki dahil hizmetleri `includedItems` alanına yazar.

Bu yaklaşım geliştirme ortamında hızlı kurulum sağlar. Proje ileride canlı ortama taşındığında aynı model, seed verisi, migration veya admin paneli tabanlı içerik yönetimine evrilebilir.

## Backend Mimari Güncellemeleri

Tur nesnesi daha zengin ve esnek hale getirilmiştir. Tek görsel alanı yerine çoklu görsel destekleyen `List<String>` yapısı kullanılmış, bu yapı JPA `ElementCollection` ile veritabanına bağlanmıştır.

Çok dilli içerik yönetimi entity seviyesinde çözülmüştür. Başlık ve açıklama alanları İngilizce ve Rusça olarak ayrıldığı için frontend'de karmaşık çeviri eşleştirmelerine gerek kalmaz.

Kategori sistemi üç ana iş alanı etrafında kurulmuştur:

- `YACHT`: Premium yat deneyimleri.
- `INCITY`: Antalya şehir içi ve yakın çevre rotaları.
- `OUTCITY`: Antalya dışı büyük gezi rotaları.

Bu sınıflandırma, anasayfanın editoryal hiyerarşisini de belirler.

## Frontend ve UI Tasarımı

Frontend React ve Vite tabanlıdır. Arayüzde Tailwind CSS ile modern, sade ve premium bir görsel dil hedeflenmiştir. Sayfa kompozisyonu, turizm portalı hissini destekleyecek şekilde hiyerarşik ve taranabilir hale getirilmiştir.

i18next ile dil geçiş yapısı kurulmuştur. Kullanıcı İngilizce ve Rusça arasında geçiş yaptığında yalnızca sabit arayüz metinleri değil, backend'den gelen tur içerikleri de ilgili dil alanından gösterilir.

Anasayfa içerik sıralaması bilinçli bir pazarlama hiyerarşisiyle tasarlanmıştır:

- En üstte prestijli yat turları.
- Orta bölümde Antalya şehir içi ve yakın çevre rotaları.
- Alt bölümde şehir dışı büyük geziler.

Tur kartlarında gereksiz görsel rozetler kaldırılmış, metinlerin görsellerin üzerine binmesini engelleyen layout düzenlemeleri yapılmıştır. Böylece kartlar daha temiz, sakin ve premium bir görünüm kazanmıştır.

## Yat Rezervasyon Akışı ve Zaman Yönetimi

Yat kategorisi için özel bir rezervasyon hunisi tasarlanmıştır. Kullanıcı yatlara tıkladığında doğrudan listeye gitmek yerine önce zaman seçimi sayfasına yönlendirilir.

Zaman seçenekleri iki ana ürüne ayrılır:

- Gündüz Turu: `10:00 - 15:00`
- Gün Batımı Turu: `16:00 - 20:00`

Bu yapı satış deneyimini netleştirir. Kullanıcı önce istediği deneyim zamanını seçer, ardından uygun yat listesine ilerler. Masaüstü görünümde zaman seçim ekranı kaydırma gerektirmeden tam ekrana sığacak şekilde düzenlenmiştir. Mobilde ise kartlar alt alta dizilerek doğal bir kaydırma akışına geçer.

Görsel dilde lüks hissi koruyan sade ve ferah pastel gradyanlar kullanılmıştır. Sayfa pazarlama metniyle boğulmadan, doğrudan seçim yaptıran bir araç gibi davranır.

## WhatsApp Entegrasyonu ve Dinamik Mesajlaşma

Rezervasyon sürecini hızlandırmak için dinamik WhatsApp yönlendirme sistemi kurulmuştur. Kullanıcının seçtiği saat dilimi ve yat bilgisi, WhatsApp mesajına otomatik olarak eklenir.

Örnek akış:

- Kullanıcı `Sunset Tour` seçer.
- Ardından `Lusca VIP Yacht Tour` kartına tıklar.
- WhatsApp bağlantısı, seçilen saat dilimi ve yat adını içeren hazır mesaj üretir.

Bu sistem manuel mesajlaşma yükünü azaltır ve işletmeye gelen talepleri daha anlaşılır hale getirir. WhatsApp butonu da görsel olarak sadeleştirilmiş; mat zümrüt yeşili, orijinal logo ve net bir `Send Message` aksiyonuyla daha profesyonel bir forma taşınmıştır.

## Görsel Yönetimi ve Responsive Yapı

Görseller dış linklerden arındırılarak `frontend/public/images` klasörüne taşınmıştır. Veritabanı artık yalnızca yerel public yollarını referans alır; örnek olarak `/images/Yatch_Lusca.jpg` ve `/images/Antalya-Akvaryum.jpg` kullanılır.

Bu kararın etkileri:

- Görsel kontrolü tamamen proje içine alınır.
- Dış kaynak bağımlılığı azalır.
- Sayfa açılış performansı ve bakım kolaylığı artar.
- Deploy sonrası asset davranışı daha öngörülebilir hale gelir.

Görsel sunumda `object-cover` yerine `object-contain` tercih edilmiştir. Bu tercih, özellikle Antalya Aquarium gibi çok görselli turlarda fotoğrafların kesilmesini ve gereksiz zoom etkisini engeller. Koyu arka planla beraber letterbox etkisi yaratılarak galeri daha premium görünür.

Responsive davranış masaüstü ve mobil için ayrı düşünülmüştür. Masaüstünde bazı ekranlar above-the-fold kuralına göre kaydırmasız tasarlanırken, mobilde içerik kartları alt alta dizilerek kayıpsız ve doğal bir akış oluşturur.

## Navigasyon ve Layout Düzeltmeleri

Header içindeki `Destination` linkinin bozuk yönlenme davranışı çapa linkler ve kompakt ribbon yapısıyla düzeltilmiştir. Sayfalarda oluşan büyük siyah boşluklar ve gereksiz dikey açıklıklar azaltılmıştır.

Bu düzenlemelerle kullanıcı, anasayfadaki destinasyon bölümlerine daha hızlı ulaşır ve sayfa akışı daha bütünlüklü hissedilir.

## Gelecek İçin Konteynerizasyon

Mevcut mimari Docker ile konteynerize edilmeye uygundur. PostgreSQL ve Spring Boot uygulaması ayrı konteynerler halinde çalıştırılabilir. Frontend ise Vite build çıktısı olarak statik servis edilebilir veya ayrı bir web konteynerine alınabilir.

Önerilen üretim yönü:

- PostgreSQL için ayrı servis.
- Spring Boot backend için ayrı servis.
- React build çıktısı için statik hosting veya web server.
- Ortam değişkenleriyle veritabanı bağlantı bilgilerinin yönetimi.
- İleride AWS veya benzeri bulut sağlayıcılara taşınabilecek compose tabanlı kurulum.

Bu yapı, yerel geliştirme ortamından canlı sunucuya geçişi daha kontrollü hale getirir.

## Güncel Kaynak Dosya Referansları

Ana backend dosyaları:

- `backend/src/main/java/com/tour/model/Tour.java`
- `backend/src/main/java/com/tour/repository/TourRepository.java`
- `backend/src/main/java/com/tour/controller/TourController.java`
- `backend/src/main/java/com/tour/config/DataInitializer.java`
- `backend/src/main/resources/application.properties`

Ana frontend dosyaları:

- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/TourDetail.jsx`
- `frontend/src/pages/YachtSelection.jsx`
- `frontend/src/pages/YachtListing.jsx`
- `frontend/src/components/TourCard.jsx`
- `frontend/src/components/Navbar.jsx`
- `frontend/src/utils/whatsapp.js`
- `frontend/src/i18n/index.js`
- `frontend/src/i18n/locales/en.json`
- `frontend/src/i18n/locales/ru.json`
- `frontend/public/images`

## Mevcut Durum

Aura Tours şu anda teknik olarak Spring Boot ve React üzerine kurulmuş, PostgreSQL uyumlu, çok dilli, görsel varlıkları yerel yönetilen ve premium Antalya turizmi odağı taşıyan bir portaldır.

Mimari; yat rezervasyonu, şehir içi deneyimler, şehir dışı turlar, dinamik WhatsApp mesajlaşması ve ileride konteynerize edilebilir dağıtım modeli için uygun bir temel sunar.
