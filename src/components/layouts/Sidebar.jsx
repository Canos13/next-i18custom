import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import { HomeOutlined, TeamOutlined, } from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
// Hooks
import { useStore, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// DATA
import adminPaths from "../../data/adminPaths";
import providerPaths from "../../data/providerPaths";
import clientPaths from "../../data/clientPaths";

import { getCfdiStatuses } from "../../api/Cfdi/CfdiStatuses";

import '../../styles/Sidebar.Component.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

const _ = require('underscore');

// Para agregar más elementos al menú consultar el directorio ../../data
// Se recomienda agregar la ruta en los tres archivos ya que los módulos están considerados de manera global
const Sidebar = (props) => {
    const store = useStore();                           // Hook del store de redux
    const dispatch = useDispatch();

    const { token, fibra, roles } = store.getState().login;
    const headers = { Authorization: `Bearer ${token}` };
    const tabSelected = useSelector(state => state.tab);

    const [collapsed, setCollapsed] = useState(false);  // Menu colapsable

    // Obtiene el array de módulos a los que tiene acceso 
    const modules = useSelector(state => state.login.modules);
    const role_selected = useSelector(state => state.login.role_selected);

    const [t, i18n] = useTranslation('global');
    const prefix = 'layouts.sidebar';

    useEffect(() => {
        dispatch({ type: 'SET_ROLE_SELECTED', role_selected: roles[0] });
        dispatch({ type: 'SET_MODULES', modules: roles[0].modules });
        getStatuses(roles[0]);
    }, []);
    
    const handleChangeRole = role => {
        dispatch({ type: 'SET_ROLE_SELECTED', role_selected: role });           // Asinga el rol seleccionado al estado global
        dispatch({ type: 'SET_MODULES', modules: role.modules });               // Asigna el array de modules que tiene asociado el rol seleccionado
        getStatuses(role);
    }

    // Se obtienen los cfdi_statuses en base al rol seleccionado
    const getStatuses = async (role) => {
        let response = await getCfdiStatuses({ headers, fibra_id: fibra.id, role_id: role.id });
        dispatch({ type: 'SET_CFDI_STATUSES', cfdi_statuses: response });
    }


    const onCollapse = collapsed => {
        collapsed ? props.setMarginLeft(80) : props.setMarginLeft(200);
        setCollapsed(collapsed);
    }

    const isClient = useIsClient();

    const handleClick = e => {
        // console.log('click menu', e);
    }

    // Este método busca si el rol seleccionado tiene acceso al módulo que tiene el código que recibe como parámetro
    const findModule = (code) => {
        let position = _.findIndex(modules, { code });
        return position !== -1 ? true : false;
    }

    const getRoute = (role_code) => {
        switch (role_code) {
            case 'ADMINISTRADOR': return 'dashboard-admin';
            case 'CLIENTE': return 'dashboard-client';
            case 'PROVEEDOR': return 'dashboard-provider';
            default: return '';
        }
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='scroll-sidebar scroll-body'>
            <div className="logo" />
            {
                isClient &&
                <Menu theme="dark" defaultSelectedKeys={[tabSelected]} mode="inline" onClick={handleClick}>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/" /> Victum-RE
                    </Menu.Item>
                    {/* Selección de roles de usuario */}
                    <SubMenu key="role" icon={<TeamOutlined />} title={role_selected.name} >
                        {
                            roles && roles.map((item, index) =>
                                <Menu.Item key={`/${getRoute(item.code)}-${index}`} onClick={() => handleChangeRole(item)}>
                                    <Link to={`/${getRoute(item.code)}`} />{item.name}</Menu.Item>
                            )
                        }
                    </SubMenu>
                    {/* Rol: Admin */}
                    {
                        role_selected.code === 'ADMINISTRADOR' ? <Fragment>
                            {
                                adminPaths.map((path, index) =>        // Se recorre el array de las rutas a las que puede acceder un administrador
                                    findModule(path.code) &&    // Filtra las rutas a las que tiene acceso el rol de la fibra actual
                                    <Menu.Item key={path.to} icon={<FontAwesomeIcon icon={path.icon} />}>
                                        <Link to={path.to} /> {t(`${prefix}.${path.name}`)}
                                    </Menu.Item>
                                )
                            }
                        </Fragment> : null
                    }
                    {/* Rol: Proveedor */}
                    {
                        role_selected.code === 'PROVEEDOR' ? <Fragment>
                            {
                                providerPaths.map((path, index) =>
                                    findModule(path.code) &&
                                    <Menu.Item key={path.to} icon={<FontAwesomeIcon icon={path.icon} />}>
                                        <Link to={path.to} /> {t(`${prefix}.${path.name}`)}
                                    </Menu.Item>
                                )
                            }
                        </Fragment> : null
                    }
                    {/* Rol: Cliente */}
                    {
                        role_selected.code === 'CLIENTE' ? <Fragment>
                            {
                                clientPaths.map((path, index) =>
                                    findModule(path.code) &&
                                    <Menu.Item key={path.to} icon={<FontAwesomeIcon icon={path.icon} />}>
                                        <Link to={path.to} /> {t(`${prefix}.${path.name}`)}
                                    </Menu.Item>
                                )
                            }
                        </Fragment> : null
                    }
                    {
                        role_selected.code === 'ADMINISTRADOR' && store.getState().login.user.is_super ?
                            <Menu.Item key="/super-admin" icon={<FontAwesomeIcon icon={faUserLock} />}>
                                <Link to="/super-admin" /> {t(`${prefix}.root`)}
                            </Menu.Item> : null
                    }
                </Menu>
            }
        </Sider>
    );
}

const useIsClient = () => {
    const [isClient, setIsClient] = React.useState(false);
    // The following effect will be ignored on server, 
    // but run on the browser to set the flag true
    useEffect(() => setIsClient(true), []);
    return isClient
}

export default Sidebar;