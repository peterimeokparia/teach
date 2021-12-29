import { 
Link } from '@reach/router';

const NavLinks = props => { 
    return (
        <Link
            {...props}
                getProps={({ isCurrent }) => {
                return {
                    style: {
                    color: props?.color
                    }
                };
            }}
        />
   );
};

export default NavLinks;