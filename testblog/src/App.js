//应用模块
import React from 'react';
import 'global.scss';

class App extends React.Component{
	render(){
		return(
			<div>
				{this.props.children}
			</div>
		)
	}
}

export default App;