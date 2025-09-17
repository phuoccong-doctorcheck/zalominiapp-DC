import React, { useState } from "react";
import { Box, Button, Icon, Input, Page, Slider, Text } from "zmp-ui";
import banner from './images/img_choose_gender.jpg'
import femaleActive from './images/ic_female_active.svg'
import female from './images/ic_female_inactive.svg'
import maleActive from './images/ic_male_active.svg'
import male from './images/ic_male_inactive.svg'
import './styles.scss'
import { mapModifiers } from "../../utils/functions";

const RegisterGender: React.FC = () => {
    const [genderActive, setGenderActive] = useState('male')

    const gender = [
        { id: 1, img: male, imgActive: maleActive, group: 'male', text: 'Nam'},
        { id: 0, img: female, imgActive: femaleActive, group: 'female',text: 'Nữ'},
    ]
    
    return (
        <Page className="p-register_gender">
            <Box className="p-register_gender_header">
                <Slider
                    label="Bước 3/7"
                    defaultValue={50}
                    max={7}
                    min={0}
                    value={3}
                />
                <div className="p-register_gender_header_back">
                    <Icon icon="zi-arrow-left" className="font-bold" />
                </div>
            </Box>
            <Box className="p-register_gender_banner">
                <img src={banner} alt="banner" />
            </Box>
            <Box className="p-register_gender_heading">
                <Text>Giới tính của bạn</Text>
                <p>Hãy cho Doctor Check biết giới tính của bạn để tăng trải nghiệm sử dụng hoàn hảo nhất</p>
            </Box>
            <Box className="p-register_gender_choose">
                {gender.map((item) => (
                    <Box
                        key={item.id}
                        className={mapModifiers("p-register_gender_choose_item", genderActive === item.group && 'active')}
                        onClick={()=>setGenderActive(item.group)}
                    >
                        <img src={genderActive === item.group ? item.imgActive :item.img} />
                        <Text>{ item.text}</Text>
                    </Box>
            ))}
            </Box>
            <Box className="p-register_gender_button">
                <Button><Icon icon="zi-chevron-left" /> Quay lại</Button>
                <Button>Tiếp theo <Icon icon="zi-chevron-right" /></Button>
            </Box>
        </Page>
    )
}

export default RegisterGender;