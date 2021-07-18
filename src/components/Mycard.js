import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import Card from 'react-bootstrap/Card'

class Mycard extends React.Component {
    render() {
        return (
            <>
            
                {this.props.showBooksComponent &&
                    this.props.bookArr.map((val, idx) => {
                        return (
                            <div key={idx}>
                                
                                <Card >
                                    <Card.Body>
                                        <Card.Title>{val.name}</Card.Title>
                                        <Card.Img src={val.img} alt={val.name} style={{width:100,height:100}} />
                                       
                                        <Card.Text>

                                            {val.description}
                                        </Card.Text>
                                        <Card.Text>
                                            {val.status}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                }
            </>

        )
    }
}

export default Mycard