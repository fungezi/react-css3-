

let pagemenuAction = {
	getDesignArticle:(pageId)=>(dispatch,getState)=>{
		if(getState().getArticleing){
			return ;
		}else{
			dispatch(pagemenuAction.getArticleing);
			dispatch(pagemenuAction.getArticle(pageId));
			dispatch(pagemenuAction.getArticled);
		}
	},

	getArticleing:()=>({
		type:"pagemenu/getArticleing"
	}),

	getArticle:(pageId)=>({
		type:"pagemenu/getArticle",
		pageId:pageId,
	}),

	getArticled:()=>({
		type:"pagemenu/getArticled"
	})
}

export default pagemenuAction;