
// 图片上传组件、文件上传组件

import React from "react";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router";
import uploadStyle from "upload/upload.scss";
import waterFall from "waterFall/waterFall.scss";
import img from 'image/1.jpg';
import img1 from 'image/2.jpg';
import img2 from 'image/yeoman.png';
import img3 from 'image/4.jpg';
import img4 from 'image/5.jpg';
import img5 from 'image/6.jpg';
class Upload extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			editImg:"",
			index:"",
			newImg:""
		}
	}
	editImgHandle(editImg,index){
		this.setState({
			editImg:editImg,
			index:index,
			newImg:""
		})
	}
	clearImgEdit(){
		this.setState({
			editImg:"",
			index:"",
			newImg:""
		})
	}
	setNewImg(newImg){
		this.setState({
			newImg:newImg,
			editImg:""
		})
	}
	render(){

		if(this.state.editImg){
			return (
				<div className = {uploadStyle.mediaContainer}>
					<div className = {uploadStyle.mediaPos}>
						<ImgPreViewList index = {this.state.index} setNewImg = { this.setNewImg.bind(this) } newImg = {this.state.newImg} clearImgEdit = { this.clearImgEdit.bind(this) } editImgHandle = {this.editImgHandle.bind(this)} />
						<ImgEdit clearImgEdit = { this.clearImgEdit.bind(this) } setNewImg = { this.setNewImg.bind(this) } index = {this.state.index} img = { this.state.editImg } />
					</div>
				</div>
			);
		}else{
			return (
				<div className = {uploadStyle.mediaContainer}>
					<div className = {uploadStyle.mediaPos}>
						<ImgPreViewList index = {this.state.index} setNewImg = { this.setNewImg.bind(this) } newImg = {this.state.newImg} clearImgEdit = { this.clearImgEdit.bind(this) } editImgHandle = {this.editImgHandle.bind(this)} />
					</div>
				</div>
			);
		}
		
	}
}

class ImgPreViewList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imgList:[]
		}
	}

	setImageData(index,newImg){
		var imgList = this.clone(this.state.imgList)[index] = newImg
		
		this.setState({
			imgList:  imgList
		});
	}

	clone(obj) {  
	    var o;  
	    if (typeof obj == "object") {  
	        if (obj === null) {  
	            o = null;  
	        } else {  
	            if (obj instanceof Array) {  
	                o = [];  
	                for (var i = 0, len = obj.length; i < len; i++) {  
	                    o.push(this.clone(obj[i]));  
	                }  
	            } else {  
	                o = {};  
	                for (var j in obj) {  
	                    o[j] = this.clone(obj[j]);  
	                }  
	            }  
	        }  
	    } else {  
	        o = obj;  
	    }  
	    return o;  
	} 
	getFileData(e){
		var imgList = this.clone(this.state.imgList);
		var file = e.target.files[0];
		var self = this;
		if(file){
			var reader = new FileReader();
			reader.onload = function(e){
				imgList.push({
					src:e.target.result
				});
				console.log(imgList);
				self.setState({
					imgList:imgList
				})
			}
			reader.readAsDataURL(file);
		}
		
		
	}

	delImg(index){
		// 删除处理函数
		var self = this;
		return function(e){
			// console.log(index);
			// console.log(self.props);
			self.props.clearImgEdit();
			var imgList = self.clone(self.state.imgList);
			imgList.splice(index,1);
			// console.log(imgList);
			self.setState({
				imgList : imgList
			})
		}
	}

	editImg(index){
		// 编辑处理函数
		var self = this;
		return function(e){
			self.props.editImgHandle(self.state.imgList[index].src,index);
		}
	}

	render(){
		if(this.props.newImg && this.props.setNewImg){
			console.log(this.state.imgList);
			this.state.imgList[this.props.index].src = this.props.newImg;
			this.props.setNewImg("");

		}
		var btn = {
			type: "file",
			value: "选择文件",
			getFileData:this.getFileData.bind(this)
		}
		// console.log("zhixing");
		// console.log(this.props.editImgHandle);
		var imgList = this.state.imgList?this.state.imgList:[];
		var picList = [];
		for(var i = 0;i<imgList.length;i++){
			picList.push(<ImgPreView delImg = {this.delImg(i)} setImageData = { this.setImageData.bind(this) } editImg = {this.editImg(i)} key = {i} imgMes = {imgList[i]} />);
		}
		return (
			<div>
				<Btn  btn = {btn}  />
				<h3>图片预览列表</h3>
				<div className = {uploadStyle.imgpreviewList}>
					{picList}
				</div>
			</div>
		);
	}
}

class ImgEdit extends React.Component{
	constructor(props){
		super(props);
		this.state = {//写裁剪框
			cutBox:{
				x:0,
				y:0,
				w:390,
				h:300
			},
			cutImgBoxPos:{
				left:30,
				top:20
			},
			cutImgBoxStyle:{
				width:200,
				height:100,
				overflow:"hidden",
				backgroundColor:"transparent",
			},
			mousePos:{
				x:0,
				y:0
			},
			move:false,
			updateBoxStyle:{
				width:200,
				height:100,
				left:30,
				top:20
			}
		}
	}
	
	borderHandler(e){
		this.state.mousePos.x = e.clientX;
		this.state.mousePos.y = e.clientY;
		this.state.move = e.target.className.split("-")[0];
		this.state.updateBoxStyle = {
			width:this.state.cutImgBoxStyle.width,
			height:this.state.cutImgBoxStyle.height,
			left:this.state.cutImgBoxPos.left,
			top:this.state.cutImgBoxPos.top
		}
	}
	moveHandler(e){
		var className = this.state.move;
		var x = this.state.mousePos.x;
		var y = this.state.mousePos.y;
		var self = this;
		switch(className){
			case "cutBorederTop":
				this.setState({
					cutImgBoxStyle:{
						height:this.state.updateBoxStyle.height - e.clientY + y,
						width:this.state.updateBoxStyle.width,
						overflow:"hidden",
						backgroundColor:"transparent",
					},
					cutImgBoxPos:{
						top:this.state.updateBoxStyle.top - y + e.clientY,
						left:this.state.updateBoxStyle.left
					}
				})
			break;
			case "cutBorederLeft":
				this.setState({
					cutImgBoxStyle:{
						width:this.state.updateBoxStyle.width - e.clientX + x,
						height:this.state.updateBoxStyle.height,
						overflow:"hidden",
						backgroundColor:"transparent",
					},
					cutImgBoxPos:{
						left:this.state.updateBoxStyle.left - x + e.clientX,
						top:this.state.updateBoxStyle.top
					}
				})
			break;
			case "cutBorederBottom":
				// console.log(3);
				this.setState({
					cutImgBoxStyle:{
						height:this.state.updateBoxStyle.height + e.clientY - y,
						width:this.state.updateBoxStyle.width,
						overflow:"hidden",
						backgroundColor:"transparent",
					}
				})
			break;
			case "cutBorederRight":

				this.setState({
					cutImgBoxStyle:{
						width:this.state.updateBoxStyle.width + e.clientX - x,
						height:this.state.updateBoxStyle.height,
						overflow:"hidden",
						backgroundColor:"transparent",
					}
				})

			break;
			case "maskForImg":
				this.setState({
					cutImgBoxPos:{
						left:this.state.updateBoxStyle.left - x + e.clientX,
						top:this.state.updateBoxStyle.top - y + e.clientY
					}
				})
			break;
			case "cutDotTL":
				this.setState({
					cutImgBoxStyle:{
						width:this.state.updateBoxStyle.width - e.clientX + x,
						height:this.state.updateBoxStyle.height - e. clientY + y,
						overflow:"hidden",
						backgroundColor:"transparent",
					},
					cutImgBoxPos:{
						left:this.state.updateBoxStyle.left - x + e.clientX,
						top:this.state.updateBoxStyle.top - y + e.clientY
					}
				})
			break;
			case "cutDotTR":
				this.setState({
					cutImgBoxStyle:{
						width:this.state.updateBoxStyle.width + e.clientX - x,
						height:this.state.updateBoxStyle.height - e. clientY + y,
						overflow:"hidden",
						backgroundColor:"transparent",
					},
					cutImgBoxPos:{
						top:this.state.updateBoxStyle.top - y + e.clientY,
						left:this.state.updateBoxStyle.left
					}
				})
			break;
			case "cutDotRB":
				this.setState({
					cutImgBoxStyle:{
						width:this.state.updateBoxStyle.width + e.clientX - x,
						height:this.state.updateBoxStyle.height + e.clientY - y,
						overflow:"hidden",
						backgroundColor:"transparent",
					}
				})
			break;
			case "cutDotBL":
				this.setState({
					cutImgBoxStyle:{
						width:this.state.updateBoxStyle.width - e.clientX + x,
						height:this.state.updateBoxStyle.height + e.clientY - y,
						overflow:"hidden",
						backgroundColor:"transparent",
					},
					cutImgBoxPos:{
						left:this.state.updateBoxStyle.left - x + e.clientX,
						top:this.state.updateBoxStyle.top
					}
				})
			break;
			case "cutDot":
				this.setState({
					cutImgBoxStyle:{
						width:this.state.updateBoxStyle.width - e.clientX + x,
						height:this.state.updateBoxStyle.height - e. clientY + y,
						overflow:"hidden",
						backgroundColor:"transparent",
					},
					cutImgBoxPos:{
						left:this.state.updateBoxStyle.left - x + e.clientX,
						top:this.state.updateBoxStyle.top - y + e.clientY
					}
				})
			break;
			default:
				return false;
			break;
		}
	}
	clearMoveHandler(e){
		this.state.move = "";
		console.log("clearS");
	}

	forbindenDrag(){
		return false;
	}
	canvasImgCutHandler(index){
		var self = this;
		return function(e){
			var canvas = document.createElement("canvas");
			var tempCanvas = document.createElement("canvas");
			var w = self.state.cutBox.w;
			var h = self.state.cutBox.h;
			canvas.width = w;
			tempCanvas.width = self.state.cutImgBoxStyle.width;
			canvas.height = h;
			tempCanvas.height = self.state.cutImgBoxStyle.height;
			var ctx = canvas.getContext("2d");
			var tempCtx = tempCanvas.getContext("2d");
			var img = new Image();
			img.src = self.props.img;
			img.onload = function(){
				var he = (w/img.width)*img.height;
				ctx.drawImage(img,0,0,w,he);
				var imgData = ctx.getImageData(self.state.cutImgBoxPos.left,self.state.cutImgBoxPos.top,self.state.cutImgBoxStyle.width,self.state.cutImgBoxStyle.height);
				tempCtx.putImageData(imgData,0,0);
				var newImg = tempCanvas.toDataURL("image/png");
				self.props.setNewImg(newImg);
			}

			
		}

	}

	render(){
		var cutBox = this.state.cutBox;
		var  imgEditBoxStyle = {
			width:cutBox.w,
			heigth:cutBox.h
		};
		var cutImgBoxStyle = this.state.cutImgBoxStyle;
		var cutImgBoxPos = this.state.cutImgBoxPos;
		var imgs = this.props.img?this.props.img:img;
		var index = this.props.index;
		return (
			<div className = { uploadStyle.imgCutContainerMask }>
				<div className = { uploadStyle.imgCutContainer }>
					<div onMouseUp = { this.clearMoveHandler.bind(this) } onMouseMove = {this.moveHandler.bind(this)} style = {{height:cutBox.h,width:cutBox.w}} className={uploadStyle.imgEditBox}>
						<div className={uploadStyle.imgEditMask}></div>
						<img onSelectStart = {this.forbindenDrag} style = {{maxWidth:cutBox.w,maxHeight:cutBox.h}} src= { imgs } />
						<div onMouseDown = { this.borderHandler.bind(this) } className = {uploadStyle.cutBoreder} style={{width:cutImgBoxStyle.width,height:cutImgBoxStyle.height,left:cutImgBoxPos.left,top:cutImgBoxPos.top}}>
							<div style = {cutImgBoxStyle}><img onDragStart = {this.forbindenDrag} onSelectStart = {this.forbindenDrag} style = {{maxWidth:cutBox.w,maxHeight:cutBox.h,left:-1-cutImgBoxPos.left,top:-1-cutImgBoxPos.top}} src= { imgs } /></div>
							<div className = {uploadStyle.maskForImg}></div>
							<div className = {uploadStyle.cutBorederTop}></div>
							<div className = {uploadStyle.cutBorederRight}></div>
							<div className = {uploadStyle.cutBorederBottom}></div>
							<div className = {uploadStyle.cutBorederLeft}></div>
							<span className = {uploadStyle.cutDotTL}></span>
							<span className = {uploadStyle.cutDotTM}></span>
							<span className = {uploadStyle.cutDotTR}></span>
							<span className = {uploadStyle.cutDotRM}></span>
							<span className = {uploadStyle.cutDotRB}></span>
							<span className = {uploadStyle.cutDotBM}></span>
							<span className = {uploadStyle.cutDotBL}></span>
							<span className = {uploadStyle.cutDotLM}></span>
						</div>
					</div>
					<div className = { uploadStyle.imgCutAckBtn }>
						<Btn btn={
							{
								type: "button",
								value: "确认",
								getFileData:this.canvasImgCutHandler(this.props.index)
							}
						} />
					</div>
					<div className = { uploadStyle.imgCutCancelBtn }>
						<Btn btn={
							{
								type: "button",
								value: "取消",
								getFileData:this.props.clearImgEdit
							}
						} />
					</div>
				</div>
			</div>
		);
	}
}

class ImgPreView extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var defaultImgMes = {
			src : "",
		};
		var imgMes = this.props.imgMes?this.props.imgMes:defaultImgMes;
		return (
			<div className={ uploadStyle.imgPreViewBox } key={this.props.key}>
				<div className={uploadStyle.imgMask}></div>
				<img src={ imgMes.src } />
				<div className={uploadStyle.imgEditBtn}>
					<Btn btn={
						{
							type: "button",
							value: "编辑",
							getFileData:this.props.editImg
						}
					} />
				</div>
				<div className={uploadStyle.imgDelBtn}>
					<Btn btn={
						{
							type: "button",
							value: "删除",
							getFileData:this.props.delImg
						}
					} />
				</div>
				
			</div>
		);
	}
}

class Btn extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		var defaultBtn = {
			type:"file",
			value: "选择文件"
		}
		var btnMes = this.props.btn?this.props.btn: defaultBtn;
		if(btnMes.type === "file"){
			return (
				<div className = { uploadStyle.inputBox }>
					<div className={ uploadStyle.fileInputBox }>
						<input type={btnMes.type} onChange = {btnMes.getFileData} />
						<span>选择文件</span>
					</div>
				</div>
			);
		}else{
			return (
				<div className = { uploadStyle.inputBox }>
					<input onClick = { btnMes.getFileData } value={btnMes.value} type={btnMes.type} />
				</div>
			);

		}
		
	}
}

class NavBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			navList:[{
				id:1,
				pid:0,
				name:"首页",
				link:"#"
			},{
				id:2,
				pid:0,
				name:"首页1",
				link:"#"
			},{
				id:3,
				pid:0,
				name:"首页2",
				link:"#"
			},{
				id:4,
				pid:1,
				name:"首页3",
				link:"#"
			},{
				id:5,
				pid:1,
				name:"首页4",
				link:"#"
			},{
				id:6,
				pid:2,
				name:"首页5",
				link:"#"
			},{
				id:7,
				pid:3,
				name:"首页6",
				link:"#"
			},{
				id:8,
				pid:4,
				name:"首页6",
				link:"#"
			}]
		}
	}

	reacursiveData(data,pid){
		var result = [],temp;
		for(var i in data){
			if(data[i].pid == pid){
				result.push(data[i]);
				temp = this.reacursiveData(data,data[i].id);
				if(temp.length > 0){
					data[i].children = temp;
				}
			}
		}
		return result;
	}

	

	render(){
		var tree = this.reacursiveData(this.state.navList,0);
		// console.log(tree);
		return (
			<div>
				这是导航
			</div>
		);
	}
}

class WaterFall extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imgList:[{
				id:1,
				imgSrc : img,
				width : 230,
				height:129
			},{
				id:2,
				imgSrc : img1,
				width : 230,
				height:230
			},
			{
				id:3,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:4,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:5,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:6,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:7,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:8,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:9,
				imgSrc : img,
				width : 230,
				height:129
			},
			{
				id:10,
				imgSrc : img1,
				width : 230,
				height:230
			},
			{
				id:11,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:12,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:13,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:14,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:15,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:16,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:17,
				imgSrc : img,
				width : 230,
				height:129
			},
			{
				id:18,
				imgSrc : img1,
				width : 230,
				height:230
			},
			{
				id:19,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:20,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:21,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:22,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:23,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:24,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:25,
				imgSrc : img,
				width : 230,
				height:129
			},
			{
				id:26,
				imgSrc : img1,
				width : 230,
				height:230
			},
			{
				id:27,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:28,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:29,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:30,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:31,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:32,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:33,
				imgSrc : img,
				width : 230,
				height:129
			},
			{
				id:34,
				imgSrc : img1,
				width : 230,
				height:230
			},
			{
				id:35,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:36,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:37,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:38,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:39,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:40,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:41,
				imgSrc : img,
				width : 230,
				height:129
			},
			{
				id:42,
				imgSrc : img1,
				width : 230,
				height:230
			},
			{
				id:43,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:44,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:45,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:46,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:47,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:48,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:49,
				imgSrc : img,
				width : 230,
				height:129
			},
			{
				id:50,
				imgSrc : img1,
				width : 230,
				height:230
			},
			{
				id:51,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:52,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:53,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:54,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:55,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:56,
				imgSrc : img,
				width : 230,
				height:129
			},
			{
				id:57,
				imgSrc : img1,
				width : 230,
				height:230
			},
			{
				id:58,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:59,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:60,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:61,
				imgSrc : img2,
				width : 230,
				height:150
			},{
				id:62,
				imgSrc : img3,
				width : 230,
				height:100
			},{
				id:63,
				imgSrc : img4,
				width : 230,
				height:160
			},{
				id:64,
				imgSrc : img3,
				width : 230,
				height:100
			}],
			imgPos:[],
			start:0,
			end:20,
			minTop:0,
			curScrollTop:0

		}
		
	}
	componentDidMount(){
		var clientW = document.documentElement.clientWidth;
		var num = Math.floor(clientW / 230);
		var imgPos = [];
		var leftPadding = (clientW - (num - 1)*5 - num * 230)/2;
		var rightPadding = leftPadding;
		for(var i = 1;i<=num;i++){
			imgPos.push({
				left: leftPadding + (i-1)*235,
				top:0
			})

		}
		if(!this.state.imgPos.length){
		var waterFallDOM = document.getElementById('waterFall');
		var waterFallDOMChildren = waterFallDOM.childNodes;
		var self = this;
		// setTimeout(function(){
			// console.log(waterFallDOMChildren);
		// if(waterFallDOMChildren.length){
		// 	for(var i = 0;i<self.state.imgList.length;i++){
		// 		self.state.imgList[i].width = waterFallDOMChildren[i].clientWidth;
		// 		self.state.imgList[i].height += waterFallDOMChildren[i].offsetHeight;
		// 		console.log(waterFallDOMChildren[i].clientHeight);
		// 	}
		// }
		// console.log(self.state.imgList);
		window.addEventListener("scroll",function scrollHandle(e){
			// console.log(e.wheelDelta);

			// console.log((this.minTop - window.clientHeight));
			if(document.body.scrollTop > (self.state.minTop - window.outerHeight) && document.body.scrollTop - self.state.curScrollTop > 0){
				window.removeEventListener("scroll",scrollHandle,false);
				console.log(1);
				self.setState({
					end : self.state.end + 10,
					start : self.state.start + 10,
				})
				
			}
			if(document.body.scrollTop > (self.state.minTop - window.outerHeight) && document.body.scrollTop - self.state.curScrollTop < 0){
				window.removeEventListener("scroll",scrollHandle,false);
				console.log(2);
				self.setState({
					end : self.state.end - 10,
					start : self.state.start - 10,
				})
				
			}
			self.state.curScrollTop = document.body.scrollTop
		},false);
		self.setState({
			imgPos: imgPos
		})
		// },0)
		
			
		}
	}
	render(){
		var imgBoxList = [];
		var imgPos = this.state.imgPos;
		var imgPosLen = imgPos.length;
		var imgList = this.state.imgList;
		var start = this.state.start;
		var end = this.state.end;
		var minTopIndex = 0;
		if(imgPos.length){
			for(var i = start;i<end;i++){
				for(var j = 0;j<imgPos.length;j++){
					if(imgPos[j].top < imgPos[minTopIndex].top){
						minTopIndex = j;
					}
				}
				imgBoxList.push(<ImgBox width={imgList[i].width} height = {imgList[i].height} left = { imgPos[minTopIndex].left } top = { imgPos[minTopIndex].top } key = {imgList[i].id} imgSrc = { imgList[i].imgSrc } />);
				imgPos[minTopIndex].top  += (230/imgList[i].width)*imgList[i].height + 69;
			}
			this.state.minTop = imgPos[minTopIndex].top;
		}else{
			for(var i = 0;i<imgList.length;i++){
				imgBoxList.push(<ImgBox left = { 0 } top = { 0 } key = {imgList[i].id} imgSrc = { "" } />);
			}
		}

		return (
			<div id="waterFall" className = { waterFall.waterFallContainer }>
				{imgBoxList}
			</div>
		);
	}
}

function ImgBox(props){
	var style = {
		left:props.left,
		top:props.top
	}
	var styleImg = {
		width:props.width,
		height:props.height
	}
	var img = props.imgSrc?<img style = {styleImg} className = {waterFall.targetImg} src = {props.imgSrc} />:"";
	return (
		<div style = {style} key = {props.key} className = {waterFall.imgBox} >
			<div className = { waterFall.imgBoxPos }>
				<div className = { waterFall.handleBtn }>
					<div className = { waterFall.getBtn }>收藏</div>
					<div className = { waterFall.loveBtn }>喜欢</div>
				</div>
				{img}
				<div className = {waterFall.cover}></div>
			</div>
			<div className = { waterFall.imgDesc }>
				<div className = {waterFall.imgMaskBox}>
					<div className ={ waterFall.imgDescCon }>
						<div className = { waterFall.imgDCL }>
							<p>本文用纯js代码手写一个瀑布流网页效果，初步实现一个基本的瀑布流布局，以及滚动到底部后模拟ajax数据加载新图片功能。</p>
						</div>
						<div className = { waterFall.imgDCR }>
							<div className = { waterFall.imgMoreSpace }></div>
							<div className = { waterFall.imgDesMore }>...</div>
						</div>
					</div>
				</div>
				<span>评论 : 12</span>
				<span>作者 : YXL</span>
			</div>
		</div>
	);
}
var Uploads  = {};
Uploads.mediaManage = Upload;
Uploads.WaterFall = WaterFall;

module.exports = Uploads;

