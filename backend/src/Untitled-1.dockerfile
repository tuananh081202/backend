CONTROLLER -> SERVICE -> REPOSITORY

CONTROLLER: dữ liệu phản hồi

REPOSITORY:xử lý business logic

SERVICE:xử lý logic liên quan đến dữ liệu


website quản lý nhân sự
-quản lý nhân viên
chức vụ :
+thêm chức vụ :mã chức vụ,tên chức vụ,lương ,mô tả,người tạo
+bảng danh sách chức vụ :mã chức vụ,tên chức vụ,lương ,mô tả,người tạo,ngày tạo,người sửa,ngày sửa,sửa ,xóa
+trình độ
+chuyên môn
+bằng cấp
+Loại nhân viên
+thêm mới nhân viên
+danh sách nhân viên
-quản lý phòng ban:thêm,xóa phòng ban,danh sách phòng ban
-quản lý lương:
+tạo bảng tính lương:mã lương,nhân viên,số ngày công,phụ cấp,tạm ứng,ngày tính lương,mô tả,người tạo,ngày tạo
+bảng lương:stt,mã lương,tên nhân viên,chức vụ,lương tháng,ngày công,thực lãnh,ngày chấm,chi tiết,xóa
+tính lương
-quản lý công tác: 
+tạo công tác:mã công tác,chọn nhân viên,ngày bắt đầu,ngày kết thúc,địa điểm công tác,mục đích công tác,ghi chú,người tạo,ngày tạo
+danh sách công tác
-Nhóm nhân viên:
+tạo nhóm:mã nhóm,tên nhóm,mô tả,người tạo ,ngày tạo
+Danh sách nhóm:mã nv ,ảnh ,tên nhân viên,giới tính,năm sinh,chức vụ,ngày thêm,trạng thái
-Khen thưởng- kỷ luật
-Tài khoản
+Thông tin tài khoản 
+Thông tin cá nhân 
+Tạo tài khoản :họ ,tên,email,mật khẩu,repeat pass,sdt,hình ảnh,quyền,trạng thái
+Danh sách tài khoản:id,ảnh,họ tên,mã nv,email,điện thoại,quyền hạn,trạng thái
+Đổi mật khẩu
+Đăng xuất
-thống kê
+Danh sách nhân viên
+Danh sách tài khoản
