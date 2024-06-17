import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const PaginationComp = (props) => {
    const { totalItems, onChange, current, defaultPageSize } = props;
    const [t, i18n] = useTranslation('global');

    return (
        <div className='d-flex justify-content-end'>
            <Pagination
                total={totalItems || 0}
                showTotal={total => `Total ${total} ${t('layouts.pagination.items')}`}
                defaultPageSize={defaultPageSize || 10}
                pageSizeOptions={['10', '25', '50', '100']}
                defaultCurrent={1}
                current={current}
                onChange={onChange}
            />
        </div>
    );
}

PaginationComp.propTypes = {
    totalItems: PropTypes.number.isRequired,        // Total de registros
    onChange: PropTypes.func.isRequired,            // Eventos onChange(page, pageSize)
    current: PropTypes.number.isRequired,           // Página actual
    defaultPageSize: PropTypes.number               // Número de registros que obtiene por default
}

export default PaginationComp;