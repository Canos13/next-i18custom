import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

const FlexButton = (props) => {
    const [_style, setStyle] = useState({});
    const [_color, setColor] = useState('#FFF');
    const [_icon, setIcon] = useState(faPlus);

    useEffect(() => {
        let { color, icon, size, bgColor, style } = props;
        setStyle({
            width: size ? size : 50,
            height: size ? size : 50,
            borderRadius: size ? size : 50,
            backgroundColor: bgColor ? bgColor : '#001529',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: style ? style.top ? style.top : 'none' : 'none',
            left: style ? style.left ? style.left : 'none' : 'none',
            right: style ? style.right ? style.right : 'none' : 'none',
            bottom: style ? style.bottom ? style.bottom : 'none' : 'none',
            position: style ? style.position ? style.position : 'fixed' : 'fixed'
        });
        setIcon(icon ? icon : faPlus);
        setColor(color ? color : '#FFF');
    }, [props]);

    const onClick = (e) => {}
    
    return (
        <div style={_style} onClick={props.onClick !== undefined ? props.onClick : onClick}>
            <FontAwesomeIcon icon={_icon} color={_color} size='1x' />
        </div>
    );
}

FlexButton.propTypes = {
    size: PropTypes.number,
    bgColor: PropTypes.string,
    style: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        position: PropTypes.oneOf([
            '-moz-initial',
            '-webkit-sticky',
            'absolute',
            'fixed',
            'inherit',
            'initial',
            'relative',
            'revert',
            'static',
            'sticky',
            'unset'
        ])
    }),
    icon: PropTypes.any,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default FlexButton;