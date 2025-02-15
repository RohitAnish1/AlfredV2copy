import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';

import UserLoginAvatarButton from '../Login/UserLoginAvatarButton';

import GroupIcon from '@mui/icons-material/Group';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EventIcon from '@mui/icons-material/Event';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../../Contexts/User/UserContext';
import './Sidebar.css';
import { Paper } from '@mui/material';

export default function Sidebar() {
	const { userData, userLoading, logout } = useContext(UserContext);
	const [caOpen, setCaOpen] = useState(false);
	const [eventsOpen, setEventsOpen] = useState(false);
	const location = useLocation();
	const [activeLink, setActiveLink] = useState<'none' | 'ca' | 'events'>(
		'none'
	);

	useEffect(() => {
		if (location.pathname.startsWith('/ca')) {
			setActiveLink('ca');
		} else if (location.pathname.startsWith('/events')) {
			setActiveLink('events');
		} else {
			setActiveLink('none');
		}
	}, [location]);

	return (
		<Box
			className='dash-sidebar'
			component={Paper}
			elevation={1}
			borderRadius={0}
		>
			<List>
				<ListItemLink to='/' text='Home' icon={<HomeOutlinedIcon />} />
				<ListItemLink
					to='/users'
					text='Users'
					icon={<InfoOutlinedIcon />}
				/>

				{/* CA */}
				<ListItemButton
					className={`list-item-link ${
						activeLink === 'ca' ? 'active' : ''
					}`}
					onClick={() => {
						setCaOpen(!caOpen);
					}}
				>
					<ListItemIcon>
						<CampaignOutlinedIcon />
					</ListItemIcon>
					<ListItemText primary='Campus Ambassador' />
					{caOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={caOpen} timeout='auto' unmountOnExit>
					<List disablePadding={true}>
						<ListItemLink
							to='/ca/list'
							text='CA List'
							leftBorder
							icon={<FormatListNumberedIcon />}
						/>
						<ListItemLink
							to='/ca/team'
							text='Team List'
							leftBorder
							icon={<GroupIcon />}
						/>
					</List>
				</Collapse>

				{/* Events */}
				<ListItemButton
					className={`list-item-link ${
						activeLink === 'events' ? 'active' : ''
					}`}
					onClick={() => {
						setEventsOpen(!eventsOpen);
					}}
				>
					<ListItemIcon>
						<EventIcon />
					</ListItemIcon>
					<ListItemText primary='Events' />
					{eventsOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={eventsOpen} timeout='auto' unmountOnExit>
					<List disablePadding={true}>
						<ListItemLink
							to='/events'
							text='List Events'
							leftBorder
							icon={<FormatListNumberedIcon />}
						/>
						<ListItemLink
							to='/events/heads'
							text='Event Heads'
							leftBorder
							icon={<SupportAgentIcon />}
						/>
					</List>
				</Collapse>

				<ListItemLink
					to='/contact'
					text='Contact'
					icon={<ContactsOutlinedIcon />}
				/>
			</List>

			<Box sx={{ flexGrow: 1 }}></Box>
			<UserLoginAvatarButton
				userLoading={userLoading}
				userData={userData}
				logout={logout}
			/>
		</Box>
	);
}

interface ListItemLinkProps {
	icon?: React.ReactElement;
	text: string;
	to: string;
	disablePadding?: boolean;
	leftBorder?: true;
}

function ListItemLink(props: ListItemLinkProps) {
	const { icon, text, to, disablePadding = true, leftBorder = false } = props;

	return (
		<ListItem disablePadding={disablePadding}>
			<ListItemButton
				component={NavLink}
				to={to}
				end
				className={`list-item-link ${leftBorder ? 'left-border' : ''}`}
			>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={text} />
			</ListItemButton>
		</ListItem>
	);
}
