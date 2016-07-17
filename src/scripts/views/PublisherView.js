import React from 'react'
import {BlogModel, User} from '../models/models'
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
		e.preventDefault()
		
		var newBlog = new BlogModel({
			user: User.getCurrentUser().email, //>>>gets user email from schema
			title: e.target.to.value,
			content: e.target.content.value
		})
		// makes a post request to the url set as a property on the model. 
		// all of the model's attributes will comprise the body of the request.
		newBlog.save()
	},

	render: function() {
		return (
			<form onSubmit={this._saveBlog}>
				<input name="title" placeholder="title" />
				<input name="content" placeholder="content" />
				<button type="submit" value="send">Send</button>
			</form>
			)
	}
})

export default PublisherView