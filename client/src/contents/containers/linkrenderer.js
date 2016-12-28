import React from 'react';
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router"

//renders all the nav links from an array
const linkRenderer = (links, user) => {
	return links.map((link, i) => {
		if (link.condition) {
			if (user.getIn(["permission", link.condition])) {
				return (
					<Menu.Item as={Link} to={link.to} key={i}>
						{link.name}
					</Menu.Item>
				)
			} else {
				return null
			}
		} else {
			return (
				<Menu.Item as={Link} to={link.to} key={i}>
					{link.name}
				</Menu.Item>
			)
		}
	})
}

export default linkRenderer