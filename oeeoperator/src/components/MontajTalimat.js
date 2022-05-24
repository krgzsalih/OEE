import React, { Component } from 'react';
import { Button} from 'semantic-ui-react';
import { Link } from "react-router-dom";

export default class MontajTalimat extends Component {

    talimat=()=>{
        
    }
    render() {
        return (
            <div>
                {/* <Popup style={{"background-color":"rgb(165, 165, 200)", "width": "100vw", "height":"auto"}}
                    position
                    wide trigger={} on='click'>
                        
                </Popup>  */}
                <Link to='/montaj_talimat'>
                    <Button onClick={this.talimat} className="left-buttons2" content='MONTAJ TALİMAT GÖRÜNTÜLE' />
                </Link>      
            </div>
        )
    }
}
