import moment from "moment";
import {
  zmp,
} from "zmp-framework/react";

export function mapModifiers(
  baseClassName: string,
  ...modifiers: (string | string[] | false | undefined)[]
): string {
  return modifiers
    .reduce<string[]>(
      (acc, m) => (!m ? acc : [...acc, ...(typeof m === "string" ? [m] : m)]),
      []
    )
    .map((m) => `-${m}`)
    .reduce<string>(
      (classNames, suffix) => `${classNames} ${baseClassName}${suffix}`,
      baseClassName
    );
}

function padZero(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export function formatDate(date: Date, format?: string): string {
  return moment(date).format(format || "HH:mm - DD/MM/YYYY");
}

export const formatNumber = (number: number): string => {
  // Chia số thành các phần hàng nghìn
  const parts = number.toString()?.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Kết hợp lại và trả về số đã định dạng
  return parts.join(".");
};

const checkEvenOrOdd = (number: number): boolean => {
  return number % 2 === 0;
};

export const copyClipboard = (text: string, callBack?: () => void) => {
  const tempElement = document.createElement("textarea");
  tempElement.value = text;

  // Thêm thẻ tạm thời vào DOM
  document.body.appendChild(tempElement);

  // Chọn và sao chép nội dung vào Clipboard
  tempElement.select();
  document.execCommand("copy");
  if (callBack) callBack();

  // Loại bỏ thẻ tạm thời khỏi DOM
  document.body.removeChild(tempElement);
};

export function handleConvertPCD(data: any) {
  const newData: any = [];

  data?.forEach((item: any, index: any) => {
    const { service_group_id, service_group_name } = item;
    const existingGroup = newData.find(
      (group: any) => group?.group_id === service_group_id
    );

    if (existingGroup) {
      existingGroup.child.push(item);
    } else {
      const newGroup = {
        group_id: service_group_id,
        group_name: service_group_name,
        child: [item],
      };

      newData.push(newGroup);
    }
  });

  return newData;
}

export function handleConvertXN(data: any) {
  const newData: any = [];

  data?.forEach((item: any, index: any) => {
    const { labtests_group_id, labtests_group_name } = item;
    const existingGroup = newData.find(
      (group: any) => group?.group_id === labtests_group_id
    );

    if (existingGroup) {
      existingGroup.child.push(item);
    } else {
      const newGroup = {
        group_id: labtests_group_id,
        group_name: labtests_group_name,
        child: [item],
      };

      newData.push(newGroup);
    }
  });

  return newData;
}

export function handleConverPackage(data: any, packageGroup) {
  const newData: any = packageGroup
    ?.map((item: any, index: any) => {
      const newItem = {
        ...item,
        items: data?.filter(
          (record) => record.service_group_id === item.service_group_id
        ),
      };

      return newItem;
    })
    ?.filter((fil) => fil?.items?.length > 0);

  return newData;
}

const openToast = (pos:'top' | 'bottom', ElementRef: any, text: string) => {
  // Tạo toast
  switch (pos) {
    case "top":
      if (!ElementRef.current) {
        ElementRef.current = zmp.toast.create({
          text: text,
          position: "top",
          closeTimeout: 5000,
        });
      }
      // Mở
      ElementRef.current.open();
      break;
    default: {
      if (!ElementRef.current) {
        ElementRef.current = zmp.toast.create({
          text: text,
          position: "bottom",
          closeTimeout: 2000,
        });
      }
      // Mở
      ElementRef.current.open();
    }
  }
};

export const downloadBlobPDF = (base64Data: any, fileName: string) => {
  // Chuyển đổi base64 thành mảng byte
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Tạo một blob từ mảng byte
  const blob = new Blob([byteArray], { type: "application/pdf" });

  // Tạo URL cho blob và tạo một liên kết tải xuống
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  // Thêm liên kết vào DOM và kích hoạt sự kiện nhấp chuột
  document.body.appendChild(link);
  link.click();

  // Giải phóng tài nguyên sau khi tải xuống hoàn tất
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};