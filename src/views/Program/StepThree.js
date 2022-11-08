import React, { Component } from 'react';
import i18n from '../../i18n';
import AuthenticationService from '../Common/AuthenticationService.js';
import ProgramService from "../../api/ProgramService";
import { Formik } from 'formik';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent'
import * as Yup from 'yup'
import {
    Button, FormFeedback, CardBody,
    Form, FormGroup, Label, Input,
} from 'reactstrap';
import getLabelText from '../../CommonComponent/getLabelText';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import classNames from 'classnames';
import { API_URL } from '../../Constants';

const initialValuesThree = {
    healthAreaId: []
}

const validationSchemaThree = function (values) {
    return Yup.object().shape({
        healthAreaId: Yup.string()
            .required(i18n.t('static.program.validhealthareatext')),
    })
}

const validateThree = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values)
        try {
            validationSchema.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationErrorThree(error)
        }
    }
}

const getErrorsFromValidationErrorThree = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}


export default class StepThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            healthAreaList: [],
            healthAreaId: ''
        }
        this.generateHealthAreaCode = this.generateHealthAreaCode.bind(this);
    }

    touchAllThree(setTouched, errors) {
        setTouched({
            healthAreaId: true
        }
        )
        this.validateFormThree(errors)
    }
    validateFormThree(errors) {
        this.findFirstErrorThree('healthAreaForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }
    findFirstErrorThree(formName, hasError) {
        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            if (hasError(form[i].name)) {
                form[i].focus()
                break
            }
        }
    }

    generateHealthAreaCode(value) {
        var healthAreaId = value;
        let healthAreaCode = ''
        for (var i = 0; i < healthAreaId.length; i++) {
            healthAreaCode += this.state.healthAreaList.filter(c => (c.value == healthAreaId[i].value))[0].healthAreaCode + "/";
        }
        this.props.generateHealthAreaCode(healthAreaCode.slice(0, -1));
    }

    getHealthAreaList() {
        // AuthenticationService.setupAxiosInterceptors();
        // ProgramService.getHealthAreaList(this.props.items.program.realm.realmId)
        ProgramService.getHealthAreaListByRealmCountryId(this.props.items.program.realmCountry.realmCountryId)
            .then(response => {
                if (response.status == 200) {
                    var json = response.data;
                    var haList = [];
                    for (var i = 0; i < json.length; i++) {
                        haList[i] = { healthAreaCode: json[i].healthAreaCode, value: json[i].healthAreaId, label: getLabelText(json[i].label, this.state.lang) }
                    }

                    var listArray = haList;
                    listArray.sort((a, b) => {
                        var itemLabelA = a.label.toUpperCase(); // ignore upper and lowercase
                        var itemLabelB = b.label.toUpperCase(); // ignore upper and lowercase                   
                        return itemLabelA > itemLabelB ? 1 : -1;
                    });
                    this.setState({
                        healthAreaId: '',
                        healthAreaList: listArray
                    })
                } else {
                    this.setState({
                        message: response.data.messageCode
                    })
                }
            }).catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({
                            // message: 'static.unkownError',
                            message: API_URL.includes("uat") ? i18n.t("static.common.uatNetworkErrorMessage") : (API_URL.includes("demo") ? i18n.t("static.common.demoNetworkErrorMessage") : i18n.t("static.common.prodNetworkErrorMessage")),
                            loading: false
                        });
                    } else {
                        switch (error.response ? error.response.status : "") {

                            case 401:
                                this.props.history.push(`/login/static.message.sessionExpired`)
                                break;
                            case 403:
                                this.props.history.push(`/accessDenied`)
                                break;
                            case 500:
                            case 404:
                            case 406:
                                this.setState({
                                    message: error.response.data.messageCode,
                                    loading: false
                                });
                                break;
                            case 412:
                                this.setState({
                                    message: error.response.data.messageCode,
                                    loading: false
                                });
                                break;
                            default:
                                this.setState({
                                    message: 'static.unkownError',
                                    loading: false
                                });
                                break;
                        }
                    }
                }
            );
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <AuthenticationServiceComponent history={this.props.history} />
                <Formik
                    initialValues={initialValuesThree}
                    validate={validateThree(validationSchemaThree)}
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                        console.log("in success--");
                        this.props.finishedStepThree && this.props.finishedStepThree();

                    }}
                    render={
                        ({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            isValid,
                            setTouched,
                            handleReset,
                            setFieldValue
                        }) => (
                            <Form className="needs-validation" onReset={handleReset} onSubmit={handleSubmit} noValidate name='healthAreaForm'>
                                <FormGroup>
                                    <Label htmlFor="select">{i18n.t('static.program.healtharea')}<span class="red Reqasterisk">*</span></Label>
                                    <Select
                                        className={classNames('form-control', 'col-md-4', 'd-block', 'w-100', 'bg-light',
                                            { 'is-valid': !errors.healthAreaId && this.props.items.program.healthAreaArray.length != 0 },
                                            { 'is-invalid': (touched.healthAreaId && !!errors.healthAreaId) }
                                        )}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setFieldValue("healthAreaId", e);
                                            this.props.updateFieldDataHealthArea(e);
                                            this.generateHealthAreaCode(e)
                                        }}

                                        onBlur={handleBlur}
                                        bsSize="sm"
                                        name="healthAreaId"
                                        id="healthAreaId"
                                        multi
                                        options={this.state.healthAreaList}
                                        value={this.props.items.program.healthAreaArray}
                                    />
                                    <FormFeedback className="red">{errors.healthAreaId}</FormFeedback>
                                </FormGroup>
                                <FormGroup>

                                    <Button color="info" size="md" className="float-left mr-1" type="reset" name="healthPrevious" id="healthPrevious" onClick={this.props.previousToStepTwo} ><i className="fa fa-angle-double-left"></i> {i18n.t('static.common.back')}</Button>
                                    &nbsp;
                                    <Button color="info" size="md" className="float-left mr-1" type="submit" name="healthAreaSub" id="healthAreaSub" onClick={() => this.touchAllThree(setTouched, errors)} disabled={!isValid}>{i18n.t('static.common.next')} <i className="fa fa-angle-double-right"></i></Button>
                                    &nbsp;
                                </FormGroup>
                            </Form>
                        )} />

            </>

        );
    }

}