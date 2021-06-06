import React from 'react';
import { 
Link } from '@reach/router';

const NavLinks = props => { 
    return (
        <Link
            {...props}
                getProps={({ isCurrent }) => {
                return {
                    style: {
                    color: "white"
                    }
                };
            }}
        />
   );
};

export default NavLinks;