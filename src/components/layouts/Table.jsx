import { Table, Badge } from "react-bootstrap";
import PropTypes from 'prop-types';
import ButtonIcon from "./Forms/ButtonIcon";
import SkeletonTable from "./Skeletons/Table";
import { Switch, Tag } from 'antd';
import NoData from "./NoData";
import { Fragment } from "react";
import _ from 'underscore';


/**
 * 
 * @param headers Contiene la cabecera de autorización { Authorization: `Bearer ${token}` } 
 * @param body Contiene el array para llenar el body de la tabla
 * @param keys Es un arreglo que contiene los indices que se van a utilizar del body
 * @param actions Es un array de objetos, estos objetos son dinámicos ya que pueden ser atributos para distintos componentes (switch, buttons, etc)
 * @param loading Es un dato booleano que indica si ya se terminó de obtener el body, para mostrar los estados de carga
 * @param type [Opcional] Indica que tipo de componente se va a utilizar en las acciones, default buttons
 * @param loadingItems [Opcional] Cantidad de tuplas que se mostrarán en el Skeleton, default 5 
 * @param page [Opcional] Página actual para calcular el index del los elementos sin importar en qué paǵina se encuentren
 * @param badges [Opcional] Array [{index:[indice de la columna], color:[indica el nombre de la tabla que tiene el color que se utiliza para la celda actual]}] que indica 
 * @param currency [Opcional] Array que indica las columnas que tendrán formato de moneda
 * @param icons [Opcional] Array de objetos que indica en que valores se reemplazará por un ícono
 * @returns Table
 */
const TableComp = (props) => {
    const {
        headers,
        body,
        keys,
        actions,
        loading,
        type,
        loadingItems,       // PageSize
        page,               // Página actual
        badges,
        currency,
        icons
    } = props;

    // Este método sirve para renderizar el contenido de las acciones
    const renderSwitch = (item) => {
        // Se pueden agregar más componentes
        switch (type) {
            case 'switch': // Deslizar para activar o desactivar
                let {
                    checkedChildren,
                    unCheckedChildren,
                    onChange,
                    getChecked,
                    getDisabled
                } = actions;

                return <Switch
                    checkedChildren={checkedChildren || 'True'}
                    unCheckedChildren={unCheckedChildren || 'False'}
                    onChange={(checked) => onChange(checked, item.id)}
                    defaultChecked={() => getChecked(item.id)}
                    disabled={getDisabled(item.id)}
                />
            case 'btn_din':
                break;
            default: // Por default recorrer array de botones
                let new_actions = actions.filter((action) => {
                    // Si trae la propiedad dinamic se va a mostrar sólo si cumple las condiciones
                    if (action.dinamic) {
                        for (let index = 0; index < action.dinamic.length; index++) {
                            // Se obtiene el key y value que se van a comparar con la propiedad item
                            // Ejempo: Si key:'payment_method' y value: 'PPD', se tiene que buscar que item.payment_method === 'PPD', 
                            // de lo contrario no muestra el botón
                            let { key, value } = action.dinamic[index];
                            if (item[key] !== value)
                                return false;
                        }
                    }
                    // Se evalua que el item puede adquirir mas de un valor
                    if (action.dinamics) {
                        for (let index = 0; index < action.dinamics.length; index++) {
                            let { key, values } = action.dinamics[index];
                            if (!values.includes(item[key]))
                                return false;
                        }
                    }
                    return true;
                });
                return new_actions.map((action, a_index) =>
                    <ButtonIcon
                        key={a_index}
                        name={action.name}
                        onClick={() => action.handleClick(item)}
                        icon={action.icon}
                        tooltip={action.tooltip}
                        variant={action.variant}
                        disabled={action.disabled || false}
                    />
                )
        }
    }

    /**
     * 
     * @param {Cadena que se va a convertir en formato de moneda} cell 
     * @returns {cadena con el formato "$cell.00"}
     */
    const getCurrency = (cell) => {
        const options = { style: 'currency', currency: 'USD' };
        const numberFormat = new Intl.NumberFormat('en-US', options);
        let format_cell = cell;
        try {
            format_cell = numberFormat.format(cell);
            if (format_cell === '$NaN') format_cell = cell;
        } catch (error) {
            console.log("format cell error", error);
        }
        return format_cell;
    }

    /**
     * 
     * @param {Columna en la que se va a asignar el valor} index_col 
     * @param {Objeto que se está evaluando} item 
     * @param {Tupla que se está recorriendo} index_row 
     * @returns {Celda que se va a poner en la posición [index_col, index_row]}
     */
    const setBadge = (index_col, item, index_row) => {
        let cell_changes = true;                                    // True para ejecutar formatos de moneda y badges, false si la celda se convierte en ícono
        let pos = _.findIndex(badges, { index: index_col });        // Busca si la celda tiene que estar en un badge
        let pos_c = _.findIndex(currency, { index: index_col });    // Busca si la celda debe tener formato de mnoneda
        let cell = '';
        if (keys[index_col] === '#') {                              // Si la key es #, se tomará el valor index de map
            cell = index_row + 1;
            if (page && loadingItems)                               // Si recibe como parámetros page y loadingItems podemos crear un index para cada tupla 
                cell = (page - 1) * loadingItems + cell;            // Agregamos la cantidad correspondiente al tamaño de página y página actual
        } else {
            cell = item[keys[index_col]];                           // Contenido de la celda
            let pos_i = _.findIndex(icons, { value: cell });        // Buscamos si el contenido se tiene que reemplazar con un ícono
            if (pos_i !== -1) {                                      // Si el contenido si se reemplaza
                cell = icons[pos_i].icon;                           // Asignamos el icono que viene en el arreglo
                cell_changes = false
            }
        }
        if (cell_changes) {                                         // Ejecutar cambios de moneda y badges
            if (pos_c !== -1) {                                     // Si la celda debe tener formato de moneda
                cell = getCurrency(cell);                           // Asigna el valor obtenido 
            }
            let color = 'dark';                                     // Dark by default
            if (pos !== -1) {                                       // Si hay badges
                color = item[badges[pos].color];                    // Obtiene el color
                // cell = <Badge bg={color} >{cell}</Badge>;        // [Bootstrap 5] Cambia contenido a bagde
                cell = <Tag color={color}>{cell}</Tag>;             // [Ant Design] Cambia contenido a bagde
            }
        }
        return (
            <td key={index_col}>{cell}</td>
        );
    }

    return (
        <Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {   // Recorremos el array headers y los agregamos al encabezado
                            headers.map((theader, index) =>
                                <th key={index}>{theader}</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {   // El componente va a mostrar el skeleton table hasta que reciba un false en el loading
                        loading ? <SkeletonTable tr={loadingItems || 5} td={headers.length} /> :
                            body && body.map((item, index_row) => //Se recorre el arrar de objetos body para rellenar la tabla
                                <tr key={index_row}>
                                    {   // Se recorre el número de encabezados para crear las columnas. Nota Se resta 1 para poner las acciones en otra columna
                                        Array.from({ length: headers.length - 1 }).map((_, index_col) =>
                                            // Se inserta el valor del item  en base a la key y su index_col 
                                            setBadge(index_col, item, index_row)
                                        )
                                    }
                                    <td>{actions ? renderSwitch(item) : null}</td>
                                </tr>
                            )
                    }
                </tbody>
            </Table>
            {/* Si ya no está cargando y el body es vacio */}
            {
                !loading && (body?.length === 0 || !body) ? <NoData /> : null
            }
        </Fragment>
    );
}

TableComp.propTypes = {
    headers: PropTypes.array,       // Título de los encabezados
    body: PropTypes.array,          // Objeto que contiene los datos del body de la tabla
    keys: PropTypes.array,          // Keys del objeto que se muestran en la tabla. Nota: poner en orden de los encabezados
    actions: PropTypes.any,         // Botones o componenetes que van en la sección de acciones
    loading: PropTypes.bool,        // Indica si la información se sigue obteniendo
    loadingItems: PropTypes.number, // Cantidad de tuplas que se muestran al cargar
    type: PropTypes.string,         // Indica que tipo de control llevan las acciones, defalt button
    badges: PropTypes.arrayOf(      // Indica si el contenido de la celda va dentro de un badge
        PropTypes.shape({
            index: PropTypes.number.isRequired,     // indica la posición en la que pintará el badge
            color: PropTypes.string.isRequired      // indica el nombre del atributo del que se tomará el color
        })
    ),
    currency: PropTypes.array,
    icons: PropTypes.array,
    page: PropTypes.number
}

export default TableComp;