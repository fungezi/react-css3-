//主页
//应用模块
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import img from 'image/1.jpg';
import SlideStyles from 'slide/slideStyle.scss';
import { Link } from 'react-router';
import homeAction from '../actions/homeAction.js';


class Home extends React.Component{
	componentWillUnmount(){
	}
	componentDidMount(){
	}
	render(){
		let {state,dispatch} = this.props;
		console.log(this.props.params.par);
		let pagemenu = state.pagemenu;
		let designArtice = state.designArtice;
		let imgDatas = state.imgDatas;
		let pageId = state.pageId;
		this.pageId = pageId;
		return(
			<div>
				<Header />
				<Slide imgDatas = {imgDatas} />
				<Design designArtice={designArtice} />
				<Paging pageId={pageId} pageCount={pagemenu.pageCount}  totalPage={pagemenu.totalPage} curPage={pagemenu.curPage} dispatch={dispatch} />
				<Footer />
			</div>
		)
	}

}
// ------sldie--------
class Slide extends React.Component{
	constructor(props){
		super(props);

		let data = {
			imgDatas:[{
				imgId:0,
				src:"slide1.jpg",
				alt:"this is a pic1",
				
			},{
				imgId:1,
				src:"slide2.jpg",
				alt:"this is a pic2",
			},{
				imgId:2,
				src:"slide3.jpg",
				alt:"this is a pic3",
			},{
				imgId:3,
				src:"slide2.jpg",
				alt:"this is a pic4",
			},{
				imgId:4,
				src:"slide1.jpg",
				alt:"this is a pic4",
			},{
				imgId:5,
				src:"slide3.jpg",
				alt:"this is a pic4",
			},{
				imgId:6,
				src:"slide2.jpg",
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
			}],

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
		this.timer = setInterval(()=>{
			this.index++;
			this.index = this.index%this.state.imgPos.length;
			this.move(this.index);
		},4000);
	}
	componentDidUpdate(){
		clearInterval(this.timer);
		this.timer = setInterval(()=>{
			this.index++;
			this.index = this.index%this.state.imgPos.length;
			this.move(this.index);
		},4000);
	}
	ArronClick(flag){

		return ()=>{
			clearInterval(this.timer);
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
					clearInterval(this.timer);
					this.index = index;
					this.move(this.index);
				}
			}
		}
	componentWillUnmount(){
		clearInterval(this.timer);
		this.move = null;
	}
	render(){
		let slideStyle = {
			position:"relative",
			width:"100%",
			height:500,
			backgroundColor:"#ddf",
			margin:"0px auto",
			overflow:"hidden"
		}
		let {imgDatas} = this.props;
		imgDatas = this.state.imgDatas;
		// imgDatas = imgDatas?imgDatas:this.state.imgDatas;
		let imgPos = this.state.imgPos;
		return(
			<div style={slideStyle}>
				{ imgDatas.map(function(item){
					return ( <SlideItem key={ item.imgId } pos={ imgPos[item.imgId].pos } img={ item.src } alt = { item.alt } /> )
				}) }
				<Dots DotsClick = {this.DotsClick()} activeIndex={this.index} count = {imgDatas.length} />
				<Arron ArronClick={this.ArronClick(1)}  dir = "left" />
				<Arron ArronClick={this.ArronClick(-1)} dir = "right" />
			</div>
		)
	}
}



class SlideItem extends React.Component{

	render(){
		let { img , alt , pos } = this.props;
		
		//组件需要的参数有图片的地址，图片的描述
		
		return (
			<div className = {SlideStyles[pos]+" "+SlideStyles.slideItem} style={ {backgroundImage:"url("+img+")"} }>
			</div>
		);
	}
}

class Dots extends React.Component{ 
	render(){
		let {count,DotsClick,activeIndex} = this.props;
		// alert(activeIndex);
		let list = [];
		for(let i = 0;i<count;i++){
			let activeIndexs = "";
			let opacity  = 0.5;
			let width = "";
			let height = "";
			if(activeIndex == i){
				activeIndexs = "#019ae5";
				opacity = 1;
				width = "20px";
				height = "20px";
			}
			list.push(<li style={{backgroundColor:activeIndexs,width:width,height:height,opacity:opacity}} onClick={DotsClick(i)} key = { i } ></li>)			
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
			
		}
		ArronStyle[dir] = 0;
		if(dir == "left"){
			dirs = "<";
		}else{
			dirs = ">";
		}
		return (
				<div className={SlideStyles.Arron} onClick={ArronClick} style = {ArronStyle} >
					{dirs}
				</div>
			);
		
	}
}

// ------header


class Header extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			backgroundColor:'',
			navFontColor:"white"
		}
	}
	componentWillUnmount(){
		window.onScroll = null;
	}
	componentDidMount(){
		let headerDom = ReactDom.findDOMNode(this.refs.header);
		
		// window.addEventListener("scroll",)
		window.onScroll = ()=>{
			let offsetTop = document.body.scrollTop;
			if(offsetTop > 40){
				this.setState({backgroundColor:'white',navFontColor:"black"})
			}else{
				this.setState({backgroundColor:'',navFontColor:"white"})
			}
		}
	}
	render(){
		return (
			<div style={{backgroundColor:this.state.backgroundColor}} ref="header" className={SlideStyles.header}>
				<Logo />
				<NavBar navFontColor={this.state.navFontColor} />
			</div>
		)
	}
}


class Logo extends React.Component{
	
	render(){

		return (
			<div className={SlideStyles.logo}>
				<img src={require("image/logo.png")} />
			</div>
		)
	}
}

// ------navBar------
class NavBar extends React.Component{

	render(){

		let { navData , navFontColor } = this.props;
		let navBarMes = [{
			nav:"首页",
			icon:"",
			link:"/"
		},{
			nav:"项目",
			icon:"",
			link:"/project"
		},{
			nav:"实践",
			icon:"",
			link:"/todo"
		},{
			nav:"关于我们",
			icon:"",
			link:"/about"
		}];

		navData = navData?navData:navBarMes;
		let nav = [];
		for(let i = 0;i<navData.length;i++){
			// nav.push(<li key={i} ><a style={{color:navFontColor}} href="#">{navData[i].nav}</a></li>);
			nav.push(<li key={i} ><Link style={{color:navFontColor}} to={ navData[i].link }>{navData[i].nav}</Link></li>);
		}

		return (
			<div>
				<ul className={SlideStyles.navBar}>
					{nav}
				</ul>
			</div>
		)
	}
}

class Design extends React.Component{

	render(){
		let {designArtice} = this.props;
		return (
			<div className={SlideStyles.design}>
				<ArticleList articleDatas={designArtice} />
			</div>
		)
	}
}

class ArticleList extends React.Component{
	render(){
		let mockData = [{
			src:"image/1.jpg",
			title:"文章的题目题目体贴",
			author:"XXX",
			hot:20,
			cate:"ABC",
		},{
			src:"image/2.jpg",
			title:"文章的题目题目体贴",
			author:"XXX",
			hot:20,
			cate:"ABC",
		},{
			src:"image/3.jpg",
			title:"文章的题目题目体贴",
			author:"XXX",
			hot:20,
			cate:"ABC",
		},{
			src:"image/3.jpg",
			title:"文章的题目题目体贴",
			author:"XXX",
			hot:20,
			cate:"ABC",
		},{
			src:"image/3.jpg",
			title:"文章的题目题目体贴",
			author:"XXX",
			hot:20,
			cate:"ABC",
		}];

		let {articleDatas} = this.props;
		articleDatas = articleDatas?articleDatas:mockData;
		let ArticleBoxs = [];
		for(let i = 0;i<articleDatas.length;i++){
			ArticleBoxs.push(<ArticleBox key={i} articleData={articleDatas[i]} />)
		}
		return (
			<div className={SlideStyles.ArticleList}>
				{ArticleBoxs}
			</div>
		)
	}
}


class ArticleBox extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		let mockData = {
			src:"image/1.jpg",
			title:"文章的题目题目体贴",
			author:"XXX",
			hot:20,
			cate:"ABC",
		}
		let {articleData} = this.props;
		articleData = articleData?articleData:mockData;
		return (
			<div className={SlideStyles.articleBox}>
				<div className={SlideStyles.articleCon}>
					<div className={SlideStyles.desArtImg}>
						<img src={require("image/1.jpg")} />
					</div>
					<div className={SlideStyles.desArtmes}>
						<h3><Link to={"/showList/" + articleData.artId }>{articleData.title}</Link></h3>
						<div className={SlideStyles.articleContent}>
							<p>{articleData.title}</p>
						</div>
						<span>{"作者: "+articleData.author}</span>
						<span>{"热度: "+articleData.hot}</span>
						<span>{"分类: "+articleData.cate}</span>
					</div>
				</div>
			</div>
		)
	}
}


class Paging extends React.Component{
	// 需要的参数：pageCount
	constructor(props){
		super(props);
		this.state = {
			beginPageNum:1,
			activePage:1
		}
		this.curPage = 1;
	}
	pageClick(index,pageCount,totalPage,beginPageNum,dispatch){
		//作用就是讲begin：
		return ()=>{
			let newBeginNums;		
			if(index == "next"){
				this.curPage++;
				if(this.curPage > pageCount){
					this.curPage = pageCount;
				}else if(this.curPage < 1){
					this.curPage = 1;
				}
				// alert(this.curPage);
				var indexs = this.curPage;
			}else if(index == "prev"){
				this.curPage--;
				if(this.curPage > totalPage){
					this.curPage = totalPage;
				}else if(this.curPage < 1){
					this.curPage = 1;
				}
				var indexs = this.curPage;
			}else if(index == "firstPage"){
				var indexs = 1;
				this.curPage = 1;
				this.setState({beginPageNum:1,activePage:1});
				newBeginNums = 1;
				dispatch(homeAction.getDesignArticle(newBeginNums + this.curPage - 1));
				return;
			}else if(index == "lastPage"){
				var indexs = pageCount;
				this.curPage = pageCount;
				let newBeginNum = totalPage - pageCount + 1;
				let activePage = pageCount;
				if(totalPage < pageCount){
					newBeginNum = 1;
					activePage = totalPage;
				}
				this.setState({beginPageNum:newBeginNum,activePage:activePage});
				newBeginNums = newBeginNum;
				dispatch(homeAction.getDesignArticle(newBeginNums + this.curPage - 1));
				return;
			}else{
				var indexs = index;
			}
			// alert(indexs);
			if(pageCount > totalPage){
			}else{
				let len = pageCount - beginPageNum + 1;
				let centerPos = Math.ceil(pageCount/2);
				if(indexs <= centerPos){
					let newBeginNum = beginPageNum - centerPos + indexs; 
					if(newBeginNum < 1){
						newBeginNum = 1;
						this.curPage = indexs - (newBeginNum - beginPageNum);
						this.setState({beginPageNum:newBeginNum,activePage:indexs - (newBeginNum - beginPageNum)})
					}else{
						this.curPage = centerPos;
						this.setState({beginPageNum:newBeginNum,activePage:centerPos})
					}
					newBeginNums = newBeginNum;
				}else{
					// let newIndexs = indexs + ;
					let newBeginNum = indexs - centerPos + beginPageNum;
					if(newBeginNum + pageCount  > totalPage){
						//不移动，只改变高亮
						newBeginNum = totalPage - pageCount + 1;
						this.curPage = indexs - (newBeginNum - beginPageNum);
						// alert(newBeginNum+" "+beginPageNum+""+this.curPage);
						this.setState({beginPageNum:newBeginNum,activePage:indexs - (newBeginNum - beginPageNum)});
					}else{
						this.curPage = centerPos;
						this.setState({beginPageNum:newBeginNum,activePage:centerPos});
					}
					newBeginNums = newBeginNum;

				}
			}
			dispatch(homeAction.getDesignArticle(newBeginNums + this.curPage - 1));
		}
	}
	componentWillUnmount(){ 
		this.pageClick = null;
 	}
	render(){
		let {pageCount,totalPage,curPage,dispatch,pageId} = this.props;
		// totalPage = 10;
		// this.props.dispatch(homeAction.getDesignArticle(2));
		pageCount = pageCount?pageCount:7;
		let pagenums = [];
		let beginPageNums = this.state.beginPageNum;
		if(totalPage <= pageCount){
			pageCount = totalPage;
		}
		for(let i = 0;i<pageCount;i++){
			let activePages = "";
			if(this.state.activePage == i + 1){
				activePages = "pageActive";
			}
			pagenums.push(<Pagenum activePages={activePages} key = {i} beginPageNum = {this.state.beginPageNum} pageClick={this.pageClick(i+1,pageCount,totalPage,this.state.beginPageNum,dispatch)} isActive = {false} pagenumber = {i+beginPageNums} />)
		}
		let btnStyle1 = {
		}
		let btnStyle2 = {
		}
		if(this.curPage == 1){
			btnStyle1.color = "#c8cdd2";
		}
		if(this.curPage == totalPage || this.curPage == pageCount){
			btnStyle2.color = "#c8cdd2";
		}
		return (
			<div className={SlideStyles.pagenumslist}>
				<div className={SlideStyles.pagecon}>
					<div onClick={()=>{dispatch(homeAction.getDesignArticle(1))}} className={SlideStyles.totalPageNum}>点击</div>
					<div style={btnStyle1} onClick={this.pageClick("firstPage",pageCount,totalPage,this.state.beginPageNum,dispatch)} className={SlideStyles.totalPageNum}>{"首页"}</div>
					<div style={btnStyle1} onClick={this.pageClick("prev",pageCount,totalPage,this.state.beginPageNum,dispatch)} className={SlideStyles.totalPageNum}>{"上一页"}</div>
					{pagenums}
					<div style={btnStyle2} onClick={this.pageClick("next",pageCount,totalPage,this.state.beginPageNum,dispatch)} className={SlideStyles.totalPageNum}>{"下一页"}</div>
					<div style={btnStyle2} onClick={this.pageClick("lastPage",pageCount,totalPage,this.state.beginPageNum,dispatch)} className={SlideStyles.totalPageNum}>{"尾页"}</div>
					<div className={SlideStyles.totalPageNum+" "+SlideStyles.totalPageNums}>{"共有"+totalPage+"条"}</div>
				</div>
			</div>
		)
	}
}


 class Pagenum extends React.Component{
 	render(){
 		let {pagenumber,isCurPage,pageClick,activePages} = this.props;
 		return (
 			<div className={SlideStyles.pagenum}>
 				<span ref = "pagenum" onClick={pageClick} className={SlideStyles[activePages]} >{pagenumber}</span>
 			</div>
 		)
 	}
 }


class Footer extends React.Component{
	render(){
		return (
			<div className={SlideStyles.footer}>
				<div className={SlideStyles.footerBox}>
					<div className={SlideStyles.footermesList}>
						<ul>
							<li><a href="#">网站首页</a></li>
							<li><a href="#">友情链接</a></li>
							<li><a href="#">关于我</a></li>
							<li><a href="#">网站地图</a></li>
						</ul>
						<p >Copyright © 2016 yuxili.com All Rights Reserved</p>
					</div>
					<div className={SlideStyles.contactIcon}>
						<a href="#" className={SlideStyles.conIconwb} style={{backgroundImage:"url("+require("image/footer-sprite.png")+")"}}></a>
						<a href="#" className={SlideStyles.conIconwx} style={{backgroundImage:"url("+require("image/footer-sprite.png")+")"}}></a>
						<a href="#" className={SlideStyles.conIconqq} style={{backgroundImage:"url("+require("image/footer-sprite.png")+")"}}></a>
					</div>
				</div>
			</div>
		)
	}
}

function select(state,ownProps){
	return {
		state:state.homeReducer
	}
}
function actioned(dispatch){
	return {
		clickAction:()=>dispatch({})
	}
}
export default connect(select)(Home);




