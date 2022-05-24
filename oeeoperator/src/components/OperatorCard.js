import { Card, Icon, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import "../App.css";

import React, { Component } from 'react'

export default class OperatorCard extends Component {
  render() {
    return (
      <div>
          <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
              <Card.Header>{this.props.gelenUser.calisanAdi}</Card.Header>
              <Card.Meta>
                <span className='date'>{this.props.gelenUser.gorevTanimi}</span>
              </Card.Meta>
              <Card.Description>
                {this.props.gelenUser.sicilNo}
              </Card.Description>
              <br></br>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' />
            </Card.Content>
          </Card>
      </div>
    )
  }
}

/*
//import React from 'react'

const CardExampleCard = () => (

)

export default CardExampleCard;
*/