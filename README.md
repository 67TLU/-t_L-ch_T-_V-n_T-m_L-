# 1. Tên đề tài

**CampusMind — Student Wellbeing Hub**
> BTL-02 · Học phần Phát triển ứng dụng Web cơ bản (CSE122)
> Khoa Công nghệ Thông tin — Trường Đại học Thủy Lợi

# 2. Tên trang đã thực hiện

**Màn hình 07 — Luồng đặt lịch tư vấn tâm lý 4 bước (Student Booking Wizard)**
> File chạy độc lập: `project/index.html` (tách từ `pages/student-booking` của demo tổng).

# 3. Mục đích của trang

- Giúp sinh viên tự đặt lịch tư vấn tâm lý 1-1 theo quy trình 4 bước rõ ràng, giảm lo lắng khi lần đầu tìm đến tham vấn.
- Đảm bảo thông tin hợp lệ ngay tại chỗ (validate), hiển thị chỉ khung giờ còn trống, có tóm tắt xác nhận và cam kết bảo mật.
- Trang độc lập, đầy đủ Header + Footer, mở bằng `file://` vẫn chạy để demo, chấm bài, quay video.

# 4. Các chức năng chính

| Bước | Chức năng | Chi tiết |
|------|-----------|----------|
| B1 | Chọn dịch vụ | 6 thẻ radio (Tư vấn 1-1, Workshop, Thư giãn, Phương pháp học, Nhóm đồng đẳng, Giấc ngủ). Bắt buộc chọn, báo lỗi nếu bỏ qua. |
| B2 | Chọn chuyên viên + khung giờ | Dropdown 3 chuyên viên, lưới slot chỉ hiện giờ `available`. Đổi chuyên viên thì render lại slot, tự chọn slot đầu tiên. |
| B3 | Nhập thông tin + AI-2 | Họ tên (không trống), Email (đúng đuôi `.edu.vn`), Chủ đề (không trống). Ghi chú tự do + checkbox nhận audio thở 4-7-8. |
| B4 | Xác nhận + Modal thành công | Thẻ tóm tắt dịch vụ/chuyên gia/giờ/sinh viên, cam kết bảo mật, nút gửi tạo mã `APT-xxxx` và popup trạng thái Đang chờ duyệt. |
| Chung | Header/Footer/Stepper | Header sticky (logo, nav, badge SV), thanh tiến trình 4 bước có tick, Footer 3 cột + dòng bản quyền. Responsive mobile/tablet. |

# 5. Công nghệ sử dụng

- **HTML5** semantic: `header`, `nav`, `main`, `fieldset`, `footer`, `aside` modal.
- **CSS3 thuần** (`css/style.css`): biến Design Tokens (Sage `#2F7A66`, Sage-deep, Paper, Clay...), Flex/Grid, responsive, không phụ thuộc Tailwind.
- **JavaScript thuần (Vanilla JS)** (`js/main.js`): object `BOOKING_DATA` + `BookingWizard` (`init`, `renderServices`, `renderTimeSlots`, `goToStep`, `validateStep3AndProceed`, `submitBooking`).
- **Lucide Icons** qua CDN + **Google Fonts** Fraunces (tiêu đề) và Be Vietnam Pro (nội dung).

```
project/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
└── README.md
```

Cách chạy: mở trực tiếp `index.html` bằng Chrome/Edge, hoặc `cd project && python -m http.server 3000`.

# 6. Link Figma / Video / GitHub

| Tài liệu | Link |
|----------|------|
| Figma thiết kế | https://www.figma.com/design/e0EAnA7Uo5Z72p71vD9jzS/Untitled?node-id=2-2&t=C8PmeBkis0FujWMM-1 |
| Video demo | _(chưa có — dán link vào đây)_ |
| GitHub repo | _(chưa có — dán link vào đây)_ |
