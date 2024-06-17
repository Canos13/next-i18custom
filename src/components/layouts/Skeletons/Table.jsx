import { Skeleton } from "@chakra-ui/react";
import { Fragment } from "react";
import PropTypes from 'prop-types';

const SkeletonTable = (props) => {
    const { tr, td } = props;
    return (
        <Fragment>
            {
                Array.from({ length: tr }).map((_tr, i_tr) =>
                    <tr key={i_tr}>
                        {
                            Array.from({ length: td }).map((_td, i_td) =>
                                <td key={i_td}><Skeleton height="20px" /></td>)
                        }
                    </tr>
                )
            }
        </Fragment>
    );
}

SkeletonTable.propTypes = {
    tr: PropTypes.number,
    td: PropTypes.number
}

export default SkeletonTable;