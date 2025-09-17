export const dataServey = [
  {
    id: 1,
    type: "text",
    question:
      "1. Hãy mô tả ngắn gọn lý do chính (vấn đề sức khỏe) khiến Quý khách tới khám bệnh (ví dụ: đau bụng, nuốt khó, bệnh gan, các vấn đề khác, …)",
  },
  {
    id: 2,
    type: "text",
    question: "Quý khách có vấn đề sức khỏe này từ khi nào?",
  },
  {
    id: 3,
    type: "text",
    question:
      "Trước đây Quý khách đã đi khám về vấn đề sức khỏe này ở bệnh viện/phòng khám khác chưa?",
  },
  {
    id: 4,
    type: "text",
    question:
      "Quý khách hàng đã từng nội soi trước đây chưa? Nếu có thì lần nội soi gần đây nhất đã bao lâu? Từ kết quả nội soi đó Bác sĩ đã chẩn đoán bệnh lý của Quý khách hàng là gì? Quý khách hàng vui lòng cung cấp kết quả nội soi lần gần nhất.",
  },
  {
    id: 5,
    type: "text",
    question:
      "Hãy liệt kê các điều trị hay tên thuốc mà quý khách hàng đã sử dụng để điều trị vấn đề sức khỏe này.",
  },
  {
    id: 6,
    type: "radio",
    question: "Quý khách hàng có tiền sử bị bất kỳ bệnh lý nào dưới đây không?",
    child: [
      {
        child_id: 0,
        child_question: "Bất thường xét nghiệm gan/ tăng men gan",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 1,
        child_question: "Viêm gan",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 2,
        child_question: "Bệnh gan mật",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 3,
        child_question: "Viêm loét dạ dày tá tràng",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 4,
        child_question: "Nhiễm Hp",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 5,
        child_question: "Viêm loét đại tràng",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 6,
        child_question: "Polyp đại trực tràng",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 7,
        child_question: "Trĩ",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 8,
        child_question: "Thiếu máu",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 9,
        child_question: "Rối loạn đông cầm máu",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 10,
        child_question: "Bệnh lý huyết học khác",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 11,
        child_question: "Động kinh hoặc đột quỵ/ tai biến mạch máu não",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 12,
        child_question: "Tăng huyết áp",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 13,
        child_question: "Bệnh tim mạch",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 14,
        child_question: "Đái tháo đường",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 15,
        child_question: "Rối loạn tâm thần kinh",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 16,
        child_question: "Lao phổi",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 17,
        child_question: "Bệnh phổi hoặc hen suyễn",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 18,
        child_question: "Bệnh tuyến giáp",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 19,
        child_question: "Thấp khớp",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 20,
        child_question: "HIV/AIDS",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 21,
        child_question: "Ung thư",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 22,
        child_type: "text",
        child_question: "Ghi chú (nếu có):",
        child_answer: "",
      },
    ],
  },
  {
    id: 7,
    type: "text_row",
    question:
      "Hãy liệt kê các tình trạng bệnh lý khác (chưa được kể ở trên) mà Quý khách đang có hoặc đã từng mắc phải:",
    child: [
      {
        child_id: 0,
        child_answer: [
          { anwers: "", title: "Bệnh lý:" },
          { anwers: "", title: "Năm:" },
          { anwers: "", title: "Biến chứng (nếu có):" },
        ],
      },
      {
        child_id: 1,
        child_answer: [
          { anwers: "", title: "Bệnh lý:" },
          { anwers: "", title: "Năm:" },
          {
            anwers: "",
            title: "Biến chứng (nếu có):",
          },
        ],
      },
      {
        child_id: 2,
        child_answer: [
          { anwers: "", title: "Bệnh lý:" },
          { anwers: "", title: "Năm:" },
          { anwers: "", title: "Biến chứng (nếu có):" },
        ],
      },
    ],
  },
  {
    id: 8,
    type: "yes_no",
    question:
      "Quý khách có cần sử dụng kháng sinh dự phòng trước khi chữa răng không?",
    anwser: ["Có", "Không"],
  },
  {
    id: 9,
    type: "yes_no",
    question:
      "Quý khách có van tim nhân tạo, từng thay khớp hoặc có mảnh ghép mạch máu nhân tạo không?",
    anwser: ["Có", "Không"],
  },
  {
    id: 10,
    type: "text",
    question:
      "Quý khách đã từng truyền máu, truyền tiểu cầu hoặc các chế phẩm máu nào không? Nếu có thì lý do là gì? Khi nào?",
    anwers: "",
  },
  {
    id: 11,
    type: "text_row",
    question:
      "Liệt kê các phẫu thuật mà Quý khách từng thực hiện và ghi chú nếu có biến chứng:",
    child: [
      {
        child_id: 0,
        child_answer: [
          {
            anwers: "",
            title: "Phẫu thuật:",
          },
          { anwers: "", title: "Năm:" },
          {
            anwers: "",
            title: "Biến chứng (nếu có):",
          },
        ],
      },
      {
        child_id: 1,
        child_answer: [
          {
            anwers: "",
            title: "Phẫu thuật:",
          },
          { anwers: "", title: "Năm:" },
          {
            anwers: "",
            title: "Biến chứng (nếu có):",
          },
        ],
      },
      {
        child_id: 2,
        child_answer: [
          {
            anwers: "",
            title: "Phẫu thuật:",
          },
          { anwers: "", title: "Năm:" },
          {
            anwers: "",
            title: "Biến chứng (nếu có):",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    type: "radio_custom",
    question: "Thói quen:",
    child: [
      {
        child_id: 0,
        title: "Hút thuốc lá",
        child_answer: [
          {
            anwers: "",
            title: "Chưa từng hút",
          },
          {
            anwers: "",
            title: "Từng hút và đã bỏ:",
          },
          {
            anwers: "",
            title: "Hiện đang còn hút",
          },
        ],
      },
      {
        child_id: 1,
        title: "Uống rượu bia",
        child_answer: [
          { anwers: "", title: "Có" },
          { anwers: "", title: "Không" },
        ],
      },
      {
        child_id: 2,
        title: "Sử dụng thuốc giảm đau",
        child_answer: [
          { anwers: "", title: "Có" },
          { anwers: "", title: "Không" },
        ],
      },
    ],
  },
  {
    id: 13,
    type: "text",
    question:
      "Dị ứng thuốc: Vui lòng liệt kê bất kỳ loại thuốc nào mà Quý khách có tiền sử bị dị ứng",
    anwers: "",
  },
  {
    id: 14,
    type: "text_row",
    question:
      "Thuốc đang uống: Vui lòng liệt kê các loại thuốc mà Quý khách sử dụng thường xuyên",
    child: [
      {
        child_id: 0,
        child_answer: [
          { anwers: "", title: "Thuốc:" },
          { anwers: "", title: "Liều:" },
          {
            anwers: "",
            title: "Số lần uống mỗi ngày:",
          },
        ],
      },
      {
        child_id: 1,
        child_answer: [
          { anwers: "", title: "Thuốc:" },
          { anwers: "", title: "Liều:" },
          {
            anwers: "",
            title: "Số lần uống mỗi ngày:",
          },
        ],
      },
      {
        child_id: 2,
        child_answer: [
          { anwers: "", title: "Thuốc:" },
          { anwers: "", title: "Liều:" },
          {
            anwers: "",
            title: "Số lần uống mỗi ngày:",
          },
        ],
      },
    ],
  },
  {
    id: 15,
    type: "text",
    question:
      "Kể tên tất cả các thuốc khác mà Quý khách có sử dụng trong vòng 6 tháng vừa qua",
    anwers: "",
  },
  {
    id: 16,
    type: "field",
    question:
      "Tiền sử gia đình: Quý khách hãy liệt kê các vấn đề sức khỏe/ bệnh lý mắc phải của từng thành viên trong gia đình sau đây:",
    child: [
      { id: 0, title: "Bố ruột:", anwser: "" },
      { id: 1, title: "Mẹ ruột:", anwser: "" },
      {
        id: 2,
        title: "Anh/Em trai ruột:",
        anwser: "",
      },
      {
        id: 3,
        title: "Chị/Em gái ruột:",
        anwser: "",
      },
    ],
  },
  {
    id: 17,
    type: "radio",
    question:
      "Quý khách có bất kỳ người thân hay họ hàng có quan hệ huyết thống trong gia đình có các bệnh lý liệt kê dưới đây không?",
    child: [
      {
        child_id: 0,
        child_question: "Ung thư vú",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 1,
        child_question: "Ợ nóng mạn tính",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 2,
        child_question: "Ung thư đại tràng",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 3,
        child_question: "Polyp đại tràng",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 4,
        child_question: "Bệnh Crohn/ Viêm loét đại tràng",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 5,
        child_question: "Đái tháo đường",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 6,
        child_question: "Rối loạn tâm thần",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 7,
        child_question: "Ung thư thực quản/ rối loạn thực quản",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 8,
        child_question: "Bệnh túi mật",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 9,
        child_question: "Bệnh tim mạch",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 10,
        child_question: "Tăng huyết áp",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 11,
        child_question: "Bệnh thận",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 12,
        child_question: "Ung thư buồng trứng",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 13,
        child_question: "Ung thư tụy/bệnh lý tụy",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 14,
        child_question: "Loét dạ dày – tá tràng",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 15,
        child_question: "Polyp dạ dày/ ung thư dạ dày",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 16,
        child_question: "Đột quỵ/ tai biến mạch máu não/ động kinh",
        child_answer: ["Có", "Không", "Không rõ"],
      },
      {
        child_id: 17,
        child_question: "Các loại ung thư khác",
        child_answer: ["Có", "Không", "Không rõ"],
      },
    ],
  },
  {
    id: 18,
    type: "group_radio",
    question:
      "Lược qua các cơ quan: Hiện tại hoặc gần đây Quý khách có bất kỳ triệu chứng nào sau đây không (hoặc liệu Quý khách có từng bị các triệu chứng này rõ và gây khó chịu trong quá khứ không)?",
    child: [
      {
        id: 1,
        title: "Mệt mỏi",
        anwers: ["Có", "Không"],
      },
      {
        id: 2,
        title: "Chán ăn",
        anwers: ["Có", "Không"],
      },
      {
        id: 3,
        title: "Sút cân",
        anwers: ["Có", "Không"],
      },
      {
        id: 4,
        title: "Sốt",
        anwers: ["Có", "Không"],
      },
      {
        id: 5,
        title: "Lạnh run",
        anwers: ["Có", "Không"],
      },
      {
        id: 6,
        title: "Đổ mồ hôi trộm về đêm",
        anwers: ["Có", "Không"],
      },
      {
        id: 7,
        title: "Các vấn đề về mắt, mũi, tai, họng",
        anwers: ["Có", "Không"],
      },
      {
        id: 8,
        title: "Chảy máu mũi",
        anwers: ["Có", "Không"],
      },
      {
        id: 9,
        title: "Loét miệng",
        anwers: ["Có", "Không"],
      },
      {
        id: 10,
        title: "Đau mắt",
        anwers: ["Có", "Không"],
      },
      {
        id: 11,
        title: "Ho khan",
        anwers: ["Có", "Không"],
      },
      {
        id: 12,
        title: "Ho đàm",
        anwers: ["Có", "Không"],
      },
      {
        id: 13,
        title: "Khò khè",
        anwers: ["Có", "Không"],
      },
      {
        id: 14,
        title: "Khó thở khi gắng sức",
        anwers: ["Có", "Không"],
      },
      {
        id: 15,
        title: "Khó thở cả khi nghỉ ngơi",
        anwers: ["Có", "Không"],
      },
      {
        id: 16,
        title: "Khó thở cả khi nằm",
        anwers: ["Có", "Không"],
      },
      {
        id: 17,
        title: "Đau ngực",
        anwers: ["Có", "Không"],
      },
      {
        id: 18,
        title: "Tim đập không đều",
        anwers: ["Có", "Không"],
      },
      {
        id: 19,
        title: "Phù chân",
        anwers: ["Có", "Không"],
      },
      {
        id: 20,
        title: "Đau nhức chân khi đi lại hoặc khi tập thể thao",
        anwers: ["Có", "Không"],
      },
      {
        id: 21,
        title: "Đau nhức chân cả khi nghỉ ngơi",
        anwers: ["Có", "Không"],
      },
      {
        id: 22,
        title: "Đau lưng",
        anwers: ["Có", "Không"],
      },
      {
        id: 23,
        title: "Không thể chịu được nóng hoặc lạnh",
        anwers: ["Có", "Không"],
      },
      {
        id: 24,
        title: "Run tay",
        anwers: ["Có", "Không"],
      },
      {
        id: 25,
        title: "Rậm lông tóc",
        anwers: ["Có", "Không"],
      },
      {
        id: 26,
        title: "Lông tóc thưa",
        anwers: ["Có", "Không"],
      },
      {
        id: 27,
        title: "Khát nước nhiều",
        anwers: ["Có", "Không"],
      },
      {
        id: 28,
        title: "Đi tiểu nhiều",
        anwers: ["Có", "Không"],
      },
      {
        id: 29,
        title: "Nuốt khó/ nghẹn",
        anwers: ["Có", "Không"],
      },
      {
        id: 30,
        title: "Nuốt đau",
        anwers: ["Có", "Không"],
      },
      {
        id: 31,
        title: "Ợ nóng/ Ợ chua",
        anwers: ["Có", "Không"],
      },
      {
        id: 32,
        title: "Ợ trớ thức ăn/dịch dạ dày",
        anwers: ["Có", "Không"],
      },
      {
        id: 33,
        title: "Buồn nôn",
        anwers: ["Có", "Không"],
      },
      {
        id: 34,
        title: "Nôn",
        anwers: ["Có", "Không"],
      },
      {
        id: 35,
        title: "Đau bụng",
        anwers: ["Có", "Không"],
      },
      {
        id: 36,
        title: "Chướng bụng",
        anwers: ["Có", "Không"],
      },
      {
        id: 37,
        title: "Tiêu chảy",
        anwers: ["Có", "Không"],
      },
      {
        id: 38,
        title: "Táo bón",
        anwers: ["Có", "Không"],
      },
      {
        id: 39,
        title: "Đi cầu ra máu",
        anwers: ["Có", "Không"],
      },
      {
        id: 40,
        title: "Vàng da",
        anwers: ["Có", "Không"],
      },
      {
        id: 41,
        title: "Ngứa da mức độ nhiều",
        anwers: ["Có", "Không"],
      },
      {
        id: 42,
        title: "Đi cầu khó (phải rặn nhiều)",
        anwers: ["Có", "Không"],
      },
      {
        id: 43,
        title: "Đi tiểu buốt",
        anwers: ["Có", "Không"],
      },
      {
        id: 44,
        title: "Đau khớp",
        anwers: ["Có", "Không"],
      },
      {
        id: 45,
        title: "Lo âu",
        anwers: ["Có", "Không"],
      },
      {
        id: 46,
        title: "Trầm cảm",
        anwers: ["Có", "Không"],
      },
      {
        id: 47,
        title: "Bị ngất",
        anwers: ["Có", "Không"],
      },
      {
        id: 48,
        title: "Chóng mặt",
        anwers: ["Có", "Không"],
      },
      {
        id: 49,
        title: "Nhìn đôi/ song thị (nhìn thấy hai hình ảnh của một đối tượng)",
        anwers: ["Có", "Không"],
      },
      {
        id: 50,
        title: "Mất thăng bằng hoặc khả năng phối hợp động tác",
        anwers: ["Có", "Không"],
      },
      {
        id: 51,
        title: "Rối loạn ngôn ngữ",
        anwers: ["Có", "Không"],
      },
      {
        id: 52,
        title: "Teo tinh hoàn (đối với nam giới)",
        anwers: ["Có", "Không"],
      },
      {
        id: 53,
        title: "Rối loạn kinh nguyệt (đối với nữ giới)",
        anwers: ["Có", "Không"],
      },
      {
        id: 54,
        title: "Bạn có đang mang thai? (đối với nữ giới)",
        anwers: ["Có", "Không"],
      },
    ],
  },
];

export const dataNotify = {
  data: {
    data: [
      {
        message_id: "e6ab7940-c755-4b21-9e7b-ff9498e89713",
        message_title: "Kết quả Xét nghiệm",
        message_content:
          "Xin chào Chị Châu! Hiện đã có kết quả Xét nghiệm. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Xét nghiệm.",
        data_type: "LABTEST_RESULT",
        data_id: "23121110580037",
        card_id: "7a7bf333-c7f3-4a90-8321-d8003146cfb0",
        is_read: false,
        write_date: "2023-12-26T13:51:52.703+07:00",
      },
      {
        message_id: "dbee7a29-93fe-4be5-8cf6-e5b3cd1adf45",
        message_title: "Kết quả Đo Điện Tim",
        message_content:
          "Xin chào Chị Châu! Quá trình thực hiện Đo Điện Tim đã hoàn tất. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Đo Điện Tim.",
        data_type: "IMAGING_RESULT",
        data_id: "23121110580037",
        card_id: "f7cbaebd-bf5b-4e5a-b719-d128efb0c0b4",
        is_read: false,
        write_date: "2023-12-26T12:05:47.477+07:00",
      },
      {
        message_id: "f8a8afdb-c4c4-4b09-9194-7e42c8bee8f2",
        message_title: "Kết quả Chụp Xquang Ngực Thẳng",
        message_content:
          "Xin chào Chị Châu! Quá trình thực hiện Chụp Xquang Ngực Thẳng đã hoàn tất. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Chụp Xquang Ngực Thẳng.",
        data_type: "IMAGING_RESULT",
        data_id: "23121110580037",
        card_id: "b9e0a922-69db-4e8b-9182-3648827a6607",
        is_read: false,
        write_date: "2023-12-26T10:34:34.853+07:00",
      },
      {
        message_id: "2eb1705d-1d61-4ea0-86c9-8ec2b5da4157",
        message_title: "Kết quả Siêu Âm Bụng Tổng Quát",
        message_content:
          "Xin chào Chị Châu! Quá trình thực hiện Siêu Âm Bụng Tổng Quát đã hoàn tất. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Siêu Âm Bụng Tổng Quát.",
        data_type: "IMAGING_RESULT",
        data_id: "23121110580037",
        card_id: "6d2cf41d-efd6-428b-bae7-3d45462b75f8",
        is_read: false,
        write_date: "2023-12-26T10:19:04.337+07:00",
      },
      {
        message_id: "f3b188b7-6b9e-4802-9011-e7e64fe41ede",
        message_title: "Kết quả Siêu âm tuyến vú",
        message_content:
          "Xin chào Chị Châu! Quá trình thực hiện Siêu âm tuyến vú đã hoàn tất. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Siêu âm tuyến vú.",
        data_type: "IMAGING_RESULT",
        data_id: "23121110580037",
        card_id: "c06f373e-6612-412a-8702-6c709263db91",
        is_read: false,
        write_date: "2023-12-26T10:16:40+07:00",
      },
      {
        message_id: "80cd57db-0f4f-4ba6-989d-ead30447f1cf",
        message_title: "Kết quả Siêu Âm Tuyến Giáp",
        message_content:
          "Xin chào Chị Châu! Quá trình thực hiện Siêu Âm Tuyến Giáp đã hoàn tất. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Siêu Âm Tuyến Giáp.",
        data_type: "IMAGING_RESULT",
        data_id: "23121110580037",
        card_id: "494339aa-fd09-4ad2-9e84-ca98029f0b89",
        is_read: false,
        write_date: "2023-12-26T10:14:11.593+07:00",
      },
      {
        message_id: "c7dad77c-e258-4faf-a59b-591954a5e9b8",
        message_title: "Đặt lịch khám thành công - Ngày giờ: 25-12-2023 06:00",
        message_content:
          "Chào Chị Châu! Lịch khám của Chị vào lúc 25-12-2023 06:00 đã được chuyển đến các Bác sĩ chuyên môn Doctor Check. Mong Chị sắp xếp đến đúng theo lịch hẹn để gặp Bác sĩ khám bệnh. Xin cảm ơn Chị Châu rất nhiều!",
        data_type: "APPOINTMENT",
        data_id: "23121110580037",
        card_id: "23121110580037",
        is_read: false,
        write_date: "2023-12-11T10:58:34.39+07:00",
      },
      {
        message_id: "1e1b8343-a9c9-4867-b624-a29c243cadc1",
        message_title: "Kết quả Xét nghiệm",
        message_content:
          "Xin chào Chị Châu! Hiện đã có kết quả Xét nghiệm. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Xét nghiệm.",
        data_type: "LABTEST_RESULT",
        data_id: "23082908450012",
        card_id: "16b0c39f-dd82-4252-ba60-aedb897accaf",
        is_read: true,
        write_date: "2023-08-29T12:15:26.253+07:00",
      },
      {
        message_id: "4e86ba85-8248-49b1-9172-5f1c235a3be5",
        message_title: "Kết quả Đo Điện Tim",
        message_content:
          "Xin chào Chị Châu! Quá trình thực hiện Đo Điện Tim đã hoàn tất. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Đo Điện Tim.",
        data_type: "IMAGING_RESULT",
        data_id: "23082908450012",
        card_id: "f3c83065-c835-4682-a095-5c1c30cc8463",
        is_read: false,
        write_date: "2023-08-29T11:22:23.97+07:00",
      },
      {
        message_id: "ee1ec0b3-5c37-43b4-a385-f482fb10ae21",
        message_title: "Kết quả Chụp Xquang Ngực Thẳng",
        message_content:
          "Xin chào Chị Châu! Quá trình thực hiện Chụp Xquang Ngực Thẳng đã hoàn tất. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Chụp Xquang Ngực Thẳng.",
        data_type: "IMAGING_RESULT",
        data_id: "23082908450012",
        card_id: "209098e5-fb24-416d-b624-cbe40c63ad21",
        is_read: false,
        write_date: "2023-08-29T11:19:02.667+07:00",
      },
      {
        message_id: "cb73f694-7086-4367-989a-23bc6d6b603b",
        message_title: "Kết quả Siêu Âm Bụng Tổng Quát",
        message_content:
          "Xin chào Chị Châu! Quá trình thực hiện Siêu Âm Bụng Tổng Quát đã hoàn tất. Vui lòng nhấn vào thông báo này để xem chi tiết kết quả Siêu Âm Bụng Tổng Quát.",
        data_type: "IMAGING_RESULT",
        data_id: "23082908450012",
        card_id: "65e80541-6aa9-4e2a-9f25-982e11da9fdd",
        is_read: false,
        write_date: "2023-08-29T11:15:50.473+07:00",
      },
      {
        message_id: "7ff07486-65de-45b6-8799-d07286c0b9a3",
        message_title: "Đặt lịch khám thành công - Ngày giờ: 29-08-2023 09:00",
        message_content:
          "Chào Chị Châu! Lịch khám của Chị vào lúc 29-08-2023 09:00 đã được chuyển đến các Bác sĩ chuyên môn Doctor Check. Mong Chị sắp xếp đến đúng theo lịch hẹn để gặp Bác sĩ khám bệnh. Xin cảm ơn Chị Châu rất nhiều!",
        data_type: "APPOINTMENT",
        data_id: "23082908450012",
        card_id: "23082908450012",
        is_read: false,
        write_date: "2023-08-29T08:45:35.323+07:00",
      },
    ],
    paging: {
      page_number: 1,
      page_size: 100,
      total_count: 12,
      total_page: 1,
      has_previous_page: false,
      has_next_page: false,
    },
  },
  message: "Danh sách tin nhắn của người dùng APP...",
  status: true,
  total_items: 12,
  client_ip: "115.78.6.132",
};

export const fakeDataDetailBooking = {}


export const relationtypes = [
  {
    id: 1,
    name: "Chính Tôi",
  },
  {
    id: 2,
    name: "Vợ Chồng",
  },
  {
    id: 3,
    name: "Cha Mẹ",
  },
  {
    id: 4,
    name: "Ông Bà",
  },
  {
    id: 5,
    name: "Con",
  },
  {
    id: 6,
    name: "Cháu",
  },
  {
    id: 7,
    name: "Anh Chị Em",
  },
  {
    id: 9,
    name: "Cô Chú Bác",
  },
  {
    id: 10,
    name: "Bạn Bè",
  },
];

export const sss = [
  {
    username: "0961664550",
    customer_id: "DC24030909310005",
    customer_fullname: "NGUYỄN TRẦN NHƯ Ý",
    gender: "Nữ",
    year_of_birth: 2000,
    age: 24,
    relation_type_id: 9,
    relationship_type_name: "Cô Chú Bác",
  },
  {
    username: "0961664550",
    customer_id: "DC24030909260004",
    customer_fullname: "NGUYỄN THỊ HOA",
    gender: "Nữ",
    year_of_birth: 2000,
    age: 24,
    relation_type_id: 6,
    relationship_type_name: "Cháu",
  },
  {
    username: "0961664550",
    customer_id: "DC23051511120013",
    customer_fullname: "NGUYỄN QUỐC ĐẠI",
    gender: "Nam",
    year_of_birth: 1999,
    age: 25,
    relation_type_id: 1,
    relationship_type_name: "Chính Tôi",
  },
];

