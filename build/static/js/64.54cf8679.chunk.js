(this["webpackJsonp@coreui/coreui-pro-react-admin-template"]=this["webpackJsonp@coreui/coreui-pro-react-admin-template"]||[]).push([[64],{508:function(e,t,a){},513:function(e,t,a){"use strict";var n=a(18),r=a(49),c=a(2),o=a.n(c),l=a(61),u=a.n(l),m=a(487),i=a.n(m),s=a(488),d={tag:s.q,className:u.a.string,cssModule:u.a.object},p=function(e){var t=e.className,a=e.cssModule,c=e.tag,l=Object(r.a)(e,["className","cssModule","tag"]),u=Object(s.m)(i()(t,"card-footer"),a);return o.a.createElement(c,Object(n.a)({},l,{className:u}))};p.propTypes=d,p.defaultProps={tag:"div"},t.a=p},577:function(e,t,a){"use strict";var n=a(151),r=a(152),c=a(499),o=a.n(c),l=a(494),u=function(){function e(){Object(n.a)(this,e)}return Object(r.a)(e,[{key:"addRealm",value:function(e){return console.log(e),o.a.post("".concat(l.a,"/api/realm/"),e,{})}},{key:"getRealmListAll",value:function(){return o.a.get("".concat(l.a,"/api/realm/"),{})}},{key:"updateRealm",value:function(e){return o.a.put("".concat(l.a,"/api/realm/"),e,{})}}]),e}();t.a=new u},668:function(e,t,a){"use strict";var n=a(151),r=a(152),c=a(499),o=a.n(c),l=a(494),u=function(){function e(){Object(n.a)(this,e)}return Object(r.a)(e,[{key:"addProcurementAgent",value:function(e){return o.a.post("".concat(l.a,"/api/procurementAgent/"),e,{})}},{key:"getProcurementAgentListAll",value:function(){return o.a.get("".concat(l.a,"/api/procurementAgent/"),{})}},{key:"updateProcurementAgent",value:function(e){return o.a.put("".concat(l.a,"/api/procurementAgent/"),e,{})}}]),e}();t.a=new u},957:function(e,t,a){"use strict";a.r(t);var n=a(151),r=a(152),c=a(154),o=a(153),l=a(156),u=a(155),m=a(79),i=a(537),s=a(2),d=a.n(s),p=a(495),g=a(492),A=a(501),v=a(497),f=a(655),b=a(502),h=a(575),C=a(615),E=a(545),k=a(1368),y=a(513),T=a(506),N=a(541),j=a(538),L=(a(508),a(577)),O=a(668),S=a(517),I={realmId:[],procurementAgentCode:"",procurementAgentName:"",submittedToApprovedLeadTime:""},P=function(e){return j.object().shape({realmId:j.string().required("Please select realm"),procurementAgentCode:j.string().required("Please enter code"),procurementAgentName:j.string().required("Please enter name"),submittedToApprovedLeadTime:j.string().required("Please enter submitted to approved lead time")})},q=function(e){return e.inner.reduce((function(e,t){return Object(i.a)({},e,Object(m.a)({},t.path,t.errors[0]))}),{})},w=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(c.a)(this,Object(o.a)(t).call(this,e))).state={realms:[],procurementAgent:{realm:{},label:{}},message:""},a.cancelClicked=a.cancelClicked.bind(Object(l.a)(a)),a.dataChange=a.dataChange.bind(Object(l.a)(a)),a.Capitalize=a.Capitalize.bind(Object(l.a)(a)),a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"Capitalize",value:function(e){return console.log("capitalize"),null!=e&&""!=e?e.charAt(0).toUpperCase()+e.slice(1):""}},{key:"dataChange",value:function(e){var t=this.state.procurementAgent;"realmId"==e.target.name&&(t.realm.realmId=e.target.value),"procurementAgentCode"==e.target.name&&(t.procurementAgentCode=e.target.value),"procurementAgentName"==e.target.name&&(t.label.label_en=e.target.value),"submittedToApprovedLeadTime"==e.target.name&&(t.submittedToApprovedLeadTime=e.target.value),this.setState({procurementAgent:t},(function(){}))}},{key:"touchAll",value:function(e,t){e({realmId:!0,procurementAgentCode:!0,procurementAgentName:!0,submittedToApprovedLeadTime:!0}),this.validateForm(t)}},{key:"validateForm",value:function(e){this.findFirstError("procurementAgentForm",(function(t){return Boolean(e[t])}))}},{key:"findFirstError",value:function(e,t){for(var a=document.forms[e],n=0;n<a.length;n++)if(t(a[n].name)){a[n].focus();break}}},{key:"componentDidMount",value:function(){var e=this;S.a.setupAxiosInterceptors(),L.a.getRealmListAll().then((function(t){e.setState({realms:t.data.data})})).catch((function(t){switch(t.message){case"Network Error":e.setState({message:t.message});break;default:e.setState({message:t.response.data.message})}}))}},{key:"render",value:function(){var e,t=this,a=this.state.realms,n=a.length>0&&a.map((function(e,t){return d.a.createElement("option",{key:t,value:e.realmId},e.label.label_en)}),this);return d.a.createElement("div",{className:"animated fadeIn"},d.a.createElement("h5",null,this.state.message),d.a.createElement(p.a,null,d.a.createElement(g.a,{sm:12,md:6,style:{flexBasis:"auto"}},d.a.createElement(A.a,null,d.a.createElement(v.a,null,d.a.createElement("i",{className:"icon-note"}),d.a.createElement("strong",null,"Add Procurement Agent")," "),d.a.createElement(N.a,{initialValues:I,validate:(e=P,function(t){var a=e(t);try{return a.validateSync(t,{abortEarly:!1}),{}}catch(n){return q(n)}}),onSubmit:function(e,a){a.setSubmitting,a.setErrors;console.log("this.state.procurementAgent---",t.state.procurementAgent),O.a.addProcurementAgent(t.state.procurementAgent).then((function(e){"Success"==e.data.status?t.props.history.push("/procurementAgent/listProcurementAgent/".concat(e.data.message)):t.setState({message:e.data.message})})).catch((function(e){switch(e.message){case"Network Error":t.setState({message:e.message});break;default:t.setState({message:e.response.data.message})}}))},render:function(e){e.values;var a=e.errors,r=e.touched,c=e.handleChange,o=e.handleBlur,l=e.handleSubmit,u=(e.isSubmitting,e.isValid),m=e.setTouched;return d.a.createElement(f.a,{onSubmit:l,noValidate:!0,name:"procurementAgentForm"},d.a.createElement(b.a,null,d.a.createElement(h.a,null,d.a.createElement(C.a,{htmlFor:"realmId"},"Realm"),d.a.createElement(E.a,{type:"select",name:"realmId",id:"realmId",bsSize:"lg",valid:!a.realmId,invalid:r.realmId&&!!a.realmId,onChange:function(e){c(e),t.dataChange(e)},onBlur:o,required:!0},d.a.createElement("option",{value:""},"Please select"),n),d.a.createElement(k.a,null,a.realmId)),d.a.createElement(h.a,null,d.a.createElement(C.a,{for:"procurementAgentCode"},"Procurement Agent Code"),d.a.createElement(E.a,{type:"text",name:"procurementAgentCode",id:"procurementAgentCode",valid:!a.procurementAgentCode,invalid:r.procurementAgentCode&&!!a.procurementAgentCode,onChange:function(e){c(e),t.dataChange(e)},onBlur:o,required:!0,maxLength:6,value:t.Capitalize(t.state.procurementAgent.procurementAgentCode)}),d.a.createElement(k.a,null,a.procurementAgentCode)),d.a.createElement(h.a,null,d.a.createElement(C.a,{for:"procurementAgentName"},"Procurement Agent Name"),d.a.createElement(E.a,{type:"text",name:"procurementAgentName",id:"procurementAgentName",valid:!a.procurementAgentName,invalid:r.procurementAgentName&&!!a.procurementAgentName,onChange:function(e){c(e),t.dataChange(e)},onBlur:o,required:!0,value:t.Capitalize(t.state.procurementAgent.label.label_en)}),d.a.createElement(k.a,null,a.procurementAgentName)),d.a.createElement(h.a,null,d.a.createElement(C.a,{for:"submittedToApprovedLeadTime"},"Submitted To Approved Lead Time"),d.a.createElement(E.a,{type:"number",name:"submittedToApprovedLeadTime",id:"submittedToApprovedLeadTime",valid:!a.submittedToApprovedLeadTime,invalid:r.submittedToApprovedLeadTime&&!!a.submittedToApprovedLeadTime,onChange:function(e){c(e),t.dataChange(e)},onBlur:o,required:!0,min:1}),d.a.createElement(k.a,null,a.submittedToApprovedLeadTime))),d.a.createElement(y.a,null,d.a.createElement(h.a,null,d.a.createElement(T.a,{type:"submit",color:"success",className:"mr-1",onClick:function(){return t.touchAll(m,a)},disabled:!u},"Submit"),d.a.createElement(T.a,{type:"reset",color:"danger",className:"mr-1",onClick:t.cancelClicked},"Cancel"))))}})))))}},{key:"cancelClicked",value:function(){this.props.history.push("/procurementAgent/listProcurementAgent/Action Canceled")}}]),t}(s.Component);t.default=w}}]);
//# sourceMappingURL=64.54cf8679.chunk.js.map