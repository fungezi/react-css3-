

let showListAction = {
	getShowList:(cateId)=>(dispatch,getState)=>{
		let Datas = showListAction.queryArtData(cateId);
		dispatch(showListAction.sendArtData(Datas));
	},
	sendArtData:(data)=>({
		type:"sendArtData",
		artData:data
	}),
	queryArtData:(cateId)=>{
		return [{
			artId:1,
			src:"image/1.jpg",
			title:"文章的题目题目体贴",
			author:"XXX",
			hot:20,
			cate:"ABC",
		},{
			artId:2,
			src:"image/1.jpg",
			title:"文章的题目题目体贴",
			author:"XXX",
			hot:20,
			cate:"ABC",
		},{
			artId:3,
			src:"image/1.jpg",
			title:"文章的题目题目体贴",
			author:"XXX",
			hot:20,
			cate:"ABC",
		}];
	}

}

export default showListAction;