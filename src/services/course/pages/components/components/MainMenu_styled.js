import { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../../global';
import { theme } from '../../../theme';
import { Burger, Menu } from '.';
import { useOnClickOutside } from '../../../hooks';
//https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/


function MainMenu() {

  const node = useRef(); 
  useOnClickOutside(node, () => setOpen(false));
  const [open, setOpen] = useState(false);

  return (
     <ThemeProvider theme={theme}>
       <>
       <GlobalStyles/>

       <div ref={node}>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />   
        </div>

     </>
     </ThemeProvider>
  );
}

export default MainMenu;
