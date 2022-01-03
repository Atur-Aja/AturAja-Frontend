# AturAja-Frontend
AturAja adalah aplikasi scheduling sederhana dengan fitur kolaborasi jadwal

Use PHP Composer + Artisan
---

Make sure you have composer installed
```bash
> composer --version
```
If it's not installed yet, you can download [here](https://getcomposer.org/)

You also need php v 7.3 and mySQL database.
You can use [XAMPP](https://www.apachefriends.org/download.html)

How To Install This Project
===

1. Clone project https://github.com/Atur-Aja/AturAja-Backend.git, main 

2. Install this Project Dependencies
```bash
> composer install
```
3. Replace the existing .env with the given .env

4. Generate JWT Secret Key
```bash
> php artisan jwt:secret
```
5. Run MySQL database using XAMPP control panel

6. Migrate database
```cmd
> php artisan migrate
```
7. Run this project
```bash
> php artisan serve
```
8. Clone this project 

9. Install this Project Dependencies
```bash
> npm install
```
10. Run this project
```bash
> npm start
```

Hasil Sprint-2 dan Rencana Sprint-3
---
Target untuk Sprint 2 : 
- Sistem pertemanan (Add friend, Accept atau Ignore friend, Remove friend)
- Penjadwalan otomatis pada schedule 
- Kolaborasi task dengan teman 

Hasilnya untuk Sprint 2 :
- Sistem pertemanan sudah jadi untuk tiga fungsi nya 
- Penjadwalan otomatis sudah jadi berupa pilihan rekomendasi, tapi belum bisa ditampilkan di web dan disimpan, jadi masih dilihat melalui inspect -> network 
- Kolaborasi dengan teman sudah jadi 

Target untuk Sprint 3 :
- Memperbaiki Sistem pertemanan (search friend menggunakan jquery) 
- Pada penjadwalan otomatis (Menampilkan dan menyimpan pilihan jadwal otomatis yang direkomendasikan) 
- Pada Task (Menambahkan tag pada Task untuk kolaborasi dengan teman, agar mengetahui siapa yang mengerjakan task tersebut)
- Memperbaiki tampilan dan responsivitas web (Merupakan komentar dari Sprint Review-2) 

Link website yang sudah dideploy : https://aturaja.me/
