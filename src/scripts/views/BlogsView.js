import React from 'react'
import $ from 'jquery'
import Header from './header'

var BlogsView = React.createClass({

	getInitialState: function() {
		return {
			coll: this.props.coll
		}
	},

	componentWillMount: function() {
		this.state.coll.on('sync update',()=>{
			this.setState({
				coll: this.state.coll
			})
		})
	},

	render: function() {
		return (
			<div className="blogsView">
				<Header />
				<Published coll={this.props.coll} />
			</div>
			)
	}
})

var Published = React.createClass({
	_makeBlog: function(record) {
		return <Blog key={record.id} record={record} />
	},

	render: function() {
		return (
			<div className="published">
				{this.props.coll.map(this._makeBlog)}
			</div>
			)
	}
})

var Blog = React.createClass({

	_removeModel: function() {
		this.props.record.destroy({
			url: `/api/messages/${this.props.record.id}`		
		})
	},

	render: function() {
		return (
			<div className="blog">
				<div className="blogDetails">
					<p>to: {this.props.record.get('to')}</p>
					<p>from: {this.props.record.get('from')}</p>
					<p>{this.props.record.get('content')}</p>
				</div>
				<button onClick={this._removeModel} >X</button>
			</div>
			)
	}
})