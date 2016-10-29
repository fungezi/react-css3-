//应用模块
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ArtPage extends React.Component{
	componentWillMount(){
		// this.props.dispatch();
	}
	render(){
		return(
			<div>
				this is article page {this.props.params.pageId}
			</div>

		)
	}
}

function select(state){
	return ({
		state:state.ArtPageReducer,
	})
}
export default connect(select)(ArtPage);