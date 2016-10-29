const mockData = {
	artData:[{
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
	}]
}


export default function(state=mockData,action){
	switch(action.type){
		case "sendArtData":
			// alert(action.cateId);
			return Object.assign({},state,{artData:action.artData});
		break;
		default:
			return state;
		break;
	}
}