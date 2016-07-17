import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import Backbone from 'backbone'
import {BlogCollection} from './models/models.js'
import {User} from './models/models.js'
import HomeView from './views/HomeView.js'
import PublisherView from './views/PublisherView.js'
import LoginView from './views/LoginView.js'
import BlogsView from './views/BlogsVIew.js'
import init from './init'

const app = function() {

	const BlogRouter = Backbone.Router.extend({
		routes: {
			'blogs/read' : 'showBlogs',
			'blogs/write' : 'showBlogPublisher',
			'home' : 'showHome',
			'login': 'showLogin',
			'*catchall' : 'redirect'	

		},

		redirect: function () {
			location.hash = 'home'

		},

		showHome: function () {

			ReactDOM.render(<HomeView />, document.querySelector('.container'))

		},

		showLogin: function () {
			ReactDOM.render(<LoginView />, document.querySelector('.container'))
		

		},

		showBlogs: function () {
			var coll = new BlogCollection()
						coll.fetch().fail(function(err){
							console.log(err)
			})
			
			ReactDOM.render(<BlogsView coll={coll} />, document.querySelector('.container'))


		},

		showBlogPublisher: function () {
			
			ReactDOM.render(<PublisherView />, document.querySelector('.container'))


		},

		initialize: function () {
			this.on("route",(rtHandler)=> {
				console.log(User.getCurrentUser())
				if (!User.getCurrentUser()) {
					location.hash = "login"
				}
				else {
					if (rtHandler.toLowerCase().includes('login')) {
						location.hash = "home"
					}
					window.rh = rtHandler				
				}
			})

			Backbone.history.start()

		}
	})

	new BlogRouter()

}

export const app_name = init()
app()