import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardFooter, Button, CardBody, Form, FormGroup, Label, Input, FormFeedback, InputGroup, InputGroupAddon, InputGroupText, ModalFooter } from 'reactstrap';
import AuthenticationService from '../Common/AuthenticationService';
import imageHelp from '../../assets/img/help-icon.png';
import InitialTicketPageComponent from './InitialTicketPageComponent';
import { Formik } from 'formik';
import i18n from '../../i18n';
import * as Yup from 'yup';
import JiraTikcetService from '../../api/JiraTikcetService';
import UnitService from '../../api/UnitService';
import ForecastingUnitService from '../../api/ForecastingUnitService';

const initialValues = {
    summary: "Add / Update Planning Unit",
    planningUnitDesc: "",
    forecastingUnitDesc: "",
    unit: "",
    multiplier: "",
    notes: ""
}

const validationSchema = function (values) {
    return Yup.object().shape({        
        summary: Yup.string()
            .required(i18n.t('static.common.summarytext')),
        planningUnitDesc: Yup.string()
            .required(i18n.t('static.planningunit.planningunittext')),
        forecastingUnitDesc: Yup.string()
            .required(i18n.t('static.planningunit.forcastingunittext')),
        unit: Yup.string()
            .required(i18n.t('static.procurementUnit.validUnitIdText')),
        multiplier: Yup.string()
            .required(i18n.t('static.planningunit.multipliertext')),
        // notes: Yup.string()
        //     .required(i18n.t('static.common.notestext'))
    })
}

const validate = (getValidationSchema) => {
    return (values) => {
        const validationSchema = getValidationSchema(values)
        try {
            validationSchema.validateSync(values, { abortEarly: false })
            return {}
        } catch (error) {
            return getErrorsFromValidationError(error)
        }
    }
}

const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
        return {
            ...errors,
            [error.path]: error.errors[FIRST_ERROR],
        }
    }, {})
}

export default class PlanningUnitTicketComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            planningUnit: {
                summary: 'Add / Update Planning Unit',
                planningUnitDesc: '',
                forecastingUnitDesc: '',
                unit: '',
                multiplier: '',
                notes: ''
            },
            message : '',
            units: [],
            forecastingUnits: [],
            unitId: '',
            forecastingUnitId: ''
        }        
        this.dataChange = this.dataChange.bind(this);        
        this.resetClicked = this.resetClicked.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
    }  

    dataChange(event) {        
        let { planningUnit } = this.state
        if(event.target.name == "summary") {
            planningUnit.summary = event.target.value;
        }
        if(event.target.name == "planningUnitDesc") {
            planningUnit.planningUnitDesc = event.target.value;
        }
        if(event.target.name == "forecastingUnitDesc") {
            planningUnit.forecastingUnitDesc = event.target.options[event.target.selectedIndex].innerHTML;
            this.setState({
                forecastingUnitId : event.target.value
            })
        }
        if(event.target.name == "unit") {            
            planningUnit.unit = event.target.options[event.target.selectedIndex].innerHTML;
            this.setState({
                unitId : event.target.value
            })
        }
        if(event.target.name == "multiplier") {
            planningUnit.multiplier = event.target.value;
        }
        if(event.target.name == "notes") {
            planningUnit.notes = event.target.value;
        }
        this.setState({       
            planningUnit
        }, () => {})
    };

    touchAll(setTouched, errors) {
        setTouched({            
            summary: true,
            planningUnitDesc: true,
            forecastingUnitDesc: true,
            unit: true,
            multiplier: true,
            notes: true
        })
        this.validateForm(errors)
    }
    validateForm(errors) {
        this.findFirstError('simpleForm', (fieldName) => {
            return Boolean(errors[fieldName])
        })
    }
    findFirstError(formName, hasError) {
        const form = document.forms[formName]
        for (let i = 0; i < form.length; i++) {
            if (hasError(form[i].name)) {
                form[i].focus()
                break
            }
        }
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        UnitService.getUnitListAll()
            .then(response => {
                if (response.status == 200) {
                    this.setState({
                        units: response.data
                    })
                    AuthenticationService.setupAxiosInterceptors();
                    ForecastingUnitService.getForecastingUnitList().then(response => {                        
                        this.setState({
                            forecastingUnits: response.data
                        })
                    })
                }
                else {
                    this.setState({
                        message: response.data.messageCode
                    },
                        () => {
                            this.hideSecondComponent();
                        })
                }
                
            })
    }

    hideSecondComponent() {
        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';            
        }, 8000);
    }

    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
    }

    resetClicked() {        
        let { planningUnit } = this.state;
        planningUnit.summary = '';
        planningUnit.planningUnitDesc = '';
        planningUnit.forecastingUnitDesc = '';
        planningUnit.unit = '';
        planningUnit.multiplier = '';
        planningUnit.notes = '';   
        this.setState({
            planningUnit
        },
            () => { });
    }

    render() {

        const { units } = this.state;
        let unitList = units.length > 0
            && units.map((item, i) => {
                return (
                    <option key={i} value={item.unitId}>
                        {item.label.label_en}
                    </option>
                )
            }, this);
        const { forecastingUnits } = this.state;
        let forecastingUnitList = forecastingUnits.length > 0
            && forecastingUnits.map((item, i) => {
                return (
                    <option key={i} value={item.forecastingUnitId}>
                        {item.label.label_en}
                    </option>
                )
            }, this);

        return (
            <div className="col-md-12">
                <h5 style={{ color: "green" }} id="div2">{i18n.t(this.state.message)}</h5>                
                <h4>{i18n.t('static.planningunit.planningunit')}</h4>
                <br></br>
                <Formik
                    initialValues={initialValues}
                    validate={validate(validationSchema)}
                    onSubmit={(values, { setSubmitting, setErrors }) => {   
                        JiraTikcetService.addEmailRequestIssue(this.state.planningUnit).then(response => {                                         
                            console.log("Response :",response.status, ":" ,JSON.stringify(response.data));
                            if (response.status == 200 || response.status == 201) {
                                var msg = response.data.key;
                                this.setState({
                                    message: msg
                                },
                                    () => {
                                        this.resetClicked();
                                        this.hideSecondComponent();
                                    })                                
                            } else {
                                this.setState({
                                    // message: response.data.messageCode
                                    message: 'Error while creating query'
                                },
                                    () => {
                                        this.resetClicked();
                                        this.hideSecondComponent();
                                    })                                
                            }                            
                            this.props.togglehelp();
                            this.props.toggleSmall(this.state.message);
                        })
                        // .catch(
                        //     error => {
                        //         switch (error.message) {
                        //             case "Network Error":
                        //                 this.setState({
                        //                     message: 'Network Error'
                        //                 })
                        //                 break
                        //             default:
                        //                 this.setState({
                        //                     message: 'Error'
                        //                 })
                        //                 break
                        //         }
                        //         alert(this.state.message);
                        //         this.props.togglehelp();
                        //     }
                        // );        
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
                            handleReset
                        }) => (
                                <Form className="needs-validation" onSubmit={handleSubmit} onReset={handleReset} noValidate name='simpleForm'>
                                    < FormGroup >
                                        <Label for="summary">{i18n.t('static.common.summary')}<span class="red Reqasterisk">*</span></Label>
                                        <Input type="text" name="summary" id="summary"
                                        bsSize="sm"
                                        valid={!errors.summary && this.state.planningUnit.summary != ''}
                                        invalid={touched.summary && !!errors.summary}
                                        onChange={(e) => { handleChange(e); this.dataChange(e);}}
                                        onBlur={handleBlur}
                                        value={this.state.planningUnit.summary}
                                        required />
                                        <FormFeedback className="red">{errors.summary}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="planningUnitDesc">{i18n.t('static.planningUnit.planningUnitName')}<span class="red Reqasterisk">*</span></Label>
                                        <Input type="text" name="planningUnitDesc" id="planningUnitDesc"
                                        bsSize="sm"
                                        valid={!errors.planningUnitDesc && this.state.planningUnit.planningUnitDesc != ''}
                                        invalid={touched.planningUnitDesc && !!errors.planningUnitDesc}
                                        onChange={(e) => { handleChange(e); this.dataChange(e);}}
                                        onBlur={handleBlur}
                                        value={this.state.planningUnit.planningUnitDesc}
                                        required />
                                        <FormFeedback className="red">{errors.planningUnitDesc}</FormFeedback>
                                    </FormGroup>
                                    < FormGroup >
                                        <Label for="forecastingUnitDesc">{i18n.t('static.forecastingUnit.forecastingUnitName')}<span class="red Reqasterisk">*</span></Label>
                                        <Input type="select" name="forecastingUnitDesc" id="forecastingUnitDesc"
                                        bsSize="sm"
                                        valid={!errors.forecastingUnitDesc && this.state.planningUnit.forecastingUnitDesc != ''}
                                        invalid={touched.forecastingUnitDesc && !!errors.forecastingUnitDesc}
                                        onChange={(e) => { handleChange(e); this.dataChange(e);}}
                                        onBlur={handleBlur}
                                        value={this.state.forecastingUnitId}
                                        required >
                                            <option value="">{i18n.t('static.common.select')}</option>
                                            {forecastingUnitList}
                                        </Input>
                                        <FormFeedback className="red">{errors.forecastingUnitDesc}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="unit">{i18n.t('static.unit.unit')}<span class="red Reqasterisk">*</span></Label>
                                        <Input type="select" name="unit" id="unit"
                                        bsSize="sm"
                                        valid={!errors.unit && this.state.planningUnit.unit != ''}
                                        invalid={touched.unit && !!errors.unit}
                                        onChange={(e) => { handleChange(e); this.dataChange(e);}}
                                        onBlur={handleBlur}
                                        value={this.state.unitId}
                                        required >
                                            <option value="">{i18n.t('static.common.select')}</option>
                                            {unitList}
                                        </Input>
                                        <FormFeedback className="red">{errors.unit}</FormFeedback>
                                    </FormGroup>                                    
                                    <FormGroup>
                                        <Label for="multiplier">{i18n.t('static.unit.multiplier')}<span class="red Reqasterisk">*</span></Label>
                                        <Input type="text" name="multiplier" id="multiplier"
                                        bsSize="sm"
                                        valid={!errors.multiplier && this.state.planningUnit.multiplier != ''}
                                        invalid={touched.multiplier && !!errors.multiplier}
                                        onChange={(e) => { handleChange(e); this.dataChange(e);}}
                                        onBlur={handleBlur}
                                        value={this.state.planningUnit.multiplier}
                                        required />
                                        <FormFeedback className="red">{errors.multiplier}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="notes">{i18n.t('static.common.notes')}</Label>
                                        <Input type="textarea" name="notes" id="notes"
                                        bsSize="sm"
                                        valid={!errors.notes && this.state.planningUnit.notes != ''}
                                        invalid={touched.notes && !!errors.notes}
                                        onChange={(e) => { handleChange(e); this.dataChange(e);}}
                                        onBlur={handleBlur}
                                        value={this.state.planningUnit.notes}
                                        // required 
                                        />
                                        <FormFeedback className="red">{errors.notes}</FormFeedback>
                                    </FormGroup>
                                    <ModalFooter className="pb-0 pr-0">
                                    <Button type="button" size="md" color="info" className="mr-1" onClick={this.props.toggleMaster}><i className="fa fa-angle-double-left "></i>  {i18n.t('static.common.back')}</Button>
                                        <Button type="reset" size="md" color="warning" className="mr-1 text-white" onClick={this.resetClicked}><i className="fa fa-refresh"></i> {i18n.t('static.common.reset')}</Button>                                        
                                        <Button type="submit" size="md" color="success" className="mr-1" onClick={() => this.touchAll(setTouched, errors)} disabled={!isValid}><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                    </ModalFooter>
                                </Form>
                            )} />
            </div>
        );
    }

}