import React from 'react'
import ACTIONS from '../actions.js' 

const Header = React.createClass({
	render: function() {
		return (
			<div id="headerContainer">
				<h3 id="header">Blogosphere</h3>
				<h1>B</h1>
				<NavBar />
			</div>
			)
	}
})

const NavBar = React.createClass({
	render: function() {
		return (
			<div id="navBar">
				<a href="#login">Login</a>
				<a href="#home">Home</a>
				<a href="#blogs/myBlogs">Published</a>
				<a href="#blogs/write">Publish</a>
				<a href="#" onClick={ACTIONS.logUserOut}>Log out</a>
			</div>
			)
	}
})

export default Header