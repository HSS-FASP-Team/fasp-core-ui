import React, { Component } from "react";
import {
    Card, CardBody, CardHeader,
    Label, Input, FormGroup,
    CardFooter, Button, Table, Badge, Col, Row, Form, FormFeedback

} from 'reactstrap';
import DeleteSpecificRow from './TableFeatureTwo';
import ProgramService from "../../api/ProgramService";
import AuthenticationService from '../Common/AuthenticationService.js';
import PlanningUnitService from "../../api/PlanningUnitService";
import StatusUpdateButtonFeature from '../../CommonComponent/StatusUpdateButtonFeature';
import UpdateButtonFeature from '../../CommonComponent/UpdateButtonFeature';
import i18n from '../../i18n';
import * as Yup from 'yup';
import { Formik } from "formik";
import getLabelText from '../../CommonComponent/getLabelText'

const entityname = i18n.t('static.dashboard.programPlanningUnit');

let initialValues = {
    planningUnitId: '',
    reorderFrequencyInMonths: ''
}

const validationSchema = function (values, t) {
    console.log("made by us schema--->", values)
    return Yup.object().shape({
        planningUnitId: Yup.string()
            .required(i18n.t('static.procurementUnit.validPlanningUnitText')),
        reorderFrequencyInMonths: Yup.number().
            typeError(i18n.t('static.procurementUnit.validNumberText'))
            .required(i18n.t('static.programPlanningUnit.validReorderFrequencyText')).min(0, i18n.t('static.procurementUnit.validValueText'))
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

class AddprogramPlanningUnit extends Component {

    constructor(props) {
        super(props);
        let rows = [];
        if (this.props.location.state.programPlanningUnit.length > 0) {
            rows = this.props.location.state.programPlanningUnit;
        }
        this.state = {
            programPlanningUnit: this.props.location.state.programPlanningUnit,
            planningUnitId: '',
            planningUnitName: '',
            reorderFrequencyInMonths: '',
            rows: rows,
            programList: [],
            planningUnitList: [],
            rowErrorMessage: '',
            programPlanningUnitId: 0,
            isNew: true,
            programId: this.props.location.state.programId,
            updateRowStatus: 0,
            lang: localStorage.getItem('lang')

        }
        this.addRow = this.addRow.bind(this);
        this.handleRemoveSpecificRow = this.handleRemoveSpecificRow.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.setTextAndValue = this.setTextAndValue.bind(this);
        this.cancelClicked = this.cancelClicked.bind(this);
        this.enableRow = this.enableRow.bind(this);
        this.disableRow = this.disableRow.bind(this);
        this.updateRow = this.updateRow.bind(this);

    }
    addRow() {
        let addRow = true;
        if (addRow) {
            this.state.rows.map(item => {
                if (item.planningUnit.id == this.state.planningUnitId) {
                    addRow = false;
                }
            }
            )
        }
        if (addRow == true) {
            var programName = document.getElementById("programId");
            var value = programName.selectedIndex;
            var selectedProgramName = programName.options[value].text;
            this.state.rows.push(
                {
                    planningUnit: {
                        id: this.state.planningUnitId,
                        label: {
                            label_en: this.state.planningUnitName
                        }
                    },
                    program: {
                        id: this.state.programId,
                        label: {
                            label_en: selectedProgramName
                        }
                    },
                    reorderFrequencyInMonths: this.state.reorderFrequencyInMonths,
                    active: true,
                    isNew: this.state.isNew,
                    programPlanningUnitId: this.state.programPlanningUnitId

                })

            this.setState({ rows: this.state.rows, rowErrorMessage: '' });

        } else {
            this.setState({ rowErrorMessage: 'Planning Unit Already Exist In List.' });
        }
        this.setState({
            planningUnitId: '',
            reorderFrequencyInMonths: '',
            planningUnitName: '',
            programPlanningUnitId: 0,
            isNew: true,
            updateRowStatus: 0
        });
        document.getElementById('select').disabled = false;
    }

    updateRow(idx) {
        if (this.state.updateRowStatus == 1) {
            this.setState({ rowErrorMessage: 'One Of the mapped row is already in update.' })
        } else {

            document.getElementById('select').disabled = true;
            initialValues = {
                planningUnitId: this.state.rows[idx].planningUnit.id,
                reorderFrequencyInMonths: this.state.rows[idx].reorderFrequencyInMonths
            }

            const rows = [...this.state.rows]
            this.setState({
                planningUnitId: this.state.rows[idx].planningUnit.id,
                planningUnitName: this.state.rows[idx].planningUnit.label.label_en,
                reorderFrequencyInMonths: this.state.rows[idx].reorderFrequencyInMonths,
                programPlanningUnitId: this.state.rows[idx].programPlanningUnitId,
                isNew: false,
                updateRowStatus: 1
            })
            rows.splice(idx, 1);
            this.setState({ rows });
        }
    }

    enableRow(idx) {
        this.state.rows[idx].active = true;
        this.setState({ rows: this.state.rows })
    }

    disableRow(idx) {
        this.state.rows[idx].active = false;
        this.setState({ rows: this.state.rows })
    }

    handleRemoveSpecificRow(idx) {
        const rows = [...this.state.rows]
        rows.splice(idx, 1);
        this.setState({ rows })
    }

    setTextAndValue = (event) => {
        if (event.target.name === 'reorderFrequencyInMonths') {
            this.setState({ reorderFrequencyInMonths: event.target.value });
        }
        else if (event.target.name === 'planningUnitId') {
            this.setState({ planningUnitName: event.target[event.target.selectedIndex].text });
            this.setState({ planningUnitId: event.target.value })
        }
    };
    submitForm() {
        AuthenticationService.setupAxiosInterceptors();

        ProgramService.addprogramPlanningUnitMapping(this.state.rows)
            .then(response => {
                if (response.status == "200") {
                    this.props.history.push(`/program/listProgram/` + i18n.t(response.data.messageCode, { entityname }))
                } else {
                    this.setState({
                        message: response.data.message
                    })
                }

            }).catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({ message: error.message });
                    } else {
                        switch (error.response ? error.response.status : "") {
                            case 500:
                            case 401:
                            case 404:
                            case 406:
                            case 412:
                                this.setState({ message: error.response.data.messageCode });
                                break;
                            default:
                                this.setState({ message: 'static.unkownError' });
                                console.log("Error code unkown");
                                break;
                        }
                    }
                }
            );



    }
    componentDidMount() {
        AuthenticationService.setupAxiosInterceptors();
        ProgramService.getProgramList().then(response => {
            if (response.status == "200") {
                this.setState({
                    programList: response.data
                });
            } else {
                this.setState({
                    message: response.data.message
                })
            }

        }).catch(
            error => {
                if (error.message === "Network Error") {
                    this.setState({ message: error.message });
                } else {
                    switch (error.response ? error.response.status : "") {
                        case 500:
                        case 401:
                        case 404:
                        case 406:
                        case 412:
                            this.setState({ message: error.response.data.messageCode });
                            break;
                        default:
                            this.setState({ message: 'static.unkownError' });
                            console.log("Error code unkown");
                            break;
                    }
                }
            }
        );
        PlanningUnitService.getActivePlanningUnitList().then(response => {
            if (response.status == 200) {
                this.setState({
                    planningUnitList: response.data
                });
            } else {
                this.setState({
                    message: response.data.messageCode
                })
            }

        }).catch(
            error => {
                if (error.message === "Network Error") {
                    this.setState({ message: error.message });
                } else {
                    switch (error.response ? error.response.status : "") {
                        case 500:
                        case 401:
                        case 404:
                        case 406:
                        case 412:
                            this.setState({ message: error.response.data.messageCode });
                            break;
                        default:
                            this.setState({ message: 'static.unkownError' });
                            console.log("Error code unkown");
                            break;
                    }
                }
            }
        );


    }
    touchAll(errors) {
        this.validateForm(errors);
    }
    validateForm(errors) {
        this.findFirstError('programPlanningUnitForm', (fieldName) => {
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

    render() {
        const { programList } = this.state;
        const { planningUnitList } = this.state;
        let programs = programList.length > 0 && programList.map((item, i) => {
            return (
                <option key={i} value={item.programId}>
                    {getLabelText(item.label, this.state.lang)}
                </option>
            )
        }, this);
        let products = planningUnitList.length > 0 && planningUnitList.map((item, i) => {
            return (
                <option key={i} value={item.planningUnitId}>
                    {getLabelText(item.label, this.state.lang)}
                </option>
            )
        }, this);
        return (
            <div className="animated fadeIn">
                <h5>{i18n.t(this.state.message, { entityname })}</h5>
                <Row>
                    <Col sm={12} md={10} style={{ flexBasis: 'auto' }}>
                        <Card>
                            <CardHeader>
                                <strong>{i18n.t('static.program.mapPlanningUnit')}</strong>
                            </CardHeader>
                            <CardBody>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={initialValues}
                                    validate={validate(validationSchema)}
                                    onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
                                        this.addRow();
                                        resetForm({ planningUnitId: "", reorderFrequencyInMonths: "" });
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
                                                <Form onSubmit={handleSubmit} noValidate name='programPlanningUnitForm'>
                                                    <FormGroup>
                                                        <Label htmlFor="select">{i18n.t('static.program.program')}</Label>
                                                        <Input
                                                            type="select"
                                                            value={this.state.programPlanningUnit.programId}
                                                            name="programId"
                                                            id="programId"
                                                            disabled>
                                                            {programs}
                                                        </Input>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="select">{i18n.t('static.planningunit.planningunit')}</Label>
                                                        <Input
                                                            type="select"
                                                            name="planningUnitId"
                                                            id="select"
                                                            bsSize="sm"
                                                            valid={!errors.planningUnitId}
                                                            invalid={touched.planningUnitId && !!errors.planningUnitId}
                                                            value={this.state.planningUnitId}
                                                            onBlur={handleBlur}
                                                            onChange={event => { handleChange(event); this.setTextAndValue(event) }}
                                                            required
                                                        >
                                                            <option value="">Please select</option>
                                                            {products}
                                                        </Input>
                                                        <FormFeedback className="red">{errors.planningUnitId}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Label htmlFor="company">{i18n.t('static.program.reorderFrequencyInMonths')}</Label>
                                                        <Input
                                                            type="number"
                                                            min='0'
                                                            name="reorderFrequencyInMonths"
                                                            id="reorderFrequencyInMonths"
                                                            bsSize="sm"
                                                            valid={!errors.reorderFrequencyInMonths}
                                                            invalid={touched.reorderFrequencyInMonths && !!errors.reorderFrequencyInMonths}
                                                            value={this.state.reorderFrequencyInMonths}
                                                            placeholder={i18n.t('static.program.programPlanningUnit.reorderFrequencyText')}
                                                            onBlur={handleBlur}
                                                            onChange={event => { handleChange(event); this.setTextAndValue(event) }}
                                                        />
                                                        <FormFeedback className="red">{errors.reorderFrequencyInMonths}</FormFeedback>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        {/* <Button type="button" size="sm" color="danger" onClick={this.deleteLastRow} className="float-right mr-1" ><i className="fa fa-times"></i> Remove Last Row</Button> */}
                                                        <Button type="submit" size="sm" color="success" onClick={() => this.touchAll(errors)} className="float-right mr-1" ><i className="fa fa-check"></i>{i18n.t('static.common.add')}</Button>
                                                        &nbsp;

                                     </FormGroup>
                                                </Form>
                                            )} />
                                <h5 className="red">{this.state.rowErrorMessage}</h5>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th className="text-left"> {i18n.t('static.program.program')} </th>
                                            <th className="text-left"> {i18n.t('static.planningunit.planningunit')}</th>
                                            <th className="text-left"> {i18n.t('static.program.reorderFrequencyInMonths')} </th>
                                            <th className="text-left">{i18n.t('static.common.status')}</th>
                                            <th className="text-left">{i18n.t('static.common.update')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.rows.map((item, idx) => (
                                                <tr id="addr0" key={idx}>
                                                    <td>
                                                        {this.state.rows[idx].program.label.label_en}
                                                    </td>
                                                    <td>
                                                        {this.state.rows[idx].planningUnit.label.label_en}
                                                    </td>
                                                    <td>
                                                        {this.state.rows[idx].reorderFrequencyInMonths}
                                                    </td>
                                                    <td>
                                                        <StatusUpdateButtonFeature removeRow={this.handleRemoveSpecificRow} enableRow={this.enableRow} disableRow={this.disableRow} rowId={idx} status={this.state.rows[idx].active} isRowNew={this.state.rows[idx].isNew} />
                                                    </td>
                                                    <td>
                                                        <UpdateButtonFeature updateRow={this.updateRow} rowId={idx} isRowNew={this.state.rows[idx].isNew} />
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                            </CardBody>
                            <CardFooter>
                                <FormGroup>
                                    <Button type="button" size="sm" color="danger" className="float-right mr-1" onClick={this.cancelClicked}><i className="fa fa-times"></i> {i18n.t('static.common.cancel')}</Button>
                                    <Button type="submit" size="sm" color="success" onClick={this.submitForm} className="float-right mr-1" ><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                    &nbsp;
                                </FormGroup>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>

        );
    }
    cancelClicked() {
        this.props.history.push(`/program/listProgram/` + i18n.t('static.message.cancelled', { entityname }))
    }

}
export default AddprogramPlanningUnit;