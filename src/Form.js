import React, { Component } from 'react'
import './Form.css'
import api from './api'

export default class Form extends Component {
    state = {
        name: '',
        email: '',
        number: '',
        optIn: true
    }
    handleChange = str => e => {
        this.setState({ [str]: e.currentTarget.value })
    }
    handleSubmit = e => {
        e.preventDefault()
        return api.addUser(this.state.name, this.state.email, this.state.number)
    }
    handlePromotionClick = e => {
        this.setState(prevState => ({ optIn: !prevState.optIn }))
    }
    render() {
        return (
            <form data-testid='addUserForm' onSubmit={this.handleSubmit}>
                <h2>Request Information</h2>
                <input data-testid='name' type='text' onChange={this.handleChange('name')} placeholder='Name' value={this.state.name} />
                <input data-testid='email' type='text' onChange={this.handleChange('email')} placeholder='Email' value={this.state.email} />
                <input data-testid='number' type='text' onChange={this.handleChange('number')} placeholder='Number' value={this.state.number} />
                <div>
                    <input data-testid='checked' type='checkbox' checked={this.state.optIn} onChange={() => {}} onClick={this.handlePromotionClick} />
                    <p data-testid='promotionsP' className='promotions'>Receive Promotions</p>
                </div>
                <button type='submit' data-testid='submitButton'>Submit</button>
            </form>
        )
    }
}