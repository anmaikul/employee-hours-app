import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postEmployee, clearEmployeeErrorMessage } from '../../actions/index';
import { Link } from 'react-router';
import AlertMessage from '../alert_message';

class EmployeeNew extends Component {
    constructor(props) {
        super(props);
        this.handleMessageClose = this.handleMessageClose.bind(this);
    }

    handleFormSubmit(formProps) {
        const sendForm = this.props.postEmployee(formProps);
    }

    renderAlert() {
        if (this.props.employeeError) {
            const status = false;
            return (
                <AlertMessage
                    success={status}
                    errorMessage={this.props.employeeError}
                    successMessage={''}
                    handleMessageClose={this.handleMessageClose}
                />
            );
        }
    }

    handleMessageClose() {
        this.props.clearEmployeeErrorMessage();
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="ui container">
                <div className='ui segment'>
                    <h1>ADD A NEW EMPLOYEE</h1>
                </div>
                <div className='ui segment'>
                    <form className="ui form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <Field name='firstName' type='text' component={renderField} label="First Name"/>
                        <Field name='lastName' type='text' component={renderField} label="Last Name"/>
                        <Field name="employeeNumber" component={renderField} label="Employee Number" type="text"/>
                        <Field name="address" component={renderField} label="Address" type="text"/>
                        <Field name="phone" component={renderField} label="Phone" type="text"/>
                        <Field name="DOB" component={renderField} label="Date of Birth" type="text"/>
                        <Field name="sickDaysLeft" component={renderField}  label="Sick Days Left" type="text"/>
                        <Field name="vacationDaysLeft" component={renderField}  label="Vacation Days Left" type="text"/>
                        <Field name="pay" component={renderField} label="Pay" type='text' />
                        <Field name='payType' component={renderRadio} label='Hourly' type='radio' value='hourlyPay'/>
                        <Field name='payType' component={renderRadio} label='Salary' type='radio' value='salary'/>
                        {this.renderAlert()}
                        <button action='submit' className='ui green button'>Add Employee</button>
                        <Link to='/employee'>
                            <button className='ui red button'>Cancel</button>
                        </Link>
                    </form>
                </div>
            </div>  
        )
    }
}

function mapStateToProps(state) {
    return {
        employeeError: state.employee.error
    }
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <input {...input} type={type}/>
        {touched && error && <div className="error">{error}</div>}
    </div>
);

const renderRadio = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
    <div>
        <label><input {...input} type={type} />{label}</label>
        {touched && error && <div className="error">{error}</div>}
    </div>)
}


const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Please enter a first name';
    }
    if (!values.lastName) {
        errors.lastName = 'Please enter a last name';
    }
    if (!values.employeeNumber) {
        errors.employeeNumber = 'Please enter an employee number';
    }
    if (values.employeeNumber) {
        if (values.employeeNumber.length !== 4) {
            errors.employeeNumber = 'Employee number must be four digits long.';
        }
    }
    if (!values.address) {
        errors.address = 'Please enter an address';
    }
    if (!values.phone) {
        errors.phone = 'Please enter a phone number';
    }
    if (!values.DOB) {
        errors.DOB = 'Please enter a date of birth';
    }
    if (!values.sickDaysLeft) {
        errors.sickDaysLeft = 'Please enter the number of sick days left';
    }
    if (!values.vacationDaysLeft) {
        errors.vacationDaysLeft = 'Please enter the number of vacation days left';
    }
    if (!values.pay) {
        errors.pay = 'Please enter a pay amount';
    }
    if (!values.payType) {
        errors.payType = 'Please choose a hourly or salary';
    }
    return errors;
}

EmployeeNew = reduxForm({
    form: 'employee_new_form',
    validate
})(EmployeeNew);

export default connect(mapStateToProps, { postEmployee, clearEmployeeErrorMessage })(EmployeeNew);