import { Formik } from 'formik';
import React, { Component } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label, ModalFooter } from 'reactstrap';
import * as Yup from 'yup';
import getLabelText from '../../CommonComponent/getLabelText';
import { API_URL, SPACE_REGEX } from '../../Constants';
import JiraTikcetService from '../../api/JiraTikcetService';
import RealmService from '../../api/RealmService';
import i18n from '../../i18n';
let summaryText_1 = (i18n.t("static.common.add") + " " + i18n.t("static.tracercategory.tracercategory"))
let summaryText_2 = "Add Tracer Category"
const validationSchema = function () {
    return Yup.object().shape({
        summary: Yup.string()
            .matches(SPACE_REGEX, i18n.t('static.common.spacenotallowed'))
            .required(i18n.t('static.common.summarytext')),
        realmName: Yup.string()
            .required(i18n.t('static.common.realmtext').concat((i18n.t('static.ticket.unavailableDropdownValidationText')).replace('?', i18n.t('static.realm.realmName')))),
        tracerCategoryName: Yup.string()
            .matches(/^\S+(?: \S+)*$/, i18n.t('static.validSpace.string'))
            .required(i18n.t('static.tracerCategory.tracercategorytext')),
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
export default class TracerCategoryTicketComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracerCategory: {
                summary: summaryText_1,
                realmName: "",
                tracerCategoryName: "",
                notes: ""
            },
            lang: localStorage.getItem('lang'),
            message: '',
            realms: [],
            realmId: '',
            loading: true
        }
        this.dataChange = this.dataChange.bind(this);
        this.resetClicked = this.resetClicked.bind(this);
        this.hideSecondComponent = this.hideSecondComponent.bind(this);
    }
    dataChange(event) {
        let { tracerCategory } = this.state
        if (event.target.name == "summary") {
            tracerCategory.summary = event.target.value;
        }
        if (event.target.name == "realmName") {
            tracerCategory.realmName = event.target.value !== "" ? this.state.realms.filter(c => c.realmId == event.target.value)[0].label.label_en : "";
            this.setState({
                realmId: event.target.value
            })
        }
        if (event.target.name == "tracerCategoryName") {
            tracerCategory.tracerCategoryName = event.target.value;
        }
        if (event.target.name == "notes") {
            tracerCategory.notes = event.target.value;
        }
        this.setState({
            tracerCategory
        }, () => { })
    };
    touchAll(setTouched, errors) {
        setTouched({
            summary: true,
            realmName: true,
            tracerCategoryName: true,
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
        RealmService.getRealmListAll()
            .then(response => {
                if (response.status == 200) {
                    var listArray = response.data;
                    listArray.sort((a, b) => {
                        var itemLabelA = getLabelText(a.label, this.state.lang).toUpperCase(); 
                        var itemLabelB = getLabelText(b.label, this.state.lang).toUpperCase(); 
                        return itemLabelA > itemLabelB ? 1 : -1;
                    });
                    this.setState({
                        realms: listArray,
                        realmId: this.props.items.userRealmId, loading: false
                    });
                    if (this.props.items.userRealmId !== "") {
                        this.setState({
                            realms: (response.data).filter(c => c.realmId == this.props.items.userRealmId)
                        })
                        let { tracerCategory } = this.state;
                        tracerCategory.realmName = (response.data).filter(c => c.realmId == this.props.items.userRealmId)[0].label.label_en;
                        this.setState({
                            tracerCategory
                        }, () => {
                        })
                    }
                } else {
                    this.setState({
                        message: response.data.messageCode
                    })
                }
            }).catch(
                error => {
                    if (error.message === "Network Error") {
                        this.setState({
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
    hideSecondComponent() {
        setTimeout(function () {
            document.getElementById('div2').style.display = 'none';
        }, 30000);
    }
    submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
    }
    resetClicked() {
        let { tracerCategory } = this.state;
        tracerCategory.realmName = this.props.items.userRealmId !== "" ? this.state.realms.filter(c => c.realmId == this.props.items.userRealmId)[0].label.label_en : "";
        tracerCategory.tracerCategoryName = '';
        tracerCategory.notes = '';
        this.setState({
            tracerCategory: tracerCategory,
            realmId: this.props.items.userRealmId
        },
            () => { });
    }
    render() {
        const { realms } = this.state;
        let realmList = realms.length > 0
            && realms.map((item, i) => {
                return (
                    <option key={i} value={item.realmId}>
                        {getLabelText(item.label, this.state.lang)}
                    </option>
                )
            }, this);
        return (
            <div className="col-md-12">
                <h5 className="red" id="div2">{i18n.t(this.state.message)}</h5>
                <h4>{i18n.t('static.tracercategory.tracercategory')}</h4>
                <br></br>
                <div style={{ display: this.state.loading ? "none" : "block" }}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            summary: summaryText_1,
                            realmName: this.props.items.userRealmId,
                            tracerCategoryName: "",
                            notes: ""
                        }}
                        validate={validate(validationSchema)}
                        onSubmit={(values) => {
                            this.setState({
                                loading: true
                            })
                            this.state.tracerCategory.summary = summaryText_2;
                            this.state.tracerCategory.userLanguageCode = this.state.lang;
                            JiraTikcetService.addEmailRequestIssue(this.state.tracerCategory).then(response => {
                                if (response.status == 200 || response.status == 201) {
                                    var msg = response.data.key;
                                    this.setState({
                                        message: msg, loading: false
                                    },
                                        () => {
                                            this.resetClicked();
                                            this.hideSecondComponent();
                                        })
                                } else {
                                    this.setState({
                                        message: i18n.t('static.unkownError'), loading: false
                                    },
                                        () => {
                                            this.hideSecondComponent();
                                        })
                                }
                                this.props.togglehelp();
                                this.props.toggleSmall(this.state.message);
                            }).catch(
                                error => {
                                    if (error.message === "Network Error") {
                                        this.setState({
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
                        }}
                        render={
                            ({
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isValid,
                                setTouched,
                                handleReset
                            }) => (
                                <Form className="needs-validation" onSubmit={handleSubmit} onReset={handleReset} noValidate name='simpleForm' autocomplete="off">
                                    < FormGroup >
                                        <Label for="summary">{i18n.t('static.common.summary')}<span class="red Reqasterisk">*</span></Label>
                                        <Input type="text" name="summary" id="summary" readOnly={true}
                                            bsSize="sm"
                                            valid={!errors.summary && this.state.tracerCategory.summary != ''}
                                            invalid={touched.summary && !!errors.summary}
                                            onChange={(e) => { handleChange(e); this.dataChange(e); }}
                                            onBlur={handleBlur}
                                            value={this.state.tracerCategory.summary}
                                            required />
                                        <FormFeedback className="red">{errors.summary}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="realmName">{i18n.t('static.realm.realmName')}<span class="red Reqasterisk">*</span></Label>
                                        <Input type="select" name="realmName" id="realmName"
                                            bsSize="sm"
                                            valid={!errors.realmName && this.state.tracerCategory.realmName != ''}
                                            invalid={touched.realmName && !!errors.realmName}
                                            onChange={(e) => { handleChange(e); this.dataChange(e); }}
                                            onBlur={handleBlur}
                                            value={this.state.realmId}
                                            required >
                                            <option value="">{i18n.t('static.common.select')}</option>
                                            {realmList}
                                        </Input>
                                        <FormFeedback className="red">{errors.realmName}</FormFeedback>
                                    </FormGroup>
                                    < FormGroup >
                                        <Label for="tracerCategoryName">{i18n.t('static.tracerCategory.tracerCategoryName')}<span class="red Reqasterisk">*</span></Label>
                                        <Input type="text" name="tracerCategoryName" id="tracerCategoryName"
                                            bsSize="sm"
                                            valid={!errors.tracerCategoryName && this.state.tracerCategory.tracerCategoryName != ''}
                                            invalid={touched.tracerCategoryName && !!errors.tracerCategoryName}
                                            onChange={(e) => { handleChange(e); this.dataChange(e); }}
                                            onBlur={handleBlur}
                                            value={this.state.tracerCategory.tracerCategoryName}
                                            required />
                                        <FormFeedback className="red">{errors.tracerCategoryName}</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="notes">{i18n.t('static.common.notes')}</Label>
                                        <Input type="textarea" name="notes" id="notes"
                                            bsSize="sm"
                                            valid={!errors.notes && this.state.tracerCategory.notes != ''}
                                            invalid={touched.notes && !!errors.notes}
                                            onChange={(e) => { handleChange(e); this.dataChange(e); }}
                                            onBlur={handleBlur}
                                            maxLength={600}
                                            value={this.state.tracerCategory.notes}
                                        />
                                        <FormFeedback className="red">{errors.notes}</FormFeedback>
                                    </FormGroup>
                                    <ModalFooter className="pb-0 pr-0">
                                        <Button type="button" size="md" color="info" className="mr-1 pr-3 pl-3" onClick={this.props.toggleMaster}><i className="fa fa-angle-double-left "></i>  {i18n.t('static.common.back')}</Button>
                                        <Button type="reset" size="md" color="warning" className="mr-1 text-white" onClick={this.resetClicked}><i className="fa fa-refresh"></i> {i18n.t('static.common.reset')}</Button>
                                        <Button type="submit" size="md" color="success" className="mr-1" onClick={() => this.touchAll(setTouched, errors)} disabled={!isValid}><i className="fa fa-check"></i>{i18n.t('static.common.submit')}</Button>
                                    </ModalFooter>
                                                                    </Form>
                            )} />
                </div>
                <div style={{ display: this.state.loading ? "block" : "none" }}>
                    <div className="d-flex align-items-center justify-content-center" style={{ height: "500px" }} >
                        <div class="align-items-center">
                            <div ><h4> <strong>{i18n.t('static.common.loading')}</strong></h4></div>
                            <div class="spinner-border blue ml-4" role="status"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}