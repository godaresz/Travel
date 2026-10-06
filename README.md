# 🌊 Bangsaen Trip 2026

WebApp แสดงกำหนดการท่องเที่ยวประจำปี — บางแสน วันเสาร์ที่ 24 ตุลาคม 2026

- Hero แอนิเมชัน (พระอาทิตย์ คลื่น ฟองอากาศ นก) + นับถอยหลังถึงวันเดินทาง
- แผนที่แอนิเมชัน (Leaflet) รถตู้/คนเดินวิ่งตามเส้นทางจริง พร้อมนาฬิกา, ปุ่มเล่น/หยุด/ข้าม/ความเร็ว และแถบเลื่อนเวลา
- Timeline กำหนดการ คลิกเพื่อข้ามไปยังช่วงนั้นบนแผนที่ (วันจริงจะขึ้นป้าย "กำลังดำเนินการ")
- การ์ดสถานที่พร้อมลิงก์ Google Maps, Responsive รองรับมือถือ

## เปิดใช้งาน

เป็นไฟล์ static ล้วน ไม่ต้อง build

```bash
python3 -m http.server 8000   # แล้วเปิด http://localhost:8000
```

หรือ deploy ขึ้น GitHub Pages / Netlify ได้ทันที

## แก้ไขข้อมูล

ทุกอย่างอยู่ด้านบนของ `app.js`

- `PLACES` — ชื่อ คำอธิบาย และ **พิกัด** ของแต่ละสถานที่
- `SCHEDULE` — รายการกำหนดการ (`t0`/`t1` = นาทีนับจากเที่ยงคืน ใช้กับนาฬิกาในแอนิเมชัน)
- `ROUTES` — เส้นทางสำรอง ถ้าโหลดเส้นทางถนนจริงจาก OSRM ไม่ได้

## Deploy บน Firebase Hosting

1. สร้างโปรเจกต์ที่ <https://console.firebase.google.com> แล้วแก้ `YOUR_FIREBASE_PROJECT_ID` ใน `.firebaserc` เป็น Project ID
2. Deploy จากเครื่องตัวเอง:

   ```bash
   npm install -g firebase-tools
   firebase login
   firebase deploy --only hosting
   ```

   จะได้ URL แบบ `https://<project-id>.web.app`

3. (ทางเลือก) Deploy อัตโนมัติเมื่อ push เข้า `main`: สร้าง Service Account key ใน Firebase Console
   (Project settings → Service accounts → Generate new private key) แล้วเพิ่มเป็น GitHub secret ชื่อ
   `FIREBASE_SERVICE_ACCOUNT` (วางเนื้อหา JSON ทั้งไฟล์) ใน Settings → Secrets and variables → Actions

## ภาพสถานที่

ภาพประกอบ (SVG แอนิเมชัน) อยู่ในโฟลเดอร์ `images/` ถ้าต้องการใช้รูปถ่ายจริง ให้วางไฟล์ เช่น `images/aquarium.jpg`
แล้วแก้ช่อง `image` ของสถานที่นั้นใน `PLACES` (`app.js`) ให้ชี้ไปที่ไฟล์ใหม่
