# SwapSpace V2 - Project Structure

## Project Overview

SwapSpace V2 merupakan iterasi terbaru dari aplikasi Marketplace-Barter yang dirancang untuk memfasilitasi proses tukar-menukar barang (*barter*) dengan codebase yang modern, scalable, dan terstruktur. Dokumen ini menjelaskan struktur dasar proyek serta guideline yang akan digunakan selama proses development agar maintainability tetap terjaga dan seluruh tim memiliki acuan yang sama.

## Folder Structure

```text
.
├── assets/
│   ├── avatars/
│   ├── icons/
│   ├── illustrations/
│   └── placeholders/
├── css/
├── data/
├── docs/
│   ├── ARCHITECTURE/
│   ├── DESIGN/
│   ├── DEVELOPMENT/
│   ├── PRODUCT/
│   └── TESTING/
├── js/
└── (HTML pages dan root configuration files)
```

## Fungsi Setiap Directory

### `/assets`

Menyimpan seluruh static assets yang digunakan di dalam aplikasi agar root directory tetap rapi.

* **`/avatars`** — Avatar default dan placeholder untuk profil pengguna.
* **`/icons`** — Icon aplikasi (SVG, PNG, dan format lainnya) yang digunakan pada user interface.
* **`/illustrations`** — Ilustrasi berukuran besar untuk empty state, banner, onboarding, dan kebutuhan visual lainnya.
* **`/placeholders`** — Gambar sementara yang digunakan selama development untuk mensimulasikan listing barang atau konten pengguna.

### `/css`

Berisi seluruh stylesheet aplikasi. Seiring berkembangnya proyek, folder ini akan mengorganisasi global styles, reusable components, serta utility classes agar styling tetap konsisten dan mudah dikelola.

### `/data`

Digunakan untuk menyimpan mock data (misalnya file JSON), localization resources, maupun data sementara yang dibutuhkan selama proses development dan testing.

### `/docs`

Pusat dokumentasi proyek yang dipisahkan berdasarkan domain masing-masing.

* **`/ARCHITECTURE`** — Dokumentasi arsitektur sistem, database schema, API contract, dan diagram teknis.
* **`/DESIGN`** — UI/UX mockup, design system, color palette, typography, serta guideline desain.
* **`/DEVELOPMENT`** — Panduan development, setup environment, coding convention, dan dokumentasi teknis lainnya (termasuk dokumen ini).
* **`/PRODUCT`** — Product Requirement Document (PRD), user story, feature specification, dan product roadmap.
* **`/TESTING`** — Test plan, QA guideline, serta laporan automated testing pada tahap berikutnya.

### `/js`

Berisi seluruh business logic aplikasi. Seiring bertambahnya fitur, struktur di dalam folder ini akan dipisahkan berdasarkan feature, API utilities, state management, serta page-specific logic.

---

## Development Philosophy

SwapSpace V2 dibangun dengan beberapa prinsip utama berikut:

* **Separation of Concerns**
  HTML, CSS, dan JavaScript dipisahkan secara jelas agar code lebih mudah dibaca, diuji, dan dipelihara.

* **Scalability by Design**
  Struktur directory dirancang untuk mendukung pertumbuhan fitur, assets, documentation, dan modules tanpa membuat repository menjadi berantakan.

* **Documentation First**
  Setiap keputusan penting, mulai dari system architecture hingga product requirement, harus terdokumentasi dengan baik di dalam folder `docs/` sebelum atau bersamaan dengan implementasi.

---

## Naming Convention

* **Directory**
  Menggunakan huruf kecil (*lowercase*), misalnya `assets`, `css`, `js`, dan `data`. Khusus subfolder pada `docs/` menggunakan huruf kapital (`UPPERCASE`) agar kategori dokumentasi lebih mudah dikenali.

* **File**
  Menggunakan format `kebab-case`, misalnya:

  * `user-profile.html`
  * `main-styles.css`
  * `product-detail.js`

* **CSS Class**
  Disarankan mengikuti metodologi seperti **BEM (Block Element Modifier)** agar penamaan class tetap konsisten dan scalable.

* **JavaScript**

  * Gunakan **camelCase** untuk variable dan function.
  * Gunakan **PascalCase** untuk class atau major component.

---

## Future Implementation Notes

* **Framework Adaptability**
  Walaupun saat ini proyek masih menggunakan HTML, CSS, dan JavaScript murni, struktur ini sudah dipersiapkan agar nantinya mudah di-migrate ke framework berbasis component seperti React, Vue, atau Svelte apabila diperlukan.

* **Build Tools Integration**
  Pada fase berikutnya, proyek dapat mengintegrasikan build tools modern seperti Vite atau Webpack untuk asset optimization, JavaScript bundling, serta kompilasi SCSS maupun Tailwind CSS. Struktur directory saat ini sudah mengakomodasi kebutuhan tersebut.

* **Robust State Management**
  Seiring berkembangnya fitur seperti sistem barter, chat, notification, dan real-time tracking, proyek direncanakan akan menerapkan centralized state management di dalam folder `/js` agar pengelolaan state aplikasi dan session pengguna menjadi lebih efisien dan konsisten.
