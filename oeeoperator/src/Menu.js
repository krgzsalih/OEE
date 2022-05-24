import React, { Component } from "react";
import "./Menu.css";
import {BrowserRouter as Router, Route, Link, NavLink, Redirect, Switch} from 'react-router-dom';
import { Icon } from "semantic-ui-react";

class Menu extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var visibility = "hide";

    if (this.props.menuVisibility) {
      visibility = "show";
    }
    
    return (
        <div id="flyoutMenu"
            /*onClick={this.props.handleMouseDown}*/
            className={visibility}>
          
          <h2><NavLink 
                  activeStyle={{color:'red'}} 
                  exact to='/foodProducitonLine'
                  onClick={this.props.handleMouseDown}
                  >Food Production Line
              </NavLink>
          </h2>

          <h2><NavLink 
                activeStyle={{color:'red'}} exact to='/motor'
                onClick={this.props.handleMouseDown}
                >Motor
              </NavLink>
          </h2>
          
          <h2><NavLink activeStyle={{color:'red'}} exact to='/agriculture'
                onClick={this.props.handleMouseDown}
              >Agriculture
            </NavLink>
          </h2>
          <h2><NavLink activeStyle={{color:'red'}} exact to='/electronic'
                onClick={this.props.handleMouseDown}
              >Electronic Process Monitor
             </NavLink>
          </h2>     

          <Icon className="x" 
                id="roundButton"
                size="huge"
                onClick={this.props.handleMouseDown}></Icon>
        </div>
    );
  }
}
 
export default Menu;