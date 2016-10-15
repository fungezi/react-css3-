//应用模块
import React from 'react';
import 'global.scss';

class App extends React.Component{
	render(){
		return(
			<div>
				这里是首页
				{this.props.children}
			</div>
		)
	}
}

export default App;