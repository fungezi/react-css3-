const mockdata = {
	pageId:1,
	pagemenu:{
		getArticleing:false,
		pageId:1,
		pageCount:5,
		totalPage:10,
		curPage:1
	},
	designArtice:[{
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
	}],
	imgDatas:[{
		imgId:0,
		src:"slide3.jpg",
		alt:"this is a pic1",
		
	},{
		imgId:1,
		src:"slide2.jpg",
		alt:"this is a pic2",
	},{
		imgId:2,
		src:"slide2.jpg",
		alt:"this is a pic2",
	},{
		imgId:3,
		src:"slide2.jpg",
		alt:"this is a pic2",
	}],


}


export default function homeReducer(state = mockdata,action){
	switch(action.type){
		case "pagemenu/getArticleing":
			return Object.assign({},state,{ getArticleing:true });
			break;
		case "pagemenu/getArticle":
			state.designArtice[0].hot = action.pageId;
			return Object.assign({},state,{ designArtice:state.designArtice });
			break;
		default:
			return state;
	}

}