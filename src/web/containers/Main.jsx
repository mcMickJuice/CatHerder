import React, {PropTypes} from 'react'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import UserAvatar from './UserAvatar'
import LeftNav from 'material-ui/lib/left-nav'
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble'

//master layout of app
const Main = ({children}) => {

	const containerStyle = {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		display: 'flex',
		alignItems: 'stretch'
	}

	const bodyStyle = {
		border: '3px dotted grey',
		borderRadius: '20px',
		flexGrow: '6',
		padding: '0 10px',
		margin: '10px'
	};

	return (
		<div style={containerStyle}>
			<LeftNav open={true} style={{flexGrow: '2'}}>
				<List>
					<UserAvatar />
					<ListItem
						primaryText={'Notifications'}
						rightIcon={<CommunicationChatBubble />}>
					</ListItem>
					<ListItem primaryText={'Groups'}/>
					<ListItem primaryText={'Lists'}/>
				</List>
			</LeftNav>
			<div className="app-body" style={bodyStyle}>
				{children}
			</div>
		</div>

	)
};

Main.propTypes = {
	children: PropTypes.node.isRequired
}

export default Main