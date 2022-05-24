import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid } from 'semantic-ui-react'

export default function TalimatSayfasi() {
    return (
        <div>
            <Form className="montaj-form">
                <Grid>
                    <Grid.Row style={{ "height": "100vh", "padding-right": "0", "padding-bottom": "0" }}>
                        <Grid.Column width={15} style={{ "padding": "0" }}>
                            <embed src="http://localhost:6161/WebAccessman.pdf"
                                width="100%"
                                height="100%">
                            </embed>
                        </Grid.Column>

                        <Grid.Column width={1}>
                            <Link to="/operator">
                                <Button className="talimat-btn" primary>
                                    Geri <br></br><br></br> Dön
                                </Button>
                            </Link>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>

        </div>
    )
}
