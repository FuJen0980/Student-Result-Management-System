import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';

const Body = () => {
    const homepagestyle={  
        backgroundImage: "url(" + "https://smd-cms.nasa.gov/wp-content/uploads/2023/06/North-star_celestial-pole-1-jpg.webp?w=4096&format=png" + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '700px'
        }
    return (
        <>
        <main style = {homepagestyle}>
            <Row className = {`pt-5`}>
                <h1 className = {`text-white  text-center`}>Student Result Management System</h1>

            </Row>
            
            <Row className='pt-5 offset-4 col-4'>
              <div className='border border-primary rounded pt-1 pd-2'>
                <Form>
                    <fieldset>
                        <legend><strong className='text-white'>Login</strong></legend>

                        <p><select className = {`form-control`}>
                            <option defaultvalue>Identity</option>
                            <option>Administraion</option>
                            <option>Student</option>
                        </select></p>

                        <p><input type="text" placeholder='Name' className = {`form-control`}></input></p>
                        <p><input type="text" placeholder='Password'className = {`form-control`}></input></p>

                        <div className={`d-grid gap-2`}>
                            <Button href="#" className={`btn-primary pr-5`}>Login</Button>      
                        </div><br></br>

                        
                    </fieldset>
                    
                </Form>
                </div>
                </Row>
            
        </main>
        
        </>
        
    );
    
}
export default Body;