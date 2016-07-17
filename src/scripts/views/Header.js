import React from 'react'
import ACTIONS from '../actions.js' 

const Header = React.createClass({
	render: function() {
		return (
			<div id="headerContainer">
				<h3 id="header">The BlogoSphere</h3>
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
				<a href="#blogs/read">Published</a>
				<a href="#blogs/write">Publish</a>
				<a href="#" onClick={ACTIONS.logUserOut}>log out</a>
			</div>
			)
	}
})

export default Header