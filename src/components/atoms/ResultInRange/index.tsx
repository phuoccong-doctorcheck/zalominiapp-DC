// import React, { useEffect, useState } from "react";
// import { Box, Text } from "zmp-ui";
// import "./index.scss";
// import { mapModifiers } from "../../../utils/functions";

// interface RangeResultProps {
//   min: number;
//   max: number;
//   index: any;
//   isNormal: boolean;
//   isHigher: boolean;
//   isLower: boolean;
// }

// const RangeResult: React.FC<RangeResultProps> = ({
//   index,
//   min,
//   max,
//   isLower,
//   isHigher,
//   isNormal,
// }) => {
//   const [state, setState] = useState([]);
//   const i18nConvert = {
//     NEGATIVE: "Âm tính",
//     NORMAL: "Bình thường",
//     };
    
//     const i18nConvertColor = {
//         NEGATIVE: "#44b678",
//     };

//   const listConvert = ["NEGATIVE", "NORMAL"];

//   const handleRenderResult = (flag: boolean) => {
//     if (listConvert.includes(index as any)) {
//       return i18nConvert[index];
//     } else {
//         if (isHigher) return flag ? "Cao" : "higher";
//         if (isLower) return flag ? "Thấp" : "lower";
//         return flag ? "Bình thường" : "normal";
//     }
//   };

//     const handleReturnColor = () => {
//         if (listConvert.includes(index as any) ) {
//             return i18nConvertColor[index];
//         } else {
//             if (isHigher || index.search('POS') !== -1) return '#d54837';
//             if (isLower) return '#fbb90d';
//             if (isNormal) return '#000';
//         }
//   }

//   return (
//     <Box className={`${mapModifiers("a-range")}`}>
//           {(listConvert.includes(index as any) || index.search('POS') !== -1 || index.search('NEG ') !== -1) ? (
//         <Box flex justifyContent="flex-end">
//                   <Text className={`font-bold`} style={{ color: handleReturnColor() }}>{listConvert.includes(index as any) ? i18nConvert[index] : index}</Text>
//         </Box>
//       ) : (
//         <>
//           <Box
//             className={`${mapModifiers(
//               "a-range_top",
//               isHigher && "higher",
//               isNormal && "normal",
//               isLower && "lower"
//             )}`}
//           >
//             <Text>Kết quả: {handleRenderResult(true)}</Text>
//             <p>
//               {listConvert.includes(index as any) ? i18nConvert[index] : index}
//             </p>
//           </Box>
//           <Box className={`${mapModifiers("a-range_slider")}`}>
//             <div className="a-range_slider_syb">
//               <span>-</span>
//               <span>{min}</span>
//               <span>{max}</span>
//               <span>+</span>
//             </div>
//             <div
//               className={mapModifiers(
//                 "a-range_slider_main",
//                   isHigher && "higher",
//                   isNormal && "normal",
//                   isLower && "lower"
//               )}
//             >
//               {isLower ? ( <input min={1} max={100} value={50} type="range" /> ) : ( <span className="a-range_slider-down" /> )}
//               {isNormal ? ( <input min={min} max={max} value={Number(index)} type="range" /> ) : ( <span className="a-range_slider-normal" /> )}
//               {isHigher ? ( <input min={1} max={100} value={50} type="range" /> ) : ( <span className="a-range_slider-higher" /> )}
//             </div>
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

// RangeResult.defaultProps = {};

// export default RangeResult;


import React, { useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import "./index.scss";
import { mapModifiers } from "../../../utils/functions";

interface RangeResultProps {
  min: number;
  max: number;
  index: any;
  isNormal: boolean;
  isHigher: boolean;
  isLower: boolean;
}

const RangeResult: React.FC<RangeResultProps> = ({
  index,
  min,
  max,
  isLower,
  isHigher,
  isNormal,
}) => {
  const [state, setState] = useState([]);
  const i18nConvert = {
    NEGATIVE: "Âm tính",
    NORMAL: "Bình thường",
  };

  const i18nConvertColor = {
    NEGATIVE: "#44b678",
  };

  const listConvert = ["NEGATIVE", "NORMAL"];

  const handleRenderResult = (flag: boolean) => {
    if (listConvert.includes(index as any)) {
      return i18nConvert[index];
    } else {
      if (isHigher) return flag ? "Cao" : "higher";
      if (isLower) return flag ? "Thấp" : "lower";
      return flag ? "Bình thường" : "normal";
    }
  };

  const handleReturnColor = () => {
    if (listConvert.includes(index as any)) {
      return i18nConvertColor[index];
    } else {
      if (isHigher || index.search("POS") !== -1) return "#d54837";
      if (isLower) return "#fbb90d";
      if (isNormal) return "#000";
    }
  };

  return (
    <Box className={`${mapModifiers("a-range")}`}>
      {(listConvert.includes(index as any) ||
        index.search("POS") !== -1 ||
        index.search("NEG ") !== -1) ? (
        <Box flex justifyContent="flex-end">
          <Text className={`font-bold`} style={{ color: handleReturnColor() }}>
            {listConvert.includes(index as any) ? i18nConvert[index] : index}
          </Text>
        </Box>
      ) : (
        <>
          <Box
            className={`${mapModifiers(
              "a-range_top",
              isHigher && "higher",
              isNormal && "normal",
              isLower && "lower"
            )}`}
          >
            <Text>Kết quả: {handleRenderResult(true)}</Text>
            <p>{listConvert.includes(index as any) ? i18nConvert[index] : index}</p>
          </Box>
          <Box className={`${mapModifiers("a-range_slider")}`}>
            <div className="a-range_slider_syb">
              <span>-</span>
              <span>{min}</span>
              <span>{max}</span>
              <span>+</span>
            </div>
            <div
              className={mapModifiers(
                "a-range_slider_main",
                isHigher && "higher",
                isNormal && "normal",
                isLower && "lower"
              )}
            >
              {isLower ? (
                <input
                  min={1}
                  max={100}
                  value={50}
                  type="range"
                  readOnly // Đặt thành readOnly
                />
              ) : (
                <span className="a-range_slider-down" />
              )}
              {isNormal ? (
                <input
                  min={min}
                  max={max}
                  value={Number(index)}
                  type="range"
                  readOnly // Đặt thành readOnly
                />
              ) : (
                <span className="a-range_slider-normal" />
              )}
              {isHigher ? (
                <input
                  min={1}
                  max={100}
                  value={50}
                  type="range"
                  readOnly // Đặt thành readOnly
                />
              ) : (
                <span className="a-range_slider-higher" />
              )}
            </div>
          </Box>
        </>
      )}
    </Box>
  );
};

RangeResult.defaultProps = {};

export default RangeResult;
