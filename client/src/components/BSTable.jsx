import React, { Component } from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class BSTable extends Component {
    render() {
        if (this.props.data) {
            return (
                <div>
                    <Form>
                        <FormGroup controlId="formControlsText">
                            <FormControl type="text" placeholder="Enter text" />
                        </FormGroup>

                        <Button type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            );
        } else {
            return (<p>?</p>);
        }
    }
}