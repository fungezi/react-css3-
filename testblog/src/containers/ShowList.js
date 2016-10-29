//应用模块
import React from 'react';
import { connect } from 'react-redux';
import showListAction from '../actions/showListAction';
import { Link } from 'react-router';

class ShowList extends React.Component{
	componentWillMount(){
		this.props.dispatch(showListAction.getShowList(this.props.params.cateId));
	}
	render(){
		let listData = this.props.state.artData;
		console.log(listData);
		let listItems = [];
		listData.map((item)=>{
			listItems.push(<li key={item.artId}><Link to={"/artPage/"+item.artId}>{item.title}</Link></li>)
		})
		return(
			<div>
				<ul>
					{listItems}
				</ul>
			</div>

		)
	}
}

function select(state){
	return ({
		state:state.showListReducer,
	})
}
export default connect(select)(ShowList);