(this["webpackJsonp@coreui/coreui-pro-react-admin-template"]=this["webpackJsonp@coreui/coreui-pro-react-admin-template"]||[]).push([[86],{1446:function(e,t,a){"use strict";a.r(t);var n=a(156),l=a(150),r=a(151),c=a(153),o=a(152),i=a(154),s=a(2),m=a.n(s),p=a(1429),g=a(496),u=a(495),h=a(497),b=a(1182),d={lat:37.431489,lng:-122.163719},w=[{lat:37.431489,lng:-122.163719,label:"S",draggable:!1,title:"Stanford",www:"https://www.stanford.edu/"},{lat:37.394694,lng:-122.150333,label:"T",draggable:!1,title:"Tesla",www:"https://www.tesla.com/"},{lat:37.331681,lng:-122.0301,label:"A",draggable:!1,title:"Apple",www:"https://www.apple.com/"},{lat:37.484722,lng:-122.148333,label:"F",draggable:!1,title:"Facebook",www:"https://www.facebook.com/"}],f=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(o.a)(t).call(this,e))).state={},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return w.map((function(e,t){return m.a.createElement(O,{key:t.toString(),location:e})}))}}]),t}(s.Component),O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(o.a)(t).call(this,e))).state={isOpen:!1},a.toggle=a.toggle.bind(Object(n.a)(a)),a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"toggle",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"render",value:function(){var e=this.props.location;return m.a.createElement(b.Marker,{onClick:this.toggle,position:e,title:e.title,label:e.label},this.state.isOpen&&m.a.createElement(b.InfoWindow,{onCloseClick:this.toggle},m.a.createElement(p.a,{href:e.www,target:"_blank"},e.title)))}}]),t}(s.Component),E=Object(b.withScriptjs)(Object(b.withGoogleMap)((function(e){return m.a.createElement(b.GoogleMap,{defaultZoom:11,defaultCenter:d},m.a.createElement(f,{locations:w}))}))),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(o.a)(t).call(this,e))).state={},a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return m.a.createElement("div",{className:"animated fadeIn"},m.a.createElement(g.a,null,m.a.createElement(u.a,null,m.a.createElement("i",{className:"icon-map"})," React Google Maps"," ",m.a.createElement("a",{href:"https://coreui.io/pro/react/",className:"badge badge-danger"},"CoreUI Pro Component"),m.a.createElement("div",{className:"card-header-actions"},m.a.createElement("a",{href:"https://github.com/tomchentw/react-google-maps",rel:"noreferrer noopener",target:"_blank",className:"card-header-action"},m.a.createElement("small",{className:"text-muted"},"docs")))),m.a.createElement(h.a,null,m.a.createElement(E,{key:"map",googleMapURL:"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=".concat("AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA"),loadingElement:m.a.createElement("div",{style:{height:"100%"}}),containerElement:m.a.createElement("div",{style:{height:"400px"}}),mapElement:m.a.createElement("div",{style:{height:"100%"}})}))))}}]),t}(s.Component);t.default=j}}]);
//# sourceMappingURL=86.50c28cba.chunk.js.map