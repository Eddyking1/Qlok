import styled from 'styled-components';
import {Menu} from 'styled-icons/material/Menu';
import {Cross} from 'styled-icons/icomoon/Cross';
import {UserPlus} from 'styled-icons/icomoon/UserPlus';
import {DoorOpen} from 'styled-icons/fa-solid/DoorOpen';
import {DownArrowSquare} from 'styled-icons/boxicons-solid/DownArrowSquare'

export const HamburgerMenu = styled(Menu)`
  height: 3rem;
  width: 3rem;
`;

export const NavCross = styled(Cross)`
  height: 1.2rem;
  width: 1.2rem;
`;

export const SignUpIcon = styled(UserPlus)`
  height: 5rem;
  width: 5rem;
  margin:1em;
`;

export const LoginIcon = styled(DoorOpen)`
  height: 5rem;
  width: 5rem;
  margin:1em;
`;
