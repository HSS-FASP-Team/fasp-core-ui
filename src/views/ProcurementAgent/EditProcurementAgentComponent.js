import React, { Component } from 'react';
import { Row, Col, Card, CardHeader, CardFooter, Button, CardBody, Form, FormGroup, FormFeedback, Label, Input, InputGroupAddon, InputGroupText } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup'
import '../Forms/ValidationForms/ValidationForms.css'
import i18n from '../../i18n';
import RealmService from "../../api/RealmService";
import ProcurementAgentService from "../../api/ProcurementAgentService";
import AuthenticationService from '../Common/AuthenticationService.js';
import AuthenticationServiceComponent from '../Common/AuthenticationServiceComponent'
import getLabelText from '../../CommonComponent/getLabelText';
const entityname = i18n.t('static.procurementagent.procurementagent');

const initialValues = {
    procurementAgentName: "",
    draftToSubmittedLeadTime: "",
    submittedToApprovedLeadTime: "",
    approvedToShippedLeadTime: "",
    colorHtmlCode: "",
}

const validationSchema = function (values) {
    return Yup.object().shape({
        procurementAgentName: Yup.string()
            .required(i18n.t('static.procurementAgent.procurementagentnametext')),
        // submittedToApprovedLeadTime: Yup.string()
        //     .matches(/^[0-9]*$/, i18n.t('static.procurementagent.onlynumberText'))
        //     .required(i18n.t('static.procurementagent.submitToApproveLeadTime'))
        draftToSubmittedLeadTime: Yup.string()
            .required(i18n.t('static.procurementagent.draftToSubmittedLeadTime')).min(0, i18n.t('static.program.validvaluetext')),
        submittedToApprovedLeadTime: Yup.string()
            .required(i18n.t('static.procurementagent.submitToApproveLeadTime')).min(0, i18n.t('static.program.validvaluetext')),
        approvedToShippedLeadTime: Yup.string()
            .required(i18n.t('static.procurementagent.approvedToShippedLeadTime')).min(0, i18n.t('static.program.validvaluetext')),
        // submittedToApprovedLeadTime: Yup.number()
        //     .typeError(i18n.t('static.procurementUnit.validNumberText'))
        //     .required(i18n.t('static.procurementagent.submitToApproveLeadTime'))
        //     .min(0, i18n.t('static.program.validvaluetext')),
        colorHtmlCode: Yup.string()
            .max(6, i18n.t('static.common.max6digittext'))
            .required(i18n.t('static.procurementAgent.procurementAgentHTMLCode')),
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
class EditProcurementAgentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            realms: [],
            // procurementAgent: this.props.location.state.procurementAgent,
            procurementAgent: {
                realm: {
                    realmId: '',
                    label: {
                        label_en: '',
                        label_sp: '',
                        label_pr: '',
                        label_fr: '',
                    }
                },
                label: {
                    label_en: '',
                    label_sp: '',
                    label_pr: '',
                    label_fr: '',
                },
                procurementAgentCode: '',
                colorHtmlCode: '',
                draftToSubmittedLeadTime: '',
                submittedToApprovedLeadTime: '',
                approvedToShippedLeadTime: '',
                // localProcurementAgent: false,
            },
            message: '',
            lang: localStorage.getItem('lang')
        }
        this.cancelClicked = this.cancelClicked.bind(this);
        this.dataChange = this.dataChange.bind(this);
        this.Capitalize = this.Capitalize.bind(this);
        this.resetClicked = this.resetClicked.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
    }
    hideSecondComponent() {
        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';
        }, 8000);
    }

    changeMessage(message) {
        this.setState({ message: message })
    }

    Capitalize(str) {
        if (str != null && str != "") {
            let { procurementAgent } = this.state;
            procurementAgent.label.label_en = str.charAt(0).toUpperCase() + str.slice(1)
        } else {
            return "";
        }
    }


    dataChange(event) {
        let { procurementAgent } = this.state;
        if (event.target.name == "realmId") {
            procurementAgent.realm.realmId = event.target.value;
        }
        if (event.target.name == "procurementAgentCode") {
            procurementAgent.procurementAgentCode = event.target.value;
        }
        if (event.target.name == "colorHtmlCode") {
            procurementAgent.colorHtmlCode = event.target.value.toUpperCase();
        }
        if (event.target.name == "procurementAgentName") {
            procurementAgent.label.label_en = event.target.value;
        }
        if (event.target.name == "draftToSubmittedLeadTime") {
            procurementAgent.draftToSubmittedLeadTime = event.target.value;
        }
        if (event.target.name == "submittedToApprovedLeadTime") {
            procurementAgent.submittedToApprovedLeadTime = event.target.value;
        }
        if (event.target.name == "approvedToShippedLeadTime") {
            procurementAgent.approvedToShippedLeadTime = event.target.value;
        }
        if (event.target.name == "active") {
            procurementAgent.active = event.target.id === "active2" ? false : true;
        }


        this.setState({
            procurementAgent
        },
            () => { });
    };

    touchAll(setTouched, errors) {
        setTouched({
            procurementAgentName: true,
            draftToSubmittedLeadTime: true,
            submittedToApprovedLeadTime: true,
            approvedToShippedLeadTime: true,
            colorHtmlCode: true,
        }
        )
        this.validateForm(errors)
    }
    validateForm(errors) {
        this.findFirstError('procurementAgentForm', (fieldName) => {
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
        ProcurementAgentService.getProcurementAgentById(this.props.match.params.procurementAgentId).then(response => {
            if (response.status == 200) {
                this.setState({
                    procurementAgent: response.data
                });
            } else {
                this.setState({
                    message: response.data.messageCode
                },
                    () => {
                        this.hideSecondComponent();
                    })
            }


        })
    }
    render() {
        return (
            <div className="animated fadeIn">
                <AuthenticationServiceComponent history={this.props.history} message={this.changeMessage} />
                <h5 style={{ color: "red" }} id="div2">{i18n.t(this.state.message, { entityname })}</h5>
                <Row>
                    <Col sm={12} md={6} style={{ flexBasis: 'auto' }}>
                        <Card>

                            {/* <CardHeader>
                                <i className="icon-note"></i><strong>{i18n.t('static.common.editEntity', { entityname })}</strong>{' '}
                            </CardHeader> */}
                            <Formik
                                enableReinitialize={true}
                                initialValues={
                                    {
                                        procurementAgentCode: this.state.procurementAgent.procurementAgentCode,
                                        procurementAgentName: this.state.procurementAgent.label.label_en,
                                        draftToSubmittedLeadTime: this.state.procurementAgent.draftToSubmittedLeadTime,
                                        submittedToApprovedLeadTime: this.state.procurementAgent.submittedToApprovedLeadTime,
                                        approvedToShippedLeadTime: this.state.procurementAgent.approvedToShippedLeadTime,
                                        colorHtmlCode: this.state.procurementAgent.colorHtmlCode,
                                    }}
                                validate={validate(validationSchema)}
                                onSubmit={(values, { setSubmitting, setErrors }) => {
                                    AuthenticationService.setupAxiosInterceptors();
                                    ProcurementAgentService.updateProcurementAgent(this.state.procurementAgent)
                                        .then(response => {
                                            if (response.status == 200) {
                                                this.props.history.push(`/procurementAgent/listProcurementAgent/` + 'green/' + i18n.t(response.data.messageCode, { entityname }))
                                            } else {
                                                this.setState({
                                                    message: response.data.messageCode
                                                },
                                                    () => {
                                                        this.hideSecondComponent();
                                                    })
                                            }
                                        })
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
                                        setTouched
                                    }) => (
                                            <Form onSubmit={handleSubmit} noValidate name='procurementAgentForm'>
                                                <CardBody className="pb-0">
                                                    <FormGroup>
                                                        <Label htmlFor="realmId">{i18n.t('static.realm.realmName')}</Label>
                                                        {/* <InputGroupAddon addonType="prepend"> */}
                                                        {/* <InputGroupText><i className="fa fa-pencil"></i></InputGroupText> */}
                                                        <Input
                                                            type="text"
                                                            name="realmId"
                                                            id="realmId"
                                                            bsSize="sm"
                                                            readOnly={true}
                                                            value={getLabelText(this.state.procurementAgent.realm.label, this.state.lang)}
                                                        >
                                                        </Input>
                                                        {/* </InputGroupAddon> */}
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="procurementAgentCode">{i18n.t('static.procurementagent.procurementagentcode')}</Label>
                                                        {/* <InputGroupAddon addonType="prepend"> */}
                                                        {/* <InputGroupText><i className="fa fa-pencil-square-o"></i></InputGroupText> */}
                                                        <Input type="text"
                                                            bsSize="sm"
                                                            name="procurementAgentCode"
                                                            id="procurementAgentCode"
                                                            readOnly={true}
                                                            value={this.state.procurementAgent.procurementAgentCode}
                                                        />
                                                        {/* </InputGroupAddon> */}
                                                        <FormFeedback className="red">{errors.procurementAgentCode}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="colorHtmlCode">{i18n.t('static.procurementagent.procurementAgentColorCode')}<span className="red Reqasterisk">*</span></Label>
                                                        <Input type="text"
                                                            bsSize="sm"
                                                            name="colorHtmlCode"
                                                            id="colorHtmlCode"
                                                            valid={!errors.colorHtmlCode && this.state.procurementAgent.colorHtmlCode != ''}
                                                            invalid={touched.colorHtmlCode && !!errors.colorHtmlCode}
                                                            onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                            onBlur={handleBlur}
                                                            required
                                                            maxLength={6}
                                                            value={this.state.procurementAgent.colorHtmlCode}
                                                        />
                                                        <FormFeedback className="red">{errors.colorHtmlCode}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="procurementAgentName">{i18n.t('static.procurementagent.procurementagentname')}<span className="red Reqasterisk">*</span></Label>
                                                        {/* <InputGroupAddon addonType="prepend"> */}
                                                        {/* <InputGroupText><i className="fa fa-pencil-square-o"></i></InputGroupText> */}
                                                        <Input type="text"
                                                            bsSize="sm"
                                                            name="procurementAgentName"
                                                            id="procurementAgentName"
                                                            valid={!errors.procurementAgentName}
                                                            invalid={touched.procurementAgentName && !!errors.procurementAgentName}
                                                            onChange={(e) => { handleChange(e); this.dataChange(e); this.Capitalize(e.target.value) }}
                                                            onBlur={handleBlur}
                                                            required
                                                            value={getLabelText(this.state.procurementAgent.label, this.state.lang)}
                                                        />
                                                        {/* </InputGroupAddon> */}
                                                        <FormFeedback className="red">{errors.procurementAgentName}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="draftToSubmittedLeadTime">{i18n.t('static.procurementagent.procurementagentdrafttosubmittime')}<span className="red Reqasterisk">*</span></Label>
                                                        {/* <InputGroupAddon addonType="prepend"> */}
                                                        {/* <InputGroupText><i className="fa fa-clock-o"></i></InputGroupText> */}
                                                        <Input type="number"
                                                            bsSize="sm"
                                                            name="draftToSubmittedLeadTime"
                                                            id="draftToSubmittedLeadTime"
                                                            valid={!errors.draftToSubmittedLeadTime && this.state.procurementAgent.draftToSubmittedLeadTime != ''}
                                                            invalid={touched.draftToSubmittedLeadTime && !!errors.draftToSubmittedLeadTime}
                                                            onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                            onBlur={handleBlur}
                                                            required
                                                            value={this.state.procurementAgent.draftToSubmittedLeadTime}
                                                            min="0"
                                                        />
                                                        {/* </InputGroupAddon> */}
                                                        <FormFeedback className="red">{errors.draftToSubmittedLeadTime}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="submittedToApprovedLeadTime">{i18n.t('static.procurementagent.procurementagentsubmittoapprovetime')}<span className="red Reqasterisk">*</span></Label>
                                                        {/* <InputGroupAddon addonType="prepend"> */}
                                                        {/* <InputGroupText><i className="fa fa-clock-o"></i></InputGroupText> */}
                                                        <Input type="number"
                                                            bsSize="sm"
                                                            name="submittedToApprovedLeadTime"
                                                            id="submittedToApprovedLeadTime"
                                                            valid={!errors.submittedToApprovedLeadTime}
                                                            invalid={touched.submittedToApprovedLeadTime && !!errors.submittedToApprovedLeadTime}
                                                            onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                            onBlur={handleBlur}
                                                            required
                                                            min="0"
                                                            value={this.state.procurementAgent.submittedToApprovedLeadTime}
                                                        />
                                                        {/* </InputGroupAddon> */}
                                                        <FormFeedback className="red">{errors.submittedToApprovedLeadTime}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label for="approvedToShippedLeadTime">{i18n.t('static.procurementagent.procurementagentapprovetoshippedtime')}<span className="red Reqasterisk">*</span></Label>
                                                        {/* <InputGroupAddon addonType="prepend"> */}
                                                        {/* <InputGroupText><i className="fa fa-clock-o"></i></InputGroupText> */}
                                                        <Input type="number"
                                                            bsSize="sm"
                                                            name="approvedToShippedLeadTime"
                                                            id="approvedToShippedLeadTime"
                                                            valid={!errors.approvedToShippedLeadTime && this.state.procurementAgent.approvedToShippedLeadTime != ''}
                                                            invalid={touched.approvedToShippedLeadTime && !!errors.approvedToShippedLeadTime}
                                                            onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                            onBlur={handleBlur}
                                                            required
                                                            value={this.state.procurementAgent.approvedToShippedLeadTime}
                                                            min="0"
                                                        />
                                                        {/* </InputGroupAddon> */}
                                                        <FormFeedback className="red">{errors.approvedToShippedLeadTime}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label className="P-absltRadio">{i18n.t('static.common.status')}  </Label>
                                                        <FormGroup check inline>
                                                            <Input
                                                                className="form-check-input"
                                                                type="radio"
                                                                id="active1"
                                                                name="active"
                                                                value={true}
                                                                checked={this.state.procurementAgent.active === true}
                                                                onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                check htmlFor="inline-radio1">
                                                                {i18n.t('static.common.active')}
                                                            </Label>
                                                        </FormGroup>
                                                        <FormGroup check inline>
                                                            <Input
                                                                className="form-check-input"
                                                                type="radio"
                                                                id="active2"
                                                                name="active"
                                                                value={false}
                                                                checked={this.state.procurementAgent.active === false}
                                                                onChange={(e) => { handleChange(e); this.dataChange(e) }}
                                                            />
                                                            <Label
                                                                className="form-check-label"
                                                                check htmlFor="inline-radio2">
                                                                {i18n.t('static.common.disabled')}
                                                            </Label>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </CardBody>
                                                <CardFooter>
                                                    <FormGroup>
                                                        <Button type="button" size="md" color="danger" className="float-right mr-1" onClick={this.cancelClicked}><i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                                        <Button type="button" size="md" color="warning" className="float-right mr-1 text-white" onClick={this.resetClicked}><i className="fa fa-refresh"></i> {i18n.t('static.common.reset')}</Button>
                                                        <Button type="submit" size="md" color="success" className="float-right mr-1" onClick={() => this.touchAll(setTouched, errors)}><i className="fa fa-check"></i>{i18n.t('static.common.update')}</Button>
                                                        &nbsp;
                                                    </FormGroup>
                                                </CardFooter>
                                            </Form>

                                        )} />

                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
    cancelClicked() {
        this.props.history.push(`/procurementAgent/listProcurementAgent/` + 'red/' + i18n.t('static.message.cancelled', { entityname }))
    }

    resetClicked() {
        AuthenticationService.setupAxiosInterceptors();
        ProcurementAgentService.getProcurementAgentById(this.props.match.params.procurementAgentId).then(response => {
            this.setState({
                procurementAgent: response.data
            });

        })
    }
}

export default EditProcurementAgentComponent;
