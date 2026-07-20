
---

# PRD — Project Requirements Document: Rizki Juliadi Personal Portfolio

## 1. **Overview**

Aplikasi ini adalah platform *personal portfolio* berbasis web yang dirancang khusus untuk mempresentasikan profil profesional **Rizki Juliadi**. Sistem berfungsi sebagai resume digital interaktif tingkat lanjut yang dirancang untuk menarik perhatian rekruter di bidang *Cybersecurity* (terutama posisi *SOC Analyst*), sekaligus menonjolkan kapabilitas dalam *Development*, *Artificial Intelligence* (AI), dan edukasi publik (*Content Creation*).

**Masalah utama yang diselesaikan:**

* Keterbatasan format CV PDF statis dalam mendemonstrasikan keahlian teknis secara langsung (misalnya: tautan publikasi, sertifikasi AI, dan *soft skills* komunikasi visual).
* *Hiring Manager* memerlukan satu *hub* terpusat yang memvalidasi perpaduan unik antara keahlian *IT Security* teknis dengan adaptabilitas terhadap *tools* AI modern.

**Tujuan utama aplikasi:**

* Menciptakan presensi digital yang kuat dengan estetika visual *Cybersecurity* (*dark theme, clean, analytical*).
* Menjadi etalase interaktif untuk memamerkan publikasi riset IEEE, proyek integrasi sistem (Laravel), dan inisiatif edukasi (YouTube).
* Memudahkan pengunjung untuk mengunduh resume, memverifikasi kredensial sertifikat terbaru, dan menghubungi pemilik web secara instan.

## 2. **Requirements**

* Sistem harus sangat responsif (*mobile-first*) dan dioptimalkan untuk performa tinggi, dengan waktu *loading* di bawah 2 detik.
* Tampilan harus menggunakan mode gelap (*Dark Mode*) secara *default* untuk menonjolkan nuansa *Cyber/Tech*.
* Pengunjung tidak memerlukan *login* atau autentikasi untuk mengakses informasi publik, mengunduh CV, atau melihat sertifikat.
* Sistem harus memiliki arsitektur konten yang modular (misalnya menggunakan *Markdown/MDX* atau JSON) sehingga penambahan proyek, publikasi, atau sertifikat baru di masa depan dapat dilakukan tanpa merombak *hardcode* UI.
* Memiliki *Open Graph* (OG) Tags yang terkonfigurasi dengan baik agar memunculkan *thumbnail* dan deskripsi profesional ketika tautan web dibagikan di platform seperti LinkedIn atau WhatsApp.
* Harus ada metrik *tracking* minimalis (seperti Vercel Analytics) untuk memantau trafik tanpa melanggar privasi pengguna.

## 3. **Core Features**

* **Hero Section (Landing & Hook)**
* Tipografi tebal yang menampilkan nama dan posisi target: *"Aspiring SOC Analyst | IEEE Published Researcher | AI & SIEM Enthusiast"*.
* *Call-to-Action* (CTA) utama: Tombol "Unduh Resume" (memicu unduhan PDF) dan "Lihat Proyek Saya".


* **About Me Module**
* Paragraf profil yang menyoroti pencapaian lulus *Cum Laude* dari Informatika Telkom University.
* Visi profesional: Menjembatani analisis keamanan (*data-driven security*) dengan efisiensi operasional berbasis kecerdasan buatan, serta komitmen terhadap pemberdayaan manusia melalui "Potensi Produktif".


* **Tech Stack & Skills Grid**
* Visualisasi keahlian menggunakan sistem *grid* atau *badge* interaktif.
* **Cybersecurity:** Threat Monitoring, Wireshark, Nmap, Burp Suite, OWASP ZAP.
* **SIEM & OS:** Wazuh, Ubuntu Server, Linux VM.
* **Dev & Automation:** Python, Laravel, JavaScript, OpenCV.


* **Publications & Projects Showcase**
* 
**Publikasi IEEE:** Menampilkan riset "Web Penetration Testing Using Collaborative Multi-Agents and Integrated Reporting"  lengkap dengan *link* eksternal `https://ieeexplore.ieee.org/document/10933244`.


* **Proyek Automasi (FKS Group):** Sistem presensi web (Laravel/PostgreSQL + RFID/Biometrik) & *Virtual Mouse* (MediaPipe/OpenCV).
* **Inisiatif Edukasi:** Sematan (*embed*) pemutar video YouTube untuk kanal "Potensi Produktif".


* **Licenses, Certifications & Achievements**
* Galeri atau daftar kartu untuk memvalidasi pencapaian kredensial.
* Sertifikat kompetensi AI dari program Maju Bareng AI.


* Sertifikat "AI for Work & Career Readiness with Google AI Products".


* Sertifikat "AI Productivity and AI API Integration for Developers".


* Bukti apresiasi sebagai *Presenter* di International Conference on Advancement in Data Science, E-learning and Information System 2025 (ICADEIS 2025).




* **Experience Timeline**
* Garis waktu riwayat pekerjaan secara vertikal (Asisten Praktikum Telkom University, FKS Group, PuTi Telkom University, PT Pertamina).


* **Contact & Footer**
* Formulir kontak (Nama, Email, Pesan) yang langsung meneruskan data ke `rizkijuliadi03@gmail.com`.
* Tautan ke platform sosial (LinkedIn, YouTube).



## 4. **User Flow**

### Flow Rekruter / Pengunjung Eksternal

1. Pengunjung mengklik tautan URL portofolio dari CV atau profil LinkedIn.
2. Mendarat di **Hero Section**; sistem menyajikan kesan pertama visual *cyber* dan *headline* profesional.
3. Pengunjung menggulir ke bawah, membaca **About Me** dan memindai visualisasi **Tech Stack**.
4. Pengunjung menekan kartu **Publikasi IEEE**, sistem membuka *tab* baru menuju repositori digital IEEE Xplore.
5. Pengunjung melihat bagian **Certifications** dan memverifikasi kelulusan program *Hacktiv8 AI* serta partisipasi konferensi *ICADEIS*.
6. Jika tertarik, pengunjung menekan tombol **"Download CV"** yang selalu menempel di navigasi atas (*sticky navbar*).
7. Pengunjung menggunakan fitur **Formulir Kontak** di bagian bawah halaman untuk mengirim undangan wawancara atau menekan ikon LinkedIn untuk terhubung secara profesional.

## 5. **Architecture**

Aplikasi menggunakan arsitektur *Static Site Generation* (SSG). Pendekatan ini dipilih untuk memaksimalkan kecepatan akses dan SEO. Karena portofolio ini adalah aplikasi *read-only* bagi pengunjung publik, basis data relasional (*database*) yang berat tidak diperlukan. Seluruh data konten (proyek, pengalaman, dan sertifikat) disimpan dalam format fail data terstruktur (JSON, TypeScript Object, atau MDX) yang dirender menjadi HTML statis saat proses *build*.

```mermaid
flowchart TD
    A[Visitor / Recruiter] --> B[Next.js Frontend / UI]
    B --> C{Routing Engine}
    C -->|/| D[Home / One-Page Layout]
    
    D --> E[Hero & About Component]
    D --> F[Experience Timeline]
    D --> G[Projects & Publications Grid]
    D --> H[Certifications List]
    D --> I[Contact Form]

    G --> J[External Link: IEEE Xplore]
    H --> K[Content Data Layer: JSON / MDX]
    E --> K
    F --> K
    G --> K
    
    I --> L[3rd Party API: Resend / Formspree]
    L --> M[rizkijuliadi03@gmail.com]

```

**Komponen Utama:**

* **Public Website:** Antarmuka satu halaman (*single-page layout*) dengan pengguliran yang mulus (*smooth scrolling*).
* **Data Layer:** Penyimpanan lokal berstruktur untuk memisahkan data dengan UI komponen.
* **Form Handler:** Layanan pihak ketiga tanpa *backend* (*serverless API*) untuk memproses pengiriman pesan.

## 6. **Data Schema (Content Structure)**

Berikut adalah skema data *high-level* (menggunakan antarmuka TypeScript) yang akan bertindak sebagai *sumber kebenaran* (*source of truth*) untuk konten portofolio.

### `ProfileData`

Menyimpan informasi identitas sentral.

* `name` — string
* `headline` — string
* `email` — string
* `linkedin_url` — string
* `youtube_url` — string
* `resume_file_path` — string

### `ProjectsData`

Menyimpan daftar portofolio teknis dan publikasi.

* `id` — string
* `title` — string
* `type` — string ("Publication", "System Integrations", "Automation", "Content")
* `description` — text
* `tech_stack` — array of strings
* `external_link` — string (URL ke IEEE atau GitHub)

### `CertificationsData`

Menyimpan pencapaian lisensi dan konferensi.

* `id` — string
* `name` — string
* `issuer` — string (misal: "Hacktiv8 & Maju Bareng AI", "ICADEIS")
* `date` — string
* `credential_id` — string (opsional)

### `ExperienceData`

Menyimpan riwayat kerja.

* `id` — string
* `role` — string
* `company` — string
* `period` — string (Bulan/Tahun mulai hingga selesai)
* `achievements` — array of strings (poin-poin pekerjaan)

## 7. **Tech Stack**

Rekomendasi *tech stack* untuk memastikan portofolio ini level industri (*production-ready*), mudah dirawat, dan cepat:

* **Framework**: Next.js (App Router)
* Fitur optimasi gambar, *font*, dan performa *routing* sangat cocok untuk *showcase* profesional.


* **Bahasa Pemrograman**: TypeScript
* Meminimalkan *bug* dan menjaga struktur skema data tetap konsisten.


* **Styling**: Tailwind CSS
* Mempercepat pembuatan UI responsif dan implementasi *Dark Theme* yang konsisten.


* **UI Components**: shadcn/ui & Framer Motion
* *shadcn/ui* digunakan untuk membuat komponen tombol, *timeline*, dan kartu proyek dengan cepat dan rapi.
* *Framer Motion* digunakan untuk memberikan animasi masuk (*fade-in* atau *slide-up*) saat pengguna menggulir layar, memberikan kesan premium.


* **Iconography**: Lucide React
* *Library* ikon modern, tajam, dan ringan.


* **Deployment**: Vercel
* Penerapan (*deployment*) otomatis dari GitHub tanpa hambatan.


* **Form Handling**: Resend atau Formspree
* Untuk memfasilitasi formulir kontak agar email pengunjung bisa langsung masuk ke kotak masuk pribadimu.