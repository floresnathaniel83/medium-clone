import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import {BlogCollection} from './models/models.js'
import {User} from './models/models.js'
import PublisherView from './views/PublisherView.js'
import LoginView from './views/LoginView.js'
import BlogsView from './views/BlogsView.js'
import init from './init'

const app = function() {

	const BlogRouter = Backbone.Router.extend({
		routes: {
			'home' : 'showHome',
			'blogs/write' : 'showBlogPublisher',
			'blogs/myBlogs' : 'showBlogs',
			'login': 'showLogin',
			'*catchall' : 'redirect'	

		},

		redirect: function () {
			location.hash = 'home'

		},

		showHome: function () {


			ReactDOM.render(<BlogsView routedFrom='home' />, document.querySelector('.container'))

		},

		showBlogs: function () {
	
		
			ReactDOM.render(<BlogsView routedFrom='blogs/myBlogs' />, document.querySelector('.container'))


		},

		showLogin: function () {
			
			ReactDOM.render(<LoginView />, document.querySelector('.container'))
		

		},

	

		showBlogPublisher: function () {
			
			ReactDOM.render(<PublisherView />, document.querySelector('.container'))


		},

		initialize: function () {
			//>>> runs when there is any route change
			this.on("route",(rtHandler)=> {
				//console.log(User.getCurrentUser())
				if (!User.getCurrentUser()) { //>>> this ensures that if the user is not logged in, they are forced to go to the login page
					location.hash = "login"
				}
				else {
					if (rtHandler.toLowerCase().includes('login')) { //>>> this ensures that if the user is logged in they will not be able to re-login and will be sent to the homepage
						location.hash = "home"
					}
									
				}
			})

			Backbone.history.start()

		}
	})

	new BlogRouter()

}

export const app_name = init()
app()