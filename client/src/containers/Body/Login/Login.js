import React, { Component } from "react";
import { Container, Button, Form, FormGroup, Label, Input, FormText, FormFeedback, Col } from 'reactstrap';
import { NavLink } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

const url = "http://localhost:3001/user/"

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            errorMsg: "",
            noUserInput: ""
        }
    }
    resetState = () => {
        this.setState({
            userName: "",
            password: "",
            errorMsg: ""
        })
    }

    handleInput = (e) => {
        console.log(this.state.userName)
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    login = async () => {
        /*
        if (!this.state.userName){
            this.setState({noUserInput: "You need to type username!"})
            return
        }
        if (!this.state.password){
            this.setState({errorMsg: "You need to type password!"})
            return 
        }
        */
       if (!this.state.userName || !this.state.password) return
        const body = JSON.stringify({userName:this.state.userName, password:this.state.password});
        console.log(body)
        const res = await fetch(url+"login", {
            method: 'POST',
            body: body,
            headers: {"Content-Type": "application/json"}
        }).then(res => res.json())
        console.log(res)
        if (res.success){
            this.props.history.push("/");
            //this.resetState()
        }
        else {
            this.setState({
                errorMsg: res.msg
            })
        }
        
    }

    render() {
        return (
            <div className="login-container">
                <h3>Welcome to login!</h3>
                <Form className="form">
                    <Col>
                        <FormGroup>
                            <Label for="userName">Username: </Label>
                            <Input value={this.state.userName} type="text" name="userName" id="userName" required placeholder="Username..." onChange={e => this.handleInput(e)} />
                        </FormGroup>
                        <FormText color="danger">
                            {this.state.noUserInput}
                        </FormText>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="password">Password: </Label>
                            <Input value={this.state.password} type="password" name="password" id="password" required="required" placeholder="Password..." onChange={e => this.handleInput(e)} />
                            <FormText color="danger">
                                {this.state.errorMsg}
                            </FormText>
                        </FormGroup>
                    </Col>
                    <div className="login-btn">
                        <Button onClick={(e) => this.login(e)}>
                            Login    
                        </Button>
                        <Button>
                            <NavLink className="normal-btn" to="/register">Register</NavLink>    
                        </Button>
                </div>
                </Form>
                
                                     
                
            </div>
            
        )
    }
}

export default Login;