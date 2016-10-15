//主页
//应用模块
import React from 'react';
import { connect } from 'react-redux';
import img from 'image/1.jpg';
import SlideStyles from 'slide/slideStyle.scss';

class Home extends React.Component{
	constructor(props){
		super(props);

		let data = {
			imgDatas:[{
				imgId:0,
				src:"1.jpg",
				alt:"this is a pic1",
				
			},{
				imgId:1,
				src:"2.jpg",
				alt:"this is a pic2",
			},{
				imgId:2,
				src:"3.jpg",
				alt:"this is a pic3",
			},{
				imgId:3,
				src:"4.jpg",
				alt:"this is a pic4",
			},{
				imgId:4,
				src:"4.jpg",
				alt:"this is a pic4",
			},{
				imgId:5,
				src:"4.jpg",
				alt:"this is a pic4",
			},{
				imgId:6,
				src:"4.jpg",
				alt:"this is a pic4",
			}],
			imgPos:[{
				pos:"slideCenter"
			},
			{
				pos:"slideLeft"
			},
			{
				pos:"slideLeft"
			},
			{
				pos:"slideLeft"
			},
			{
				pos:"slideLeft"
			},
			{
				pos:"slideLeft"
			},
			{
				pos:"slideLeft"
			}]

		}
		data.imgDatas.map(item=>{
			item.src = require('image/'+ item.src);
		})
		this.state = data;
		this.index = 2;
	};

	move(index){
		let pos = [];
		for(let i = 0;i<index;i++){
			pos[i] = {pos:"slideLeft"};
		}
		for(let i = index;i<this.state.imgPos.length;i++){
			pos[i] = {pos :"slideRight"};
		}
		pos[index] = {pos:"slideCenter"};

		this.setState({imgPos:pos});
	}
	componentDidMount(){
		this.move(this.index);
	}

	ArronClick(flag){

		return ()=>{
			if(flag>0){
				this.index++;
				this.index = this.index%this.state.imgPos.length;
			}else{
				this.index--;
				if(this.index<0){
					this.index = this.state.imgPos.length + this.index;
				}
			}
			this.move(this.index);
		}
	}

	DotsClick(){
		return (index)=>{
				return ()=>{
					this.index = index;
					this.move(this.index);
				}
			}
		}

	render(){
		let slideStyle = {
			position:"relative",
			width:600,
			height:300,
			backgroundColor:"#ddf",
			margin:"0px auto",
			overflow:"hidden"
		}
		let imgPos = this.state.imgPos;
		return(
			<div style={slideStyle}>
				这里是主页的内容
				{ this.state.imgDatas.map(function(item){
					return ( <SlideItem key={ item.imgId } pos={ imgPos[item.imgId].pos } img={ item.src } alt = { item.alt } /> )
				}) }
				<Dots DotsClick = {this.DotsClick()} count = {this.state.imgDatas.length} />
				<Arron ArronClick={this.ArronClick(1)}  dir = "left" />
				<Arron ArronClick={this.ArronClick(-1)} dir = "right" />
			</div>
		)
	}
}



class SlideItem extends React.Component{

	render(){

		let itemStyle = {
			width:"100%",
			position:"absolute",
			backgroundColor:"#ffd",
			
		}
		//组件需要的参数有图片的地址，图片的描述
		let { img , alt , pos } = this.props;
		return (
			<div className = {SlideStyles[pos]+" "+SlideStyles.slideItem} style={ itemStyle }>
				<img src= { img } title= { alt } />
			</div>
		);
	}
}

class Dots extends React.Component{ 
	render(){
		let {count,DotsClick} = this.props;
		let list = [];
		for(let i = 0;i<count;i++){
			list.push(<li onClick={DotsClick(i)} key = { i } ></li>)			
		}
		return (
			<div className = {SlideStyles.dots} >
				<ul>
					{ list }
				</ul>
			</div>
		);
	}
}

class Arron extends React.Component{
	render(){
		let {dir , ArronClick}= this.props;
		let dirs;
		let ArronStyle = {
			width:50,
			height:50,
			marginTop:-25,
			backgroundColor:"red",
			position:"absolute",
			top:"50%"
		}
		ArronStyle[dir] = 0;
		if(dir == "left"){
			dirs = "<";
		}else{
			dirs = ">";
		}
		return (
				<div onClick={ArronClick} style = {ArronStyle} >
					{dirs}
				</div>
			);
		
	}
}

function select(){
	return {
		state:state.slideDates
	}
}
export default Home;




