import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'

const GroupTile = ({groupName, numberOfLists}) => {
	return (<Card>
		<CardText>
			{groupName} - {numberOfLists}
		</CardText>
	</Card>)
};

GroupTile.propTypes = {
	groupName: PropTypes.string.isRequired,
	numberOfLists: PropTypes.number.isRequired
}

const GroupHome = ({groups}) => {
	const tiles = groups.map(g => <GroupTile key={g.id} groupName={g.name} numberOfLists={g.lists.length}/>)

	return (
		<div>
			<h4>Group Home</h4>
			{tiles}
		</div>
	)
};

GroupHome.propTypes = {
	groups: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		lists: PropTypes.array.PropTypes
	}))
};

const mapStateToProps = (state) => {
	return {
		groups: state.groups.items
	}
};

export default connect(mapStateToProps)(GroupHome)