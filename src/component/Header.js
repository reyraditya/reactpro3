import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
} from 'reactstrap';


import {onLogoutUser} from '../action';

class Header extends Component{
    // Untuk memunculkan dropdown dengan library reactstrap
    constructor(props) {
        super(props);

         this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
    }

     toggle() {
    this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
    }));
    }

    render(){
        const {user} = this.props

        if(user.username === ''){
           return( //Kalau username kosong/tidak login tampilkan button login dan register
            <div>
                <Navbar color="light" light expand="md">
                        <div className="container">
                            <Link className="navbar-brand" to="/">SSENCE</Link>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Link className="nav-link" to="/">All Product</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/register"><Button className="mx-3" color="primary">Register</Button></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/login"><Button color="success">Login</Button></Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </div>
            ) 
        } else{
            return (
                <div>
                    <Navbar color="light" light expand="md">
                        <div className="container">
                            <NavbarBrand href="/">SSENCE</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Link className="nav-link" to="/">All Product</Link>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            Welcome, {user.username}
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                        <Link className="dropdown-item" to="/manageproduct">
                                            <DropdownItem>Manage Product</DropdownItem>
                                        </Link>
                                        <Link className="dropdown-item" to="/cart">
                                            <DropdownItem>Cart</DropdownItem>
                                        </Link>
                                        
                                        <DropdownItem divider />
                                        <Button className="dropdown-item" onClick={this.props.onLogoutUser}>
                                            Log out
                                        </Button>
                                        
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Nav>
                            </Collapse>
                        </div>
                    </Navbar>
                </div>
            )
        }
    }
}

const mapsStateToProps = state => {
    return {user: state.auth} // fetch data username dari redux store
}

export default connect(mapsStateToProps,{onLogoutUser})(Header);