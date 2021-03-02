import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FlexRow, GhostBtn } from 'styles/utils';
import { Container } from './drawer.styles';

interface DrawerProps {
  title: string;
  children: any;
  open: boolean;
  toggleDrawer: (...args: any[]) => void;
}

export const useDrawer = (show = false): [boolean, () => void] => {
  const [open, setOpen] = useState(show);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return [open, toggleDrawer];
};

export const Drawer = (props: DrawerProps) => {
  const { children, open, title, toggleDrawer } = props;

  return (
    <>
      <Container
        data-testid="drawer"
        style={{
          width: open ? '350px' : '0',
          padding: open ? '1em' : '0',
        }}
      >
        {open && (
          <>
            <FlexRow aligment="center" justify="space-between">
              <h1>{title}</h1>
              <GhostBtn data-testid="close_drawer" onClick={toggleDrawer}>
                <MdClose size={30} />
              </GhostBtn>
            </FlexRow>
            {children}
          </>
        )}
      </Container>
    </>
  );
};
