import * as React from 'react';
import { SvgIcon as MuiSvgIcon, styled } from '@mui/material';

const SvgIcon = styled(MuiSvgIcon, {
    name: 'MuiCustomIcon',
    // shouldForwardProp: ( prop ) => prop !== 'fill',
})(()=>({
    // fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin:  'round',
    strokeWidth:  '1px',
}));

SvgIcon.defaultProps = {
    viewBox: '0 0 24 24',
    focusable: 'false',
    'aria-hidden': 'true',
 };

const MuiCustomIcon = ( props ) => {
    const { children } = props;

    return (
        <SvgIcon { ...props }>
            { children }
        </SvgIcon>
    );
};

export default MuiCustomIcon;