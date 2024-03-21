"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[366],{5966:function(G,Z,t){var B=t(1413),I=t(91),k=t(67294),g=t(46651),E=t(85893),d=["fieldProps","proFieldProps"],m=["fieldProps","proFieldProps"],P="text",f=function(F){var z=F.fieldProps,O=F.proFieldProps,N=(0,I.Z)(F,d);return(0,E.jsx)(g.Z,(0,B.Z)({valueType:P,fieldProps:z,filedConfig:{valueType:P},proFieldProps:O},N))},C=function(F){var z=F.fieldProps,O=F.proFieldProps,N=(0,I.Z)(F,m);return(0,E.jsx)(g.Z,(0,B.Z)({valueType:"password",fieldProps:z,proFieldProps:O,filedConfig:{valueType:P}},N))},a=f;a.Password=C,a.displayName="ProFormComponent",Z.Z=a},53838:function(G,Z,t){t.r(Z),t.d(Z,{default:function(){return Me}});var B=t(42122),I=t.n(B),k=t(17061),g=t.n(k),E=t(17156),d=t.n(E),m=t(27424),P=t.n(m),f=t(99702),C=t(87547),a=t(1413),p=t(67294),F={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"}}]},name:"lock",theme:"outlined"},z=F,O=t(98615),N=function(n,i){return p.createElement(O.Z,(0,a.Z)((0,a.Z)({},n),{},{ref:i,icon:z}))};N.displayName="LockOutlined";var ee=p.forwardRef(N),V=t(91),te=t(10915),ne=t(63830),re=t(94184),ie=t.n(re),oe=t(34994),T=t(4942),ae=t(98082),se=function(n){var i;return i={},(0,T.Z)(i,n.componentCls,{display:"flex",width:"100%",height:"100%",backgroundSize:"contain","&-notice":{display:"flex",flex:"1",alignItems:"flex-end","&-activity":{marginBlock:24,marginInline:24,paddingInline:24,paddingBlock:24,"&-title":{fontWeight:"500",fontSize:"28px"},"&-subTitle":{marginBlockStart:8,fontSize:"16px"},"&-action":{marginBlockStart:"24px"}}},"&-container":{display:"flex",flex:"1",flexDirection:"column",maxWidth:"550px",height:"100%",paddingInline:0,paddingBlock:32,overflow:"auto",background:n.colorBgContainer},"&-top":{textAlign:"center"},"&-header":{display:"flex",alignItems:"center",justifyContent:"center",height:"44px",lineHeight:"44px",a:{textDecoration:"none"}},"&-title":{position:"relative",tinsetBlockStartop:"2px",color:"@heading-color",fontWeight:"600",fontSize:"33px"},"&-logo":{width:"44px",height:"44px",marginInlineEnd:"16px",verticalAlign:"top",img:{width:"100%"}},"&-desc":{marginBlockStart:"12px",marginBlockEnd:"40px",color:n.colorTextSecondary,fontSize:n.fontSize},"&-main":{width:"328px",margin:"0 auto","&-other":{marginBlockStart:"24px",lineHeight:"22px",textAlign:"start"}}}),(0,T.Z)(i,"@media (max-width: ".concat(n.screenMDMin,"px)"),(0,T.Z)({},n.componentCls,{flexDirection:"column-reverse",background:"none !important","&-notice":{display:"flex",flex:"none",alignItems:"flex-start",width:"100%","> div":{width:"100%"}}})),(0,T.Z)(i,"@media (min-width: ".concat(n.screenMDMin,"px)"),(0,T.Z)({},n.componentCls,{"&-container":{paddingInline:0,paddingBlockStart:128,paddingBlockEnd:24,backgroundRepeat:"no-repeat",backgroundPosition:"center 110px",backgroundSize:"100%"}})),(0,T.Z)(i,"@media (max-width: ".concat(n.screenSM,"px)"),(0,T.Z)({},n.componentCls,{"&-main":{width:"95%",maxWidth:"328px"}})),i};function le(r){return(0,ae.Xj)("LoginFormPage",function(n){var i=(0,a.Z)((0,a.Z)({},n),{},{componentCls:".".concat(r)});return[se(i)]})}var e=t(85893),de=["logo","message","style","activityConfig","backgroundImageUrl","title","subTitle","actions","children"];function ce(r){var n=r.logo,i=r.message,y=r.style,L=r.activityConfig,u=L===void 0?{}:L,M=r.backgroundImageUrl,D=r.title,U=r.subTitle,R=r.actions,W=r.children,b=(0,V.Z)(r,de),H=(0,te.YB)(),w=function(){var A,s;return b.submitter===!1||((A=b.submitter)===null||A===void 0?void 0:A.submitButtonProps)===!1?!1:(0,a.Z)({size:"large",style:{width:"100%"}},(s=b.submitter)===null||s===void 0?void 0:s.submitButtonProps)},$=(0,a.Z)((0,a.Z)({searchConfig:{submitText:H.getMessage("loginForm.submitText","\u767B\u5F55")},render:function(A,s){return s.pop()}},b.submitter),{},{submitButtonProps:w()}),K=(0,p.useContext)(ne.ZP.ConfigContext),j=K.getPrefixCls("pro-form-login-page"),c=le(j),v=c.wrapSSR,h=c.hashId,o=function(A){return"".concat(j,"-").concat(A," ").concat(h)},l=(0,p.useMemo)(function(){return n?typeof n=="string"?(0,e.jsx)("img",{src:n}):n:null},[n]);return v((0,e.jsxs)("div",{className:ie()(j,h),style:(0,a.Z)((0,a.Z)({},y),{},{backgroundImage:'url("'.concat(M,'")')}),children:[(0,e.jsx)("div",{className:o("notice"),children:u&&(0,e.jsxs)("div",{className:o("notice-activity"),style:u.style,children:[u.title&&(0,e.jsxs)("div",{className:o("notice-activity-title"),children:[" ",u.title," "]}),u.subTitle&&(0,e.jsxs)("div",{className:o("notice-activity-subTitle"),children:[" ",u.subTitle," "]}),u.action&&(0,e.jsxs)("div",{className:o("notice-activity-action"),children:[" ",u.action," "]})]})}),(0,e.jsxs)("div",{className:o("container"),children:[(0,e.jsxs)("div",{className:o("top"),children:[D||l?(0,e.jsxs)("div",{className:o("header"),children:[l?(0,e.jsx)("span",{className:o("logo"),children:l}):null,D?(0,e.jsx)("span",{className:o("title"),children:D}):null]}):null,U?(0,e.jsx)("div",{className:o("desc"),children:U}):null]}),(0,e.jsxs)("div",{className:o("main"),children:[(0,e.jsxs)(oe.A,(0,a.Z)((0,a.Z)({isKeyPressSubmit:!0},b),{},{submitter:$,children:[i,W]})),R?(0,e.jsx)("div",{className:o("other"),children:R}):null]})]})]}))}var X=t(5966),J=t(22270),ue=t(32808),ge=t(80658),Y=t(46651),me=["options","fieldProps","proFieldProps","valueEnum"],fe=p.forwardRef(function(r,n){var i=r.options,y=r.fieldProps,L=r.proFieldProps,u=r.valueEnum,M=(0,V.Z)(r,me);return(0,e.jsx)(Y.Z,(0,a.Z)({ref:n,valueType:"checkbox",valueEnum:(0,J.h)(u,void 0),fieldProps:(0,a.Z)({options:i},y),lightProps:(0,a.Z)({labelFormatter:function(){return(0,e.jsx)(Y.Z,(0,a.Z)({ref:n,valueType:"checkbox",mode:"read",valueEnum:(0,J.h)(u,void 0),filedConfig:{customLightMode:!0},fieldProps:(0,a.Z)({options:i},y),proFieldProps:L},M))}},M.lightProps),proFieldProps:L},M))}),ve=p.forwardRef(function(r,n){var i=r.fieldProps,y=r.children;return(0,e.jsx)(ue.Z,(0,a.Z)((0,a.Z)({ref:n},i),{},{children:y}))}),he=(0,ge.G)(ve,{valuePropName:"checked"}),Q=he;Q.Group=fe;var pe=Q,q=t(19922),S=t(85065),_=t(2453),xe=t(96074),Pe=t(67610),ye=t(73935),je=t(60997),Se=function(){var n=(0,q.l)(function(i){var y=i.token;return{width:42,height:42,lineHeight:"42px",position:"fixed",right:16,borderRadius:y.borderRadius,":hover":{backgroundColor:y.colorBgTextHover}}});return(0,e.jsx)("div",{className:n,"data-lang":!0,children:S.SelectLang&&(0,e.jsx)(S.SelectLang,{})})},Fe=function(){var n=(0,S.useModel)("@@initialState"),i=n.initialState,y=n.setInitialState,L=(0,p.useState)(""),u=P()(L,2),M=u[0],D=u[1],U=(0,p.useState)(""),R=P()(U,2),W=R[0],b=R[1];(0,p.useEffect)(function(){function j(){return c.apply(this,arguments)}function c(){return c=d()(g()().mark(function v(){var h;return g()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return h=t(91950),l.next=3,h.load(function(x){console.log("\u8BD7\u8BCD\u5185\u5BB9"),console.log(x.data.content),D(x.data.content),console.log("\u4F7F\u7528setPoem\u4E4B\u540E,poem\u53D8\u91CF"),console.log(M),b("\u2014\u2014"+x.data.origin.author+"\u300A"+x.data.origin.title+"\u300B")});case 3:case"end":return l.stop()}},v)})),c.apply(this,arguments)}j()},[]),(0,p.useEffect)(function(){document.getElementById("poem")&&(console.log("1123"),document.getElementById("poem").innerHTML=M),document.getElementById("info")&&(document.getElementById("info").innerHTML=W)},[M,W]);var H=(0,q.l)(function(){return{display:"flex",flexDirection:"column",height:"120vh",overflow:"auto",backgroundSize:"100% 100%"}}),w=(0,S.useIntl)(),$=function(){var j=d()(g()().mark(function c(){var v,h;return g()().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,i==null||(v=i.fetchUserInfo)===null||v===void 0?void 0:v.call(i);case 2:h=l.sent,h&&(0,ye.flushSync)(function(){y(function(x){return I()(I()({},x),{},{currentToken:h})})});case 4:case"end":return l.stop()}},c)}));return function(){return j.apply(this,arguments)}}(),K=function(){var j=d()(g()().mark(function c(v){var h,o,l,x;return g()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,(0,je.x4)({userId:v.username,password:v.password});case 3:if(h=s.sent,h){s.next=6;break}return s.abrupt("return");case 6:return o=w.formatMessage({id:"pages.login.success",defaultMessage:"\u767B\u5F55\u6210\u529F\uFF01"}),_.ZP.success(o),s.next=10,$();case 10:return l=new URL(window.location.href).searchParams,S.history.push(l.get("redirect")||"/"),s.abrupt("return");case 15:s.prev=15,s.t0=s.catch(0),x=w.formatMessage({id:"pages.login.failure",defaultMessage:"\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\uFF01"}),_.ZP.error((s.t0===null||s.t0===void 0?void 0:s.t0.message)||x);case 19:case"end":return s.stop()}},c,null,[[0,15]])}));return function(v){return j.apply(this,arguments)}}();return(0,e.jsxs)("div",{className:H,style:{overflowX:"hidden",overflowY:"hidden"},children:[(0,e.jsx)(S.Helmet,{children:(0,e.jsxs)("title",{children:[w.formatMessage({id:"menu.login",defaultMessage:"\u767B\u5F55\u9875"}),"- ",Pe.Z.title]})}),(0,e.jsx)(Se,{}),(0,e.jsx)("div",{style:{overflowX:"hidden",overflowY:"hidden",backgroundColor:"white",height:"calc(110vh - 48px)",margin:0},children:(0,e.jsxs)(ce,{logo:(0,e.jsx)("img",{alt:"logo",src:"/logo.jpg"}),title:"\u4E2A\u4EBA\u56FE\u4E66\u7BA1\u7406",actions:(0,e.jsx)("div",{style:{textAlign:"center"},children:(0,e.jsxs)("p",{children:["\u2014\u2014 Designed by ",(0,e.jsx)("a",{href:"https://gitee.com/bsgbsg7",children:"Bsgbsg7"})]})}),backgroundImageUrl:"https://t.mwm.moe/pc",initialValues:{autoLogin:!0},onFinish:function(){var j=d()(g()().mark(function c(v){return g()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,K(v);case 2:case"end":return o.stop()}},c)}));return function(c){return j.apply(this,arguments)}}(),children:[(0,e.jsx)(xe.Z,{dashed:!0,children:(0,e.jsx)("span",{style:{color:"#AAA",fontWeight:"normal",fontSize:14},children:"\u5FF5\u4E24\u53E5\u8BD7"})}),(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{style:{fontSize:25,float:"left",lineHeight:0,wordBreak:"normal",margin:0,padding:0},children:"\u300E"}),(0,e.jsx)("div",{id:"poem",style:{fontSize:18,textAlign:"center",lineHeight:2,wordBreak:"normal",margin:0,padding:10}}),(0,e.jsx)("div",{style:{fontSize:25,float:"right",lineHeight:0,wordBreak:"normal",margin:0,padding:0},children:"\u300F"}),(0,e.jsx)("div",{id:"info",style:{fontSize:15,textAlign:"right",lineHeight:5,wordBreak:"normal",margin:0,padding:0}})]}),(0,e.jsx)(X.Z,{name:"username",fieldProps:{size:"large",prefix:(0,e.jsx)(C.Z,{})},placeholder:w.formatMessage({id:"pages.login.username.placeholder",defaultMessage:"\u7528\u6237\u540D: admin or user"}),rules:[{required:!0,message:(0,e.jsx)(S.FormattedMessage,{id:"pages.login.username.required",defaultMessage:"\u8BF7\u8F93\u5165\u7528\u6237\u540D!"})}]}),(0,e.jsx)(X.Z.Password,{name:"password",fieldProps:{size:"large",prefix:(0,e.jsx)(ee,{})},placeholder:w.formatMessage({id:"pages.login.password.placeholder",defaultMessage:"\u5BC6\u7801: ant.design"}),rules:[{required:!0,message:(0,e.jsx)(S.FormattedMessage,{id:"pages.login.password.required",defaultMessage:"\u8BF7\u8F93\u5165\u5BC6\u7801\uFF01"})}]}),(0,e.jsxs)("div",{style:{marginBottom:24},children:[(0,e.jsx)(pe,{noStyle:!0,name:"autoLogin",children:(0,e.jsx)(S.FormattedMessage,{id:"pages.login.rememberMe",defaultMessage:"\u81EA\u52A8\u767B\u5F55"})}),(0,e.jsx)("a",{style:{float:"right"},children:(0,e.jsx)(S.FormattedMessage,{id:"pages.login.forgotPassword",defaultMessage:"\u5FD8\u8BB0\u5BC6\u7801"})})]})]})}),(0,e.jsx)(f.Z,{})]})},Me=Fe},91950:function(G,Z,t){t.r(Z),t.d(Z,{load:function(){return I}});const B="jinrishici-token";function I(d,m){return window.localStorage&&window.localStorage.getItem(B)?g(d,m,window.localStorage.getItem(B)):k(d,m)}function k(d,m){return E(function(f){window.localStorage.setItem(B,f.token),d(f)},m,"https://v2.jinrishici.com/one.json?client=npm-sdk/1.0")}function g(d,m,P){return E(d,m,"https://v2.jinrishici.com/one.json?client=npm-sdk/1.0&X-User-Token="+encodeURIComponent(P))}function E(d,m,P){var f=new XMLHttpRequest;f.open("get",P),f.withCredentials=!0,f.send(),f.onreadystatechange=function(){if(f.readyState===4){var C=JSON.parse(f.responseText);C.status==="success"?d(C):m?m(C):console.error("\u4ECA\u65E5\u8BD7\u8BCDAPI\u52A0\u8F7D\u5931\u8D25\uFF0C\u9519\u8BEF\u539F\u56E0\uFF1A"+C.errMessage)}}}}}]);
