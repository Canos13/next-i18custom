
import { useState, useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { useCookies } from "react-cookie";
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
} from '@ant-design/icons';

import BreadcrumbComponent from "./Breadcrumb";
import Sidebar from "./Sidebar";
import { useTranslation } from "react-i18next";
import { logout } from "../../api/Authentification";
import { useSelector } from "react-redux";

const { Content, Footer } = Layout;
const { SubMenu } = Menu;

const MainLayout = (props) => {
    const [marginLeft, setMarginLeft] = useState(200);
    const [cookie, setCookie] = useCookies(['user']);
    const [username, setUserName] = useState('');
    const dispatch = useDispatch();
    const store = useStore();
    const token = useSelector(state => state.login.token);
    const user = useSelector(state => state.login.user);
    const headers = { Authorization: `Bearer ${token}` };
    const { first_name, last_name } = store.getState().login.user;
    const [t, i18n] = useTranslation('global');

    useEffect(() => {
        try {
            setUserName(`${first_name} ${last_name}`);
        } catch (error) { }
    }, [store]);

    const closeSession = async () => {
        let response = await logout({ headers, data: { user_id: user.id } });
        if (cookie) {
            setCookie('user', null, {
                path: "/",
                maxAge: 0, // Expires right now
                sameSite: true,
            });
        }
        dispatch({ type: 'CLOSE_SESSION' });
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Barra de navegación lateral */}
            <Sidebar setMarginLeft={setMarginLeft} />
            <Layout className="site-layout" style={{ marginLeft, transition: 'all 0.2s' }}>
                <Menu theme="dark" mode="horizontal" style={{ justifyContent: 'flex-end' }}>
                    {/* <SubMenu key="notifications" icon={<BellOutlined />} title="Notificaciones">
                        <Menu.Item key="setting:1">No hay notificaciones</Menu.Item>
                    </SubMenu> */}
                    <SubMenu key="user" icon={<UserOutlined />} title={username}>
                        <Menu.Item key="logout" onClick={closeSession}>{t('layouts.layout.close-session')}</Menu.Item>
                    </SubMenu>
                </Menu>
                <Content style={{ margin: '0 16px' }}>
                    {/* Miga de pan (Navegación secundaria) */}
                    {/* <BreadcrumbComponent /> */}
                    <section className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {/* Swich de Route DOM (Donde pasan los componentes que son renderizados) */}
                        {props.children}
                    </section>
                </Content>
                <Footer style={{ textAlign: 'center' }}>{t('layouts.layout.footer')}</Footer>
            </Layout>
        </Layout>
    );
}

export default MainLayout;