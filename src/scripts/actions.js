import {User,BlogModel, BlogCollection} from './models/models'
import BLOG_STORE from './store'

const ACTIONS = {
	registerUser: function(email,password) {
		return User.register(email,password).then((resp) => {
			console.log(resp)
			return this.logUserIn(email,password)
		})
	},

	logUserIn: function(email,password) {
		return User.login(email,password).then(function(resp){
			console.log(resp)
			location.hash = "home"
		})
	},

	logUserOut: function() {
		return User.logout().then(() => {
			location.hash = "login"
		})
	},

	fetchBlogs: function(queryObj) {
        BLOG_STORE.data.collection.fetch({
            data: queryObj
        })
      }
}

export default ACTIONS