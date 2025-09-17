import React from "react";
import Barcode from 'react-jsbarcode';
interface BarCodeProps {
  value: string;
  config?: object;
}

const BarCode: React.FC<BarCodeProps> = ({
  value,
  config,
}) => {
  return <div className="a-barcode">
    <Barcode
      value={value}
      options={{
        format: 'code128',
        height: 50,
        fontSize: 14,
        ...config
      }}
    />
  </div>
};

BarCode.defaultProps = {
};

export default BarCode;
