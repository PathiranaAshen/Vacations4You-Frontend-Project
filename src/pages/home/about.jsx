import React, { useState , useEffect } from 'react';
import { MDBBtn} from 'mdb-react-ui-kit';
import NavBar from './common/before_login';
import Footer from './common/footer';
import { bg5 } from "../../assets/assets";
function About() {

    return (
        <>
            <NavBar/>
            <div className='mb-5 bg-dark'>
                <div className='P-5 text-center' style={{paddingTop:'5%' , paddingBottom:'5%'}}>
                    <h1 style={{fontSize:'60px' , letterSpacing:'1px'}} className='text-warning'>ABOUT US</h1>
                    <span style={{letterSpacing:'3px' }}  className="text-warning">Home / About Us</span>
                </div>
            </div>
            <section style={{paddingTop:'10%', paddingBottom:'20%' }}>
               
                <div className='container' style={{paddingTop:'3%' }}>
                    <div className='row'>
                        <div className='col'>
                            <img className='shadow' src={bg5} style={{width:'80%' , borderRadius:'10px'}}/>
                        </div>
                        <div className='col'>
                        <h6 className='fw-light text-right' style={{lineHeight:'30px'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur
                                sagittis convallis. Quisque condimentum enim eu lectus bibendum ultrices in sit amenulla. Aliquam nec
                                velit orci. Nulla commodo consectetur odio. Integer felis nibh, rutrum eu magna venenatis,
                                egestas vestibulum diam. Mauris a mi ultrices, imperdiet turpis nec, cursus magna. Quisque sagittis elementum porttitor. Curabitur vitae tincidunt ante. Quisque venenatis augue sit amet dignissim vehicula. Integer purus ligula, tempor quis lacus at, efficitur pharetra dui. Pellentesque congue augue mi. Sed vel mattis dui. Curabitur lorem eros, tempus et urna ac, varius scelerisque felis. Mauris
                            </h6>
                            
                        </div>
                    </div>  
                </div>
            </section>
        
            <Footer/>
        </>
    )
}
export default About;