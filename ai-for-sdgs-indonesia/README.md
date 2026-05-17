# AI for SDGs Indonesia

> Eksplorasi data-driven tentang peran kecerdasan buatan dalam mempercepat pencapaian 17 Sustainable Development Goals di Indonesia.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Made with HTML](https://img.shields.io/badge/Made%20with-HTML%2FCSS%2FJS-orange.svg)
![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)
![Data Updated](https://img.shields.io/badge/Data%20Updated-Mei%202026-lightgrey.svg)

---

## Screenshot

```
┌─────────────────────────────────────────────┐
│  AI for SDGs  [Dashboard] [Berita] [Tentang]│
├─────────────────────────────────────────────┤
│                                             │
│  "Bagaimana Kecerdasan Buatan              │
│   Membentuk Masa Depan Indonesia"           │
│                                             │
│  270.6 juta · 17 SDGs · 64% tercapai       │
│                                             │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  01 · Bantuan Sosial                   →   │
│  02 · Ekonomi Inklusif                 →   │
│  03 · Climate Monitoring               →   │
│  04 · Pendidikan                       →   │
│  05 · Smart Agriculture                →   │
└─────────────────────────────────────────────┘
```

---

## Tentang Proyek

**AI for SDGs Indonesia** adalah inisiatif open-source yang mendokumentasikan bagaimana kecerdasan buatan sedang digunakan secara konkret untuk mempercepat pencapaian 17 Sustainable Development Goals di Indonesia.

Proyek ini lahir dari keyakinan bahwa antara narasi ketakutan ("AI menggantikan pekerjaan") dan utopianisme ("AI menyelesaikan semua masalah"), ada ruang yang lebih menarik dan relevan: bagaimana AI, sebagai alat, digunakan untuk menyelesaikan masalah nyata di Indonesia hari ini.

**Target pembaca:** mahasiswa, peneliti, policy maker, dan masyarakat umum yang ingin memahami peran AI dalam pembangunan berkelanjutan Indonesia.

---

## Tech Stack

| Teknologi | Deskripsi |
|-----------|-----------|
| HTML5 | Semantic markup, aksesibel |
| CSS3 Vanilla | Design system editorial, dark mode, responsive |
| JavaScript ES6+ | Tanpa framework, vanilla |
| [Chart.js](https://www.chartjs.org/) | Visualisasi data: bar chart, line chart, donut |
| [Leaflet.js](https://leafletjs.com/) | Peta interaktif proyek AI |
| [Google Fonts](https://fonts.google.com/) | Fraunces + Inter + JetBrains Mono |
| CartoDB Positron | Tile layer peta minimalis |

Fully static — tidak membutuhkan server atau backend. Dapat dijalankan langsung dengan double-click `index.html`.

---

## Fitur

- **Editorial Minimalism design** terinspirasi NYT Interactive, The Pudding, Bloomberg Graphics
- **Dark mode** dengan localStorage persistence, default mengikuti preferensi sistem
- **Peta interaktif** dengan 28+ marker proyek AI tersebar di seluruh Indonesia
- **4 chart visualisasi**: progres 17 SDGs, investasi AI, distribusi proyek per pilar, timeline
- **Animated counters** dengan Intersection Observer
- **Search modal** (Ctrl+K) dengan live search
- **Reading progress bar** untuk halaman artikel panjang
- **Responsive** — mobile-first, tested di 320px hingga 1440px+
- **Aksesibel** — ARIA labels, focus states, semantic HTML
- **5 halaman pilar** dengan konten mendalam dan studi kasus

---

## Struktur File

```
ai-for-sdgs-indonesia/
├── index.html                    # Beranda
├── dashboard.html                # Dashboard data & visualisasi
├── news.html                     # Halaman berita
├── about.html                    # Tentang proyek
├── pillars/
│   ├── social-aid.html           # Pilar 01: AI untuk Bantuan Sosial
│   ├── inclusive-economy.html    # Pilar 02: AI untuk Ekonomi Inklusif
│   ├── climate.html              # Pilar 03: AI untuk Climate Monitoring
│   ├── education.html            # Pilar 04: AI Education Platform
│   └── agriculture.html          # Pilar 05: AI untuk Smart Agriculture
├── css/
│   ├── reset.css                 # CSS reset minimal
│   ├── tokens.css                # Design tokens (warna, spacing)
│   ├── base.css                  # Typography, elemen dasar
│   ├── components.css            # Komponen reusable (nav, card, dll)
│   ├── layout.css                # Grid, container, section
│   └── pages.css                 # Style spesifik per halaman
├── js/
│   ├── main.js                   # Nav, search modal, mobile menu
│   ├── dashboard.js              # Semua Chart.js visualisasi
│   ├── map.js                    # Leaflet peta interaktif
│   ├── theme.js                  # Dark/light mode toggle
│   └── counter.js                # Animated counter
├── data/
│   ├── sdg-data.json             # Progres SDG + data investasi
│   ├── projects.json             # 28 proyek AI per provinsi
│   └── news.json                 # 6 artikel berita
├── assets/
│   └── icons/                    # (Placeholder untuk ikon lokal)
├── README.md
└── LICENSE
```

---

## Getting Started

### Cara Tercepat

```bash
# Clone repository
git clone https://github.com/[username]/ai-for-sdgs-indonesia.git

# Masuk ke direktori
cd ai-for-sdgs-indonesia

# Buka di browser
open index.html
# atau di Windows:
start index.html
```

Tidak perlu `npm install`, tidak perlu build step, tidak perlu server. Langsung jalan.

### Dengan Live Server (Rekomendasi untuk Development)

Jika menggunakan VS Code:
1. Install ekstensi **Live Server** (Ritwick Dey)
2. Klik kanan `index.html` → "Open with Live Server"

Atau dengan Python:
```bash
# Python 3
python -m http.server 8000
# Buka: http://localhost:8000
```

---

## Contributing

Kami menyambut kontribusi dalam bentuk apapun:

### Jenis Kontribusi

| Tipe | Contoh |
|------|--------|
| 📊 Data | Studi kasus baru, koreksi angka, pembaruan statistik |
| 🗺️ Peta | Proyek AI di provinsi yang belum terwakili |
| 📝 Konten | Artikel pilar baru, terjemahan bahasa Inggris |
| 🎨 Desain | Peningkatan aksesibilitas, komponen baru |
| 🐛 Bug | Laporan masalah via GitHub Issues |

### Cara Berkontribusi

```bash
# 1. Fork repository di GitHub

# 2. Clone fork Anda
git clone https://github.com/[username-anda]/ai-for-sdgs-indonesia.git

# 3. Buat branch baru
git checkout -b tambah-studi-kasus-papua

# 4. Lakukan perubahan, lalu commit
git add .
git commit -m "Tambah studi kasus AI pertanian Papua"

# 5. Push ke fork Anda
git push origin tambah-studi-kasus-papua

# 6. Buka Pull Request di GitHub
```

### Panduan Data

Untuk menambah proyek baru ke peta, edit `data/projects.json`:

```json
{
  "id": 29,
  "name": "Nama Proyek AI",
  "lat": -6.200,
  "lng": 106.816,
  "pillar": "education",
  "sdg": [4],
  "province": "DKI Jakarta",
  "description": "Deskripsi singkat maksimal 2 kalimat.",
  "organization": "Nama Organisasi"
}
```

Pillar yang tersedia: `social-aid`, `economy`, `climate`, `education`, `agriculture`

---

## Sumber Data & Metodologi

Data yang digunakan di website ini bersumber dari:

- **Bappenas** — Laporan Voluntary National Review (VNR) SDGs Indonesia 2024
- **BPS** — Statistik Indonesia 2024, Susenas, Sakernas
- **BRIN** — Publikasi riset dan laporan teknis
- **OJK** — Statistik Perbankan dan laporan inklusi keuangan
- **KLHK** — Data tutupan hutan dan laju deforestasi
- **Kemensos** — Data DTKS dan program perlindungan sosial
- **Global Forest Watch** — Data kehilangan hutan tropis
- **McKinsey Global Institute** — Laporan inklusi keuangan Asia Tenggara

**Catatan metodologi:** Data progres SDG bersifat indikatif berdasarkan laporan Bappenas 2024. Data investasi AI merupakan estimasi dari laporan publik dan laporan tahunan perusahaan. Angka-angka ini **bukan data resmi** — untuk penggunaan akademik atau kebijakan, verifikasi melalui sumber primer.

---

## License

Kode sumber dirilis di bawah **MIT License** — lihat file [LICENSE](LICENSE).

Konten editorial (teks, analisis) dirilis di bawah **Creative Commons Attribution 4.0 International (CC BY 4.0)**.

---

## Acknowledgments

Terima kasih kepada semua institusi yang mempublikasikan data secara terbuka, dan kepada komunitas open-source Indonesia yang menginspirasi inisiatif ini.

---

*Inisiatif open-source · Diperbarui Mei 2026 · Made with ♥ in Indonesia*
