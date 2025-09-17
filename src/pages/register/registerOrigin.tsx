import React, { useState } from "react";
import { Page, Box, Slider, Icon, Text, Button } from "zmp-ui";
import './styles.scss'
import banner from './images/img_choose_gender.jpg'
import { mapModifiers } from "../../utils/functions";

const RegisterOrigin: React.FC = () => {
    const [originActive, setOriginActive] = useState(0);

    const origin = [
        {id: 1, title: 'Khám tiêu hóa từ Facebook', value:'TH-FB'},
        {id: 2, title: 'Khám tiêu hóa từ Google', value:'TH-GG'},
        {id: 3, title: 'Khám tổng quát từ Facebook', value:'TQ-FB'},
        { id: 4, title: 'Khám tổng quát từ Google', value:'TQ-GG'},
    ]

    return (
        <Page className="p-register_origin">
            <Box className="p-register_origin_header">
                <Slider
                    label="Bước 1/7"
                    defaultValue={50}
                    max={7}
                    min={0}
                    value={1}
                />
                <div className="p-register_origin_header_back">
                    <Icon icon="zi-arrow-left" className="font-bold" />
                </div>
            </Box>
            <Box className="p-register_origin_heading">
                <Text>Bạn biết doctor check từ đâu?</Text>
                <p>Hãy cho Doctor Check biết nơi mà bạn gặp chúng tôi để tăng trải nghiệm sử dụng hoàn hảo nhất</p>
            </Box>
            <Box className="p-register_origin_banner">
                <img src={banner} alt="banner" />
            </Box>
            <Box className="p-register_origin_choose">
                {origin.map((item) => (
                    <div
                        key={item.id}
                        className={`shadow-lg ${mapModifiers('p-register_origin_choose_item', item.id === originActive && 'active')}`}
                        onClick={() => {
                            setOriginActive(item.id)
                        }}
                    >
                        <Text>{ item.title}</Text>
                    </div>
                ))}
            </Box>
            <Box className="p-register_origin_button">
                <Button>Tiếp theo <Icon icon="zi-play-solid" /></Button>
            </Box>
        </Page>
    )
}

export default RegisterOrigin;