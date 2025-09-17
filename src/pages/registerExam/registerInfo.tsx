import React from "react";
import { Box, Button, Icon, Input, Page, Slider, Text } from "zmp-ui";
import banner from './images/img_basic_info.jpg'
import './styles.scss'
import { mapModifiers } from "../../utils/functions";

const RegisterInfo: React.FC = () => {
    
    return (
        <Page className="p-register_info">
            <Box className="p-register_info_header">
                <Slider
                    label="Bước 2/7"
                    defaultValue={50}
                    max={7}
                    min={0}
                    value={2}
                />
                <div className="p-register_info_header_back">
                    <Icon icon="zi-arrow-left" className="font-bold" />
                </div>
            </Box>
            <Box className="p-register_info_banner">
                <img src={banner} alt="banner" />
            </Box>
            <Box className="p-register_info_heading">
                <Text>Thông tin cơ bản</Text>
                <p>Vui lòng nhập thông tin có bản của bạn để Doctor Check có thể giúp bạn lưu trữ thông tin cho việc đăng ký khám</p>
            </Box>
            <Box className="p-register_info_form">
                <Input
                    label="CCCD/CMND"
                    placeholder="Nhập CCCD/CMND của bạn"
                    onChange={(event) => {
                    }}
                />
                <Input
                    label="Số điện thoại"
                    className={mapModifiers("form-input")}
                    onChange={(event) => {
                    }}
                />
                <Input
                    label="Họ và tên"
                    placeholder="Nhập CCCD/CMND của bạn"
                    onChange={(event) => {
                    }}
                />
                <Input
                    label="Email"
                    className={mapModifiers("form-input")}
                    onChange={(event) => {
                    }}
                />
            </Box>
            <Box className="p-register_info_button">
                <Button><Icon icon="zi-chevron-left" /> Quay lại</Button>
                <Button>Tiếp theo <Icon icon="zi-chevron-right" /></Button>
            </Box>
        </Page>
    )
}

export default RegisterInfo;