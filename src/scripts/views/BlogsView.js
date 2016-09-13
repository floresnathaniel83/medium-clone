import React from 'react'
import $ from 'jquery'
import {BlogModel} from '../models/models'
import {User} from '../models/models'
import BLOG_STORE from '../store'
import ACTIONS from '../actions'
import Header from './header'
import Backbone from 'backbone'

const BlogsView = React.createClass({

	getInitialState: function() {
		return BLOG_STORE._getData()
	},

	componentWillReceiveProps: function(newProps) {
		let queryForBlogs
	 	if(newProps.routedFrom === 'blogs/myBlogs') {
	 		 queryForBlogs = {'user._id' : User.getCurrentUser()._id}

	 	} else {
	 		 queryForBlogs = {}

	 	}
	 
	 	ACTIONS.fetchBlogs(queryForBlogs)

	 	BLOG_STORE.on('updateContent', () => {
	 			this.setState(BLOG_STORE._getData())
			})
	},

	componentWillMount: function() {
		let queryForBlogs
	 	if(this.props.routedFrom === 'blogs/myBlogs') {
	 		 queryForBlogs = {'user._id' : User.getCurrentUser()._id}

	 	} else {
	 		 queryForBlogs = {}

	 	}
	 
	 	ACTIONS.fetchBlogs(queryForBlogs)

	 	BLOG_STORE.on('updateContent', () => {
	 			this.setState(BLOG_STORE._getData())
			})
	},

	componentWillUnmount: function () {
		
		BLOG_STORE.off('updateContent')

	},

	render: function() {
		return (
			<div className="blogsView">
				<Header />
				<Published coll={this.state.collection} />
			</div>
			)
	}
})

const Published = React.createClass({
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

const Blog = React.createClass({

	_removeModel: function() {
		this.props.record.destroy({
			url: `/api/blogs/${this.props.record.id}`		
		})
	},

	render: function() {
		return (
			<div className="blog">
				<div className="blogDetails">
					<p>{this.props.record.get('user').email}</p>
					<p>Title: {this.props.record.get('title')}</p>
					<p>Content: {this.props.record.get('body')}</p>
				
				</div>
				<button onClick={this._removeModel} >X</button>
			</div>
			)
	}
})

export default BlogsView