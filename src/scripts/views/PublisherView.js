import React from 'react'
import {BlogModel} from '../models/models'
import {User} from '../models/models'
import Header from './header'


const PublisherView = React.createClass({
	render: function() {
		return (
			<div className="publisherView">
				<Header />
				<PublisherForm />
			</div>
			)
	}
})

const PublisherForm = React.createClass({

	_saveBlog: function(e) {
		console.log(e)
		e.preventDefault()
		
		var newBlog = new BlogModel({
			title: e.target.title.value,
			user: User.getCurrentUser(),
			body: e.target.content.value
		})

		console.log(newBlog)
		// makes a post request to the url set as a property on the model. 
		// all of the model's attributes will comprise the body of the request.
		newBlog.save()
	},

	render: function() {
		return (
			<form className='title' onSubmit={this._saveBlog}>
				<h3>Title</h3>
				<input name="title" />
				<h3>Content</h3>
				<input className='content' name="content" />
				<button type="submit" value="send">Publish</button>
			</form>
			)
	}
})

export default PublisherView