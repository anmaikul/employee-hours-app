import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {
    render() {
        const { path, authenticated } = this.props;
        return (
            <Menu inverted pointing>
                <Menu.Menu >
                    <Menu.Item active={path.pathname === '/'} onClick={()=> browserHistory.push('/')}>
                        TLC INFO-MANAGEMENT
                    </Menu.Item>
                    <Menu.Item active={path.pathname === '/hours/index'} onClick={()=> browserHistory.push('/hours/index')}>
                        PAYROLL
                    </Menu.Item>
                    <Menu.Item active={path.pathname === '/timestamp'} onClick={()=> browserHistory.push('/timestamp')}>
                        CLOCK
                    </Menu.Item>
                    <Menu.Item active={path.pathname === '/employee'} onClick={()=> browserHistory.push('/employee')}>
                        EMPLOYEES
                    </Menu.Item>
                </Menu.Menu>
                { authenticated ? (
                    <Menu.Menu position='right'>
                        <Menu.Item onClick={()=> browserHistory.push('/signout')}>
                            Sign-out
                        </Menu.Item>
                        <Menu.Item onClick={()=> browserHistory.push('/owner/index')}>
                            <img id="logo" src='http://tlclearningcenter.org/favicon.ico'/>
                        </Menu.Item>
                    </Menu.Menu>
                ) : (<Menu.Menu position='right'>
                        <Menu.Item onClick={()=> browserHistory.push('/signin')}>
                            Sign-in
                        </Menu.Item>
                        <Menu.Item onClick={()=> browserHistory.push('/owner/index')}>
                            <img id="logo" src='http://tlclearningcenter.org/favicon.ico'/>
                        </Menu.Item>
                    </Menu.Menu>)
                 } 
            </Menu>
        )
    }
}

const mapStateToProps = (state) => (
    {
        authenticated: state.auth.authenticated,
        owner: state.owner.authenticated
    }
)

export default connect(mapStateToProps)(Header);

