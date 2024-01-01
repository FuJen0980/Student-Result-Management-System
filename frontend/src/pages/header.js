import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Row,Nav,NavItem, NavDropdown} from 'react-bootstrap';
import {FiAlignJustify} from "react-icons/fi";

const Head = () => {
    
    return (
        <>
        <header>
            <div className={`container-fluid bg-secondary pb-3 text-white display-6 bg-opacity-25`}>
                <Row className = {`offset-8`}>
                <Nav bsStyle = "fluid" activeKey={1} className = {`justify-content-end`}> 
                        <Nav.Item eventKey={1} className={`pt-2`}>
                            <Nav.Link href="/teacher_home" className = {'text-white'}>Home</Nav.Link>
                         </Nav.Item>
                        
                        <NavDropdown eventKey={2} title="Menu" className = {`text-white pt-2`}>
                           <NavDropdown.Item eventKey={2.1} href="/Input">Input</NavDropdown.Item>
                           <NavDropdown.Item  eventKey={2.2} href="">Grade</NavDropdown.Item>
                           <NavDropdown.Item  eventKey={2.3}>Setting</NavDropdown.Item>
                          <NavDropdown.Item eventKey={2.4}>Log Out</NavDropdown.Item>        
                        </NavDropdown>    
                       
               </Nav>  
                        
               </Row>
                   
            </div>   

        </header>
            
        </>
    );
}

export default Head;