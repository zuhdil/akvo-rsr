!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1021)}({1021:function(e,t){var n,a,r;!function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),a=0;a<n.length;a++){var r=n[a].trim();if(r.substring(0,e.length+1)==e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}}("csrftoken");var o=function(e,t){if(null==e)return null;var n=t.filter(function(t){return t.id==e});return n.length>0?n[0].displayOption:null};function i(){r=ReactTypeahead.Typeahead;var e=React.createClass({displayName:"OrganisationTypeahead",getInitialState:function(){return{placeholder:a.select_an_organisation}},componentDidMount:function(){1===this.props.organisationOptions.length&&(this.selectOrg(this.props.organisationOptions[0]),this.setState({placeholder:this.props.organisationOptions[0].displayOption}))},selectOrg:function(e){this.props.setOrganisation(e.id)},render:function(){return React.createElement("div",{className:"form-group"},React.createElement(r,{placeholder:this.state.placeholder,maxVisible:10,value:o(this.props.orgId,this.props.organisationOptions),options:this.props.organisationOptions,onOptionSelected:this.selectOrg,displayOption:"displayOption",filterOption:"filterOption",customClasses:{input:"form-control"}}))}}),t=function(t){var n;return n=0==t.organisationOptions.length?React.createElement("div",null):1==t.organisationOptions.length?React.createElement("p",null,t.organisationOptions[0].displayOption):React.createElement("div",{className:"org-typeahead"},React.createElement(e,{orgId:t.organisation,organisationOptions:t.organisationOptions,setOrganisation:t.setOrganisation})),React.createElement("div",{id:"choose-organisation"},React.createElement("label",null,a.organisation),n)},i=React.createClass({displayName:"Reports",render:function(){var e=this.props.reports,t=e&&e.length||0,n=Math.round(Math.ceil(t/3)),a=Array.from(Array(n).keys()),r=Array.from(Array(3).keys()),o=this;return React.createElement("div",{className:"rsrReports"},a.map(function(t){return React.createElement("div",{className:"row",key:t},r.map(function(n){var a=e[3*t+n];if(void 0!==a)return React.createElement(c,{disabled:o.props.disabled,orgId:o.props.organisation,report:a,key:a.id})}))}))}}),s=React.createClass({displayName:"ReportFormatButton",onClick:function(e){e.stopPropagation(),this.props.download(this.props.format_name)},render:function(){var e=this.props.icon,t=this.props.display_name,n="fa fa-"+e,r=a.download+" "+t;return React.createElement("button",{className:"btn btn-default reportDown",onClick:this.onClick,disabled:this.props.disabled},React.createElement("i",{className:n}),React.createElement("span",null,"  "),React.createElement("span",null,r))}}),c=React.createClass({displayName:"Report",downloadReport:function(e){var t=this.props.report.url,n=this.props.orgId,a=t.replace("{format}",e).replace("{organisation}",n);window.location.assign(a)},render:function(){var e=this.props.report,t=this,n=e.formats.map(function(n){var a=n.icon,r=n.name,o=n.display_name;return React.createElement(s,{disabled:t.props.disabled,download:t.downloadReport,icon:a,format_name:r,display_name:o,url:e.url,key:n.name})});return React.createElement("div",{className:"rsrReport col-sm-6 col-md-4"},React.createElement("div",{className:"reportContainer"},React.createElement("div",{className:""},React.createElement("h3",{className:""},e.title)),React.createElement("div",{className:"reportDscr"},e.description),React.createElement("div",{className:"options"},n)))}}),l=React.createClass({displayName:"MyReportsApp",getInitialState:function(){return{reportOptions:[],organisation:null,organisationOptions:[]}},componentDidMount:function(){this.getOptions(n.user_organisations,"organisationOptions",this.processOrgs),this.getOptions(n.reports,"reportOptions",this.processReports)},getOptions:function(e,t,a){var r=new XMLHttpRequest,o=n.base_url+e+"?format=json",i=this;r.onreadystatechange=function(){if(r.readyState==XMLHttpRequest.DONE&&200==r.status){var e={};e[t]=void 0===a?JSON.parse(r.responseText).results:a(JSON.parse(r.responseText).results),i.setState(e)}},r.open("GET",o,!0),r.send()},processOrgs:function(e){return e.forEach(function(e){var t,n,a=(t=e.name,n=e.long_name,t===n?t:n?t+" ("+n+")":t);e.filterOption=e.name+" "+e.long_name,e.displayOption=a}),1==e.length&&this.setOrganisation(e[0].id),e},processReports:function(e){return e.filter(function(e){return-1==e.parameters.indexOf("project")})},setReport:function(e){this.setState({report:e})},setOrganisation:function(e){this.setState({organisation:e})},render:function(){return React.createElement("div",{id:"my-reports"},React.createElement("h3",null,a.my_reports),React.createElement(t,{organisationOptions:this.state.organisationOptions,report:this.state.report,organisation:this.state.organisation,setOrganisation:this.setOrganisation}),React.createElement(i,{reports:this.state.reportOptions,organisation:this.state.organisation,disabled:!this.state.organisation}))}});ReactDOM.render(React.createElement(l),document.getElementById("container-fluid"))}var s=function(e,t,n){var a=document.createElement("script");a.src=e,a.onload=t,a.onreadystatechange=t,n.appendChild(a)};document.addEventListener("DOMContentLoaded",function(){n=JSON.parse(document.getElementById("data-endpoints").innerHTML),a=JSON.parse(document.getElementById("translation-texts").innerHTML),"undefined"!=typeof React&&"undefined"!=typeof ReactDOM&&"undefined"!=typeof ReactTypeahead?i():function(){function e(){var e=document.getElementById("react-typeahead").src;s(e,i,document.body)}console.log("No React, load again.");var t=document.getElementById("react").src;s(t,function(){var t=document.getElementById("react-dom").src;s(t,e,document.body)},document.body)}()})}});
//# sourceMappingURL=myReports.js.map