import React from "react";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import './styles.scss'
import banner from './images/img_welcome.png'

const RegisterIntro: React.FC = () => {

    return (
        <Page className="p-register_intro">
            <Header
                title="Đăng ký tài khoản"
                className="p-booking_headers"
                showBackIcon
                backgroundColor="#fff"
            />
            <Box height={70} />
            <Box className="p-register_intro_heading">
                <Text>Chào mừng bạn đã đến với doctor check</Text>
                <p>trung tâm nội soi & chẩn đoán bệnh lý tiêu hóa doctor check</p>
            </Box>
            <Box className="p-register_intro_banner">
                <img src={banner} alt="banner"/>
            </Box>
            <Box className="p-register_intro_button">
                    <Button>Bắt đầu</Button>
            </Box>
        </Page>
    )
}

export default RegisterIntro;
