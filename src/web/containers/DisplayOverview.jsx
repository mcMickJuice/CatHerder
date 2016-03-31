import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import ListItem from 'material-ui/lib/lists/list-item'
import CommunicationChatBubble from 'material-ui/lib/svg-icons/communication/chat-bubble'

const DisplayOverview = ({notifications, groups, lists}) => {
	return (
		<div>
			<ListItem primaryText={'Notifications'}
			          secondaryText={<span>{notifications}</span>}
			          rightIcon={<CommunicationChatBubble />}/>
			<ListItem primaryText={'Groups'}
			          secondaryText={<span>{groups}</span>}
			          rightIcon={<CommunicationChatBubble />}/>
			<ListItem primaryText={'Lists'}
			          secondaryText={<span>{lists}</span>}
			          rightIcon={<CommunicationChatBubble />}/>
		</div>
	)
};

DisplayOverview.propTypes = {
	notifications: PropTypes.number.isRequired,
	groups: PropTypes.number.isRequired,
	lists: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
	return {
		notifications: state.notifications.length,
		groups: state.groups.items.length,
		lists: state.lists.items.length
	}
};

export default connect(mapStateToProps)(DisplayOverview);