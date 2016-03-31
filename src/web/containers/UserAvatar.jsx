import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import Avatar from 'material-ui/lib/avatar'
import ListItem from 'material-ui/lib/lists/list-item'

const UserAvatar = ({displayName, imageUrl}) => {
	return (
	<ListItem disabled={true} leftAvatar={<Avatar src={imageUrl} />}>
		{displayName}
	</ListItem>
	)
};

UserAvatar.propTypes = {
	displayName: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired
};

const mapStateToProps = ({user}) => {
	return {
		displayName: user.displayName,
		imageUrl: user.imageUrl
	}
}

export default connect(mapStateToProps)(UserAvatar);