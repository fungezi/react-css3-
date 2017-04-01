//主页
//应用模块
import React,{Component,PropTypes} from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import img from 'image/1.jpg';
import AdminStyles from 'admin/AdminStyle.scss';
import { Link } from 'react-router';
import $ from 'jq/jquery.min.js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import Uploads from '../upload.js';
import {
  convertFromHTML,
  ContentState,
  EditorState,
  convertToRaw,
} from 'draft-js';

class Admin extends React.Component{//这是一个container
	constructor(props){
		super(props);

	}

	render(){

		return (
			<div>
				<Header />
				<Aside />
				<Main />
			</div>
		);
	}
}
class Aside extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let navList = this.props.navList.map(function(item){
			return (<li  key={item.name}><Link to = {item.link}>{item.name}</Link></li>)
		})
		return (
		<div className={AdminStyles.Aside}>
			{navList}
		</div>)
	}
}
Aside.defaultProps = {
	navList :[
		{
			name : "所有文章",
			link : "/admin/article"
		},{
			name : "添加文章",
			link : "/admin/addArticle"
		},{
			name : "用户管理",
			link : "/admin/user"
		},{
			name : "分类管理",
			link : "/admin/cate"
		},{
			name : "媒体管理",
			link : "/admin/media"
		}
	]
}
class Logo extends React.Component{
	constructor(props){
		super(props);

	}
	
	render(){
		return (
		<div className = { AdminStyles.logo }>
			<a href={this.props.Logohref}><img src= {this.props.imgSrc} /></a>
		</div>);
	}
}
Logo.defaultProps = {
    imgSrc : 'https://sfault-avatar.b0.upaiyun.com/324/771/3247715052-56fce46b2ae70_big64',
    Logohref: "#"
};

class Header extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
		<div>
			<Logo imgSrc={"http://www.jq22.com/tx/23.png"} />
		</div>);
	}
}

class Main extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
		<div className = {AdminStyles.Main}>
			
		</div>)
	}
}

class AddArtPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<Header />
				<Aside />
				<AddArt />
			</div>
		);
	}
}
class AddArt extends React.Component{
	constructor(props, context) {
	    super(props);
	    this.state = {
	    	any:{
	    		editorContents: EditorState.createEmpty(),
	    	}
	    	
	    }
	    
	}

	onEditorStateChange(editorContent){
		console.log(draftToHtml(convertToRaw(editorContent.getCurrentContent())));
	};

	uploadImageCallBack(file) {
		  return new Promise(
		    (resolve, reject) => {
		      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
		      xhr.open('POST', 'https://api.imgur.com/3/image');
		      xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
		      const data = new FormData(); // eslint-disable-line no-undef
		      data.append('image', file);
		      xhr.send(data);
		      xhr.addEventListener('load', () => {
		        const response = JSON.parse(xhr.responseText);
		        resolve(response);
		      });
		      xhr.addEventListener('error', () => {
		        const error = JSON.parse(xhr.responseText);
		        reject(error);
		      });
		    }
		  );
		}
	render(){
		const { editorContents } = this.state;
		console.log(editorContents);
		return (
	        <div className={AdminStyles.ueditorbox}>
	        	<div className={AdminStyles.artmes}>
	        		<div className={AdminStyles.ititle}><InputBox placeholder = "题目" /></div>
	        		<div className={AdminStyles.iauthor} ><InputBox placeholder = "作者" /></div>
	        		<CateList />
	        	</div>
	          	<div className = {AdminStyles.ueditorinner}>
	          		<Editor
			            hashtag={{}}
			            toolbarClassName="demo-toolbar"
			            wrapperClassName="demo-wrapper"
			            editorClassName="demo-editor"
			            placeholder = "在这里输入文章内容..."
			            onEditorStateChange = {this.onEditorStateChange}
			            toolbar={{image: { uploadCallback: this.uploadImageCallBack }}}
			          />
	          	</div>
	          	<div className={AdminStyles.artmes}>
	        		<div className={AdminStyles.ititle}><InputBox type="button" value="提交" /></div>
	        	</div>
			</div>
		);
	}
}

class InputBox extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className={AdminStyles.inputBox}>
				<input name={this.props.name} className={this.props.className} value={this.props.value} type = {this.props.type} placeholder={this.props.placeholder} />
			</div>
		);
	}
}
InputBox.defaultProps = {
	className : "inputBoxInner",
	type : "text",
	value : "",
	placeholder : "文章题目..."
}

class ArtListPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<Header />
				<Aside />
				<ArtList />
			</div>
		);
	}
}

class CateList extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let me = this;
		let cateList = this.props.cateList.map(function(item){
			return (
				<label key={item.id}><input  name={me.props.name} value={item.id} id={me.props.name} type="checkbox" />{item.cname}</label>
			);
		})
		return (
			<div className={AdminStyles.cateList}>
				<h3>选择分类</h3>
				{ cateList }
			</div>
		);
	}
}
CateList.defaultProps = {
	id : "cateList",
	name : "cateList",
	cateList : [
		{
			cname : "语文",
			desc : "语文书籍",
			id : "1"
		},{
			cname : "数学",
			desc : "语文书籍",
			id : "2"
		},{
			cname : "化学",
			desc : "语文书籍",
			id : "3"
		},{
			cname : "物理",
			desc : "语文书籍",
			id : "4"
		},{
			cname : "生物",
			desc : "语文书籍",
			id : "5"
		}
	],
}
class ArtList extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		function deleteEvent(id){
			return function(){
				$.ajax({
					method: "delete",
					url: "",
					data: {
						id:id
					},
					sucess: function(data){
						console.log(data);
					},
					error: function(err){
						console.log(err);
					}
				})
			}
		}
		let artList = this.props.artList.map(function(item){
			return (<ArtItem key= {item.id} item = {item} deleteEvent = {deleteEvent(item.id)} />);
		})
		return (
			<div className = {AdminStyles.ArtList}>
				<ul>
					{ artList }
				</ul>
			</div>
		);
	}
}
class ArtItem extends React.Component{
	render(){
		let item = this.props.item;
		let deleteEvent = this.props.deleteEvent;
		return <li key = {item.id}><Link to = { "/artPage/" + item.id }>{item.title}</Link><p>{item.content}</p><span>{"作者: "+item.author}</span><span>{"分类: "+item.category}</span><div className={AdminStyles.btn}><Link to={"/artUpdate/" + item.id}>编辑</Link><a onClick = {item.deleteEvent}>删除</a></div></li>
	}
}

ArtList.defaultProps = {
	artList : [{
		title : "落花寻风",
		content : "明日把酒话黄花，今日呵呵呵明日把酒话黄花，今日花开花落哈哈哈哈哈哈呵呵呵" ,
		author : "一念永恒",
		category : "数学",
		id : 1
	},{
		title : "落花寻风1",
		content : "明日把酒话黄花，今日呵呵呵明话黄花，今日花开花落哈哈哈哈哈哈呵呵呵" ,
		author : "一念永恒",
		category : "数学1",
		id : 2
	},{
		title : "落花寻风2",
		content : "明日把酒话黄花，今日呵呵呵明日把今日呵呵呵明日把今日呵呵呵明日把酒话黄花，今日花开花落哈哈哈哈哈哈呵呵呵" ,
		author : "一念永恒",
		category : "数学2",
		id : 3
	},{
		title : "落花寻风3",
		content : "明日把酒酒话黄花，今日花开花落哈哈哈哈哈哈呵呵呵" ,
		author : "一念永恒",
		category : "数学3",
		id : 4
	}]
}
class UserListPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div>
				<Header />
				<Aside />
				<UserList />
			</div>
		);
	}
}
class UserList extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var userList = this.props.userList.map(function(item){
			return ( 
				<li>
					<input type = "text" value={item.name} />
					<input type = "text" value={item.role} />
					<input type = "text" value={item.email} />
					<input type = "checkbox" checked={item.status} />
				</li> 
			);
		});
		return (
			<div className={AdminStyles.userListPage}>
				{ userList }
			</div>
		);
	}
}
UserList.defaultProps = {
	userList : [{
		username : "user1",
		email : "123455@123.com",
		role : "aa",
		avatar : "avator",
		id : "1",
		status : false,

	},{
		username : "user2",
		email : "123455@123.com",
		role : "aa",
		avatar : "avator",
		id : "2",
		status : false,
	},{
		username : "user3",
		email : "123455@123.com",
		role : "aa",
		avatar : "avator",
		id : "3",
		status : false,
	},{
		username : "user4",
		email : "123455@123.com",
		role : "aa",
		avatar : "avator",
		id : "4",
		status : false,
	}]
}
class MediaManage extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var Media = Uploads.mediaManage;
		return (
			<div>
				<Header />
				<Aside />
				<Media />
			</div>
		);
	}
}
class WaterFallPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		var WaterFallPage = Uploads.WaterFall;
		return (
			<div>
				<WaterFallPage />
			</div>
		);
	}
}
let AdminPage = {};
AdminPage.Admin = Admin;
AdminPage.ArtListPage = ArtListPage;
AdminPage.AddArtPage = AddArtPage;
AdminPage.UserListPage = UserListPage;
AdminPage.MediaManage = MediaManage;
AdminPage.WaterFallPage = WaterFallPage;
export default AdminPage;
