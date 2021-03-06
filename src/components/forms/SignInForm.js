import React, {Component} from 'react';
import {Button, Form, Grid, Header, Message} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import InlineError from "../messages/InlineError";

class SignInForm extends Component {

    state = {
        data: {
            username: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate(this.state.data);
        this.setState({errors});

        if (Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props.submit(this.state.data)
                .catch(err => this.setState({
                    loading: false,
                    errors: {server: 'Invalid credentials.'}
                }));
        }
    };

    validate = (data) => {
        const errors = {};

        if (!data.password)
            errors.password = 'Password cannot be empty.';
        if (!data.username)
            errors.username = 'Username cannot be empty.';

        return errors;
    };

    render() {
        const {data, errors, loading} = this.state;

        return (

            <Grid style={{height: '100%'}} verticalAlign='middle'>
                <Grid.Column>
                    <Form onSubmit={this.onSubmit} loading={loading}>
                        {errors.server &&
                        <Message negative>
                            <Message.Header>{errors.server}</Message.Header>
                        </Message>
                        }

                        {errors.username && <InlineError text={errors.username}/>}
                        <Form.Field required error={!!errors.username}>
                            <Form.Input
                                icon='user'
                                iconPosition='left'
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                value={data.username}
                                onChange={this.onChange}
                            />
                        </Form.Field>

                        {errors.password && <InlineError text={errors.password}/>}
                        <Form.Field required error={!!errors.password}>
                            <Form.Input
                                icon='lock'
                                iconPosition='left'
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={this.onChange}
                            />
                        </Form.Field>
                        <div className="field">
                            <Button fluid className="primary">Enter Swolehalla</Button>
                        </div>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

SignInForm.propTypes = {
    submit: PropTypes.func.isRequired,
};

export default SignInForm;
