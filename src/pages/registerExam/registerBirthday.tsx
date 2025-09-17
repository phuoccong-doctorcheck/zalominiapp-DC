import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Icon, Input, Page, Slider, Text } from "zmp-ui";
import banner from "./images/img_age.jpg";
import "./styles.scss";
import { mapModifiers } from "../../utils/functions";
import { useAppDispatch, useAppSelector } from "../../redux/common/hooks";
import { setDataRegister } from "../../redux/register";
import { getDaysInMonth } from "date-fns";
import YearPicker from "../../components/atoms/YearPicker";


const MonthPicker = ({ onMonthClick }) => {
  const dataRegister = useAppSelector((state) => state.register.stateRegister);

  const [monthState, setMonthState] = useState(dataRegister.month_of_birth);

  useEffect(() => {
    setMonthState(dataRegister.month_of_birth)
   }, [dataRegister])

  return (
    <Box className="month-picker_wrapper">
      {Array.from({ length: 12 }, (_, index) => index + 1).map((month, index) => (
        <div
          key={index}
          className={mapModifiers(`month-picker_wrapper_item`, monthState === month && 'active')}
          onClick={() => onMonthClick(month)}
        >
          <Text>{month}</Text>
        </div>
      ))}
    </Box>
  );
};

const DayPicker = ({ onMonthClick }) => {
  const dataRegister = useAppSelector((state) => state.register.stateRegister);

  const [dayState, setDayState] = useState(dataRegister.day_of_birth);
  const [dayInMonth, setDayInMonth] = useState(getDaysInMonth(new Date(dataRegister.year_of_birth, dataRegister.month_of_birth - 1)));

  useEffect(() => {
    setDayState(dataRegister.day_of_birth)
    setDayInMonth(getDaysInMonth(new Date(dataRegister.year_of_birth, dataRegister.month_of_birth - 1)))
  }, [dataRegister])

  return (
    <Box className="day-picker_wrapper">
      {Array.from({ length: dayInMonth }, (_, index) => index + 1).map((date, index) => (
        <div
          key={index}
          className={mapModifiers(`day-picker_wrapper_item`, dayState === date && 'active')}
          onClick={() => onMonthClick(date)}
        >
          <Text>{date}</Text>
        </div>
      ))}
    </Box>
  );
};

const RegisterBirthday: React.FC = () => {
  const dispatch = useAppDispatch();

  const dataRegister = useAppSelector((state) => state.register.stateRegister);

  const [states, setStates] = useState({
    ...dataRegister
  })

  useEffect(() => {
    setStates({
      ...dataRegister
    })
  }, [dataRegister])

    const typePicker = [
      {
        id: 3,
        title: "Năm",
        type: "year",
        component: (
          <Box className="year-picker_wrapper">
            <YearPicker
              initialYear={states.year_of_birth}
              value={2000}
              onChange={(year) => {
                dispatch(setDataRegister({
                  ...states,
                  year_of_birth: year
                }))
              }}
            />
          </Box>
        ),
      },
      {
        id: 2,
        title: "Tháng",
        type: "month",
        component: (
          <MonthPicker
            onMonthClick={(month) => {
              dispatch(setDataRegister({
                ...states,
                month_of_birth: month
              }))
            }}
          />
        ),
      },
      {
        id: 1,
        title: "Ngày",
        type: "date",
        component: <DayPicker onMonthClick={(date) => {
          dispatch(setDataRegister({
            ...states,
            day_of_birth: date
          }))
        }}/>,
      },
    ];

  useEffect(() => {
    setTabActive({ ...tabActive })
  }, [states]);

  const [tabActive, setTabActive] = useState({
    id: typePicker[0].id,
    component: typePicker[0].component,
    day: 1,
    month: 1,
    year: 1,
  });


  const memoryRender = useMemo(() => {
    return (
      <Box className="p-register_birthday_picker">
        <Box className="p-register_birthday_picker_wrapper">
          {typePicker.map((item) => (
            <Box
              key={item.id}
              className={mapModifiers(
                "p-register_birthday_picker_item",
                tabActive.id === item.id && "active"
              )}
              onClick={() => {
                setTabActive({
                  ...tabActive,
                  id: item.id,
                  component: item.component,
                });
              }}
            >
              <Box>{item.title}</Box>
            </Box>
          ))}
        </Box>
        <Box className="p-register_birthday_picker_component">
          {tabActive.component}
        </Box>
      </Box>
    )
  }, [states, tabActive])

  return (
    <Page className="p-register_birthday">
      <Box className="p-register_birthday_header">
        <Slider label="Bước 4/7" defaultValue={50} max={7} min={0} value={4} />
        <div className="p-register_birthday_header_back">
          <Icon icon="zi-arrow-left" className="font-bold" />
        </div>
      </Box>
      <Box className="p-register_birthday_banner">
        <img src={banner} alt="banner" />
      </Box>
      <Box className="p-register_birthday_text">
        <Text>Ngày sinh của bạn vào</Text>
        <p>
          Ngày <strong>{states.day_of_birth}</strong>, tháng <strong>{states.month_of_birth}</strong>, năm <strong>{ states.year_of_birth}</strong>
        </p>
      </Box>
      {memoryRender}
      <Box className="p-register_birthday_button">
        <Button>
          <Icon icon="zi-chevron-left" /> Quay lại
        </Button>
        <Button>
          Tiếp theo <Icon icon="zi-chevron-right" />
        </Button>
      </Box>
    </Page>
  );
};

export default RegisterBirthday;
