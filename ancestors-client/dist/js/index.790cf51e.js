(function(e){function t(t){for(var r,i,o=t[0],l=t[1],c=t[2],p=0,m=[];p<o.length;p++)i=o[p],s[i]&&m.push(s[i][0]),s[i]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(m.length)m.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,o=1;o<a.length;o++){var l=a[o];0!==s[l]&&(r=!1)}r&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var r={},s={index:0},n=[];function i(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=r,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"009a":function(e,t,a){},"034f":function(e,t,a){"use strict";var r=a("64a9"),s=a.n(r);s.a},"39b5":function(e,t,a){"use strict";var r=a("af95"),s=a.n(r);s.a},4039:function(e,t,a){},"463f":function(e,t,a){e.exports=a.p+"img/404.6b8ae1d0.gif"},"467c":function(e,t,a){"use strict";var r=a("945c"),s=a.n(r);s.a},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("f751"),a("097d");var r=a("2b0e"),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[],i=a("a4bb"),o=a.n(i),l=a("7618"),c=a("04e1"),u=a.n(c),p={name:"app",created:function(){if(localStorage.eleToken){var e=u()(localStorage.eleToken);this.$store.dispatch("setIsAutnenticated",!this.isEmpty(e)),this.$store.dispatch("setUser",e)}},methods:{isEmpty:function(e){return void 0===e||null===e||"object"===Object(l["a"])(e)&&0===o()(e).length||"string"===typeof e&&0===e.trim().length}}},m=p,d=(a("034f"),a("2877")),f=Object(d["a"])(m,s,n,!1,null,null,null),g=f.exports,h=a("8c4f"),b=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},v=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"nofind"},[r("img",{attrs:{src:a("463f"),alt:""}})])}],w=(a("39b5"),{}),_=Object(d["a"])(w,b,v,!1,null,"d4641136",null),y=_.exports,x=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"index"},[a("HeadNav"),a("LeftMenu"),a("div",{staticClass:"rightContainer"},[a("router-view")],1)],1)},C=[],$=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("header",{staticClass:"head-nav"},[r("el-row",[r("el-col",{staticClass:"logo-container",attrs:{span:6}},[r("img",{staticClass:"logo",attrs:{src:a("cf05"),alt:""}}),r("span",{staticClass:"title"},[e._v("先辈在线后台管理系统")])]),r("el-col",{staticClass:"user",attrs:{span:6}},[r("div",{staticClass:"userinfo"},[r("img",{staticClass:"avatar",attrs:{src:e.user.avatar,alt:""}}),r("div",{staticClass:"welcome"},[r("p",{staticClass:"name comename"},[e._v("欢迎")]),r("p",{staticClass:"name avatarname"},[e._v(e._s(e.user.name))])]),r("span",{staticClass:"username"},[r("el-dropdown",{attrs:{trigger:"click"},on:{command:e.setDialogInfo}},[r("span",{staticClass:"el-dropdown-link"},[r("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{command:"info"}},[e._v("个人信息")]),r("el-dropdown-item",{attrs:{command:"logout"}},[e._v("退出")])],1)],1)],1)])])],1)],1)},k=[],S={name:"head-nav",computed:{user:function(){return this.$store.getters.user}},methods:{setDialogInfo:function(e){switch(e){case"info":this.showInfoList();break;case"logout":this.logout();break}},showInfoList:function(){this.$router.push("/infoshow")},logout:function(){localStorage.removeItem("eleToken"),this.$store.dispatch("clearCurrentState"),this.$router.push("/login")}}},E=S,T=(a("6dec"),Object(d["a"])(E,$,k,!1,null,"34d36407",null)),U=T.exports,j=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-row",{staticClass:"menu_page"},[a("el-col",[a("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{mode:"vertical","background-color":"#324057","text-color":"#fff","active-text-color":"#409eff"}},[a("router-link",{attrs:{to:"/home"}},[a("el-menu-item",{attrs:{index:"0"}},[a("i",{staticClass:"fa fa-margin fa-server"}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v("首页")])])],1),e._l(e.items,function(t){return[t.children?a("el-submenu",{key:t.path,attrs:{index:t.path}},[a("template",{slot:"title"},[a("i",{class:"fa fa-margin "+t.icon}),a("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.name))])]),e._l(t.children,function(t,r){return a("router-link",{key:r,attrs:{to:t.path}},[a("el-menu-item",{attrs:{index:t.path}},[a("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.name))])])],1)})],2):e._e()]})],2)],1)],1)},z=[],D={name:"leftmenu",data:function(){return{items:[{icon:"fa-money",name:"游戏",path:"fund",children:[{path:"foundlist",name:"游戏基础信息"}]},{icon:"fa-asterisk",name:"信息管理",path:"info",children:[{path:"infoshow",name:"个人信息"}]}]}}},O=D,I=(a("700f"),Object(d["a"])(O,j,z,!1,null,"58fa06ca",null)),q=I.exports,A={name:"index",components:{HeadNav:U,LeftMenu:q},data:function(){return{}}},N=A,P=(a("7866"),Object(d["a"])(N,x,C,!1,null,"22f53002",null)),F=P.exports,M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"register"},[a("section",{staticClass:"form_container"},[a("div",{staticClass:"manage_tip"},[a("span",{staticClass:"title"},[e._v("先辈在线后台管理系统")]),a("el-form",{ref:"loginForm",staticClass:"loginForm",attrs:{model:e.loginUser,rules:e.rules,"label-width":"60px"}},[a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入邮箱"},model:{value:e.loginUser.email,callback:function(t){e.$set(e.loginUser,"email",t)},expression:"loginUser.email"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{placeholder:"请输入密码",type:"password"},model:{value:e.loginUser.password,callback:function(t){e.$set(e.loginUser,"password",t)},expression:"loginUser.password"}})],1),a("el-form-item",[a("el-button",{staticClass:"submit_btn",attrs:{type:"primary"},on:{click:function(t){return e.submitForm("loginForm")}}},[e._v("登  录")])],1),a("div",{staticClass:"tiparea"},[a("p",[e._v("还没有账号？现在"),a("router-link",{attrs:{to:"/register"}},[e._v("注册")])],1)])],1)],1)])])},R=[],L=a("bc3a"),B=a.n(L),H=function(e,t,a){return B()({method:e,url:t,headers:{"Content-Type":"application/x-www-form-urlencoded"},data:a,traditional:!0,transformRequest:[function(e){var t="";for(var a in e)t+=encodeURIComponent(a)+"="+encodeURIComponent(e[a])+"&";return t}]}).then(function(e){return e.data})},J="http://www.xlmx.xyz:8082",G=function(e){return H("post","".concat(J,"/api/users/register"),e)},K=function(e){return H("post","".concat(J,"/api/users/login"),e)},Q=function(){return B.a.get("".concat(J,"/api/games"))},V=function(e){return B.a.delete("".concat(J,"/api/games/delete/").concat(e))},W=function(e,t){return H("post","".concat(J,"/api/games/updatebasics/").concat(e),t)},X=function(e,t){return H("post","".concat(J,"/api/games/updatedown/").concat(e),t)},Y={name:"register",components:{},data:function(){return{loginUser:{email:"754308302@qq.com",password:"123456"},rules:{email:[{type:"email",required:!0,message:"邮箱格式不正确",trigger:"blur"}],password:[{required:!0,message:"密码不能为空"},{min:6,max:30,message:"长度在6到20个字符之间",trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;K(t.loginUser).then(function(e){t.$message({message:"登录成功",type:"success"});var a=e.token;localStorage.setItem("eleToken",a);var r=u()(a);t.$store.dispatch("setIsAutnenticated",!t.isEmpty(r)),t.$store.dispatch("setUser",r),t.$router.push("/index")})})},isEmpty:function(e){return void 0===e||null===e||"object"===Object(l["a"])(e)&&0===o()(e).length||"string"===typeof e&&0===e.trim().length}}},Z=Y,ee=(a("a43d"),Object(d["a"])(Z,M,R,!1,null,"25cf44c0",null)),te=ee.exports,ae=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"register"},[a("section",{staticClass:"form_container"},[a("div",{staticClass:"manage_tip"},[a("span",{staticClass:"title"},[e._v("先辈在线后台管理系统")]),a("el-form",{ref:"registerForm",staticClass:"registerForm",attrs:{model:e.registerUser,rules:e.rules,"label-width":"80px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.registerUser.name,callback:function(t){e.$set(e.registerUser,"name",t)},expression:"registerUser.name"}})],1),a("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[a("el-input",{attrs:{placeholder:"请输入email"},model:{value:e.registerUser.email,callback:function(t){e.$set(e.registerUser,"email",t)},expression:"registerUser.email"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password",placeholder:"请输入密码"},model:{value:e.registerUser.password,callback:function(t){e.$set(e.registerUser,"password",t)},expression:"registerUser.password"}})],1),a("el-form-item",{attrs:{label:"确认密码",prop:"password2"}},[a("el-input",{attrs:{type:"password",placeholder:"请确认密码"},model:{value:e.registerUser.password2,callback:function(t){e.$set(e.registerUser,"password2",t)},expression:"registerUser.password2"}})],1),a("el-form-item",{attrs:{label:"选择身份",prop:"identity"}},[a("el-select",{attrs:{placeholder:"请选择身份"},model:{value:e.registerUser.identity,callback:function(t){e.$set(e.registerUser,"identity",t)},expression:"registerUser.identity"}},[a("el-option",{attrs:{label:"管理员",value:"manager"}}),a("el-option",{attrs:{label:"员工",value:"employee"}})],1)],1),a("el-form-item",[a("el-button",{staticClass:"submit_btn",attrs:{type:"primary"},on:{click:function(t){return e.submitForm("registerForm")}}},[e._v("注册")])],1)],1)],1)])])},re=[],se={name:"register",components:{},data:function(){var e=this,t=function(t,a,r){a!==e.registerUser.password?r(new Error("两次输入密码不一致!")):r()};return{registerUser:{name:"wsrh8888",email:"754308302@qq.com",password:"123456",password2:"123456",identity:""},rules:{name:[{required:!0,message:"用户名不能为空",trigger:"blur"},{min:2,max:30,message:"长度在2到30个字符之间",trigger:"blur"}],email:[{type:"email",required:!0,message:"邮箱格式不正确",trigger:"blur"}],password:[{required:!0,message:"密码不能为空"},{min:6,max:30,message:"长度在6到20个字符之间",trigger:"blur"}],password2:[{required:!0,message:"确认密码不能为空"},{min:6,max:30,message:"长度在6到20个字符之间",trigger:"blur"},{validator:t,trigger:"blur"}],identity:[{required:!0,message:"请选择身份",trigger:"change"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;G(t.registerUser).then(function(e){e&&(t.$message({message:"帐号注册成功",type:"success"}),t.$router.push("/login"))})})}}},ne=se,ie=(a("775f"),Object(d["a"])(ne,ae,re,!1,null,"64f6e509",null)),oe=ie.exports,le=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},ce=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("div",{staticClass:"container"},[a("h1",{staticClass:"title"},[e._v("先辈在线")]),a("p",{staticClass:"lead"},[e._v(" 专注于游戏制作, 用心做游戏, 用心做服务! ")])])])}],ue=(a("467c"),{}),pe=Object(d["a"])(ue,le,ce,!1,null,"4f6ff76a",null),me=pe.exports,de=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"infoshow"},[a("el-row",{staticClass:"row-bg",attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:8}},[a("div",{staticClass:"user"},[a("img",{staticClass:"avatar",attrs:{src:e.user.avatar,alt:""}})])]),a("el-col",{attrs:{span:16}},[a("div",{staticClass:"userinfo"},[a("div",{staticClass:"user-item"},[a("i",{staticClass:"fa fa-user"}),a("span",[e._v(e._s(e.user.name))])]),a("div",{staticClass:"user-item"},[a("i",{staticClass:"fa fa-cog"}),a("span",[e._v(e._s("manager"==e.user.identity?"管理员":"普通员工"))])])])])],1)],1)},fe=[],ge={name:"infoshow",computed:{user:function(){return this.$store.getters.user}}},he=ge,be=(a("dacb"),Object(d["a"])(he,de,fe,!1,null,"55d2e704",null)),ve=be.exports,we=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fillcontain"},[a("div",[a("el-form",{ref:"add_data",attrs:{inline:!0,model:e.search_data}},[a("el-form-item",{staticClass:"btnRight"},[a("el-button",{attrs:{size:"small",icon:"view",type:"primary"},on:{click:function(t){return e.onAddMoney()}}},[e._v("添加")])],1)],1)],1),a("div",{staticClass:"table_container"},[e.gameData.length>0?a("el-table",{attrs:{data:e.gameData,"max-height":"450",border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"70"}}),a("el-table-column",{attrs:{prop:"name",label:"游戏名字",align:"center",width:"120"}}),a("el-table-column",{attrs:{prop:"basics.author",label:"游戏作者",align:"center",width:"100"}}),a("el-table-column",{attrs:{prop:"basics.size",label:"游戏大小",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{color:"#00d053"}},[e._v("+ "+e._s(t.row.basics.size))])]}}],null,!1,842587083)}),a("el-table-column",{attrs:{prop:"basics.versions",label:"版本",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{color:"#f56767"}},[e._v("v-"+e._s(t.row.basics.versions))])]}}],null,!1,3631359734)}),a("el-table-column",{attrs:{prop:"basics.date",label:"更新时间",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticStyle:{color:"#4db3ff"}},[e._v(e._s(t.row.basics.date))])]}}],null,!1,1014447817)}),a("el-table-column",{attrs:{prop:"basics.studio",label:"工作室",align:"center",width:"130"}}),a("el-table-column",{attrs:{prop:"basics.prince",label:"价格",align:"center",width:"80"}}),a("el-table-column",{attrs:{prop:"basics.declaration",label:"声明",align:"center",width:"200"}}),a("el-table-column",{attrs:{prop:"install.url1",label:"完整版地址",align:"center",width:"100"}}),a("el-table-column",{attrs:{prop:"install.password1",label:"完整版密码",align:"center",width:"100"}}),a("el-table-column",{attrs:{prop:"install.url2",label:"独立版地址",align:"center",width:"100"}}),a("el-table-column",{attrs:{prop:"install.password2",label:"独立版密码",align:"center",width:"100"}}),a("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"warning",size:"small",icon:"edit"},on:{click:function(a){return e.onEditBasic(t.$index,t.row)}}},[e._v("编辑基本")]),a("el-button",{attrs:{type:"warning",size:"small",icon:"edit"},on:{click:function(a){return e.onEditDown(t.$index,t.row)}}},[e._v("编辑游戏")]),a("el-button",{attrs:{size:"small",type:"danger",icon:"delete"},on:{click:function(a){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}],null,!1,473289939)})],1):e._e()],1),a("div",{staticClass:"table_container"},[a("el-row",[a("el-col",{attrs:{span:24}},[a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{"current-page":e.paginations.page_index,"page-sizes":e.paginations.page_sizes,"page-size":e.paginations.page_size,layout:e.paginations.layout,total:e.paginations.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){return e.$set(e.paginations,"page_index",t)},"update:current-page":function(t){return e.$set(e.paginations,"page_index",t)}}})],1)])],1)],1),a("moduleName",{attrs:{dialog:e.dialog,form:e.form},on:{update:e.getProfile}}),a("Dpdatedown",{attrs:{dialog:e.diadown,form:e.form},on:{update:e.getProfile}})],1)},_e=[],ye=(a("7f7f"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"logFund"},[a("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialog.show,"close-on-click-modal":!1,"close-on-press-escape":!1,"modal-append-to-body":!1},on:{"update:visible":function(t){return e.$set(e.dialog,"show",t)}}},[a("div",{staticClass:"form"},[a("el-form",{ref:"form",staticStyle:{margin:"10px",width:"auto"},attrs:{model:e.form,rules:e.form_rules,"label-width":"120px"}},[a("el-form-item",{attrs:{prop:"name",label:"游戏名字:"}},[a("el-input",{attrs:{type:"name"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{prop:"size",label:"游戏大小:"}},[a("el-input",{attrs:{type:"size"},model:{value:e.form.size,callback:function(t){e.$set(e.form,"size",t)},expression:"form.size"}})],1),a("el-form-item",{attrs:{prop:"versions",label:"游戏版本"}},[a("el-input",{attrs:{type:"versions"},model:{value:e.form.versions,callback:function(t){e.$set(e.form,"versions",t)},expression:"form.versions"}})],1),a("el-form-item",{attrs:{prop:"date",label:"更新日期:"}},[a("el-input",{attrs:{type:"date"},model:{value:e.form.date,callback:function(t){e.$set(e.form,"date",t)},expression:"form.date"}})],1),a("el-form-item",{attrs:{label:"工作室:",prop:"studio"}},[a("el-input",{attrs:{type:"studio"},model:{value:e.form.studio,callback:function(t){e.$set(e.form,"studio",t)},expression:"form.studio"}})],1),a("el-form-item",{attrs:{label:"价格:",prop:"prince"}},[a("el-input",{attrs:{type:"prince"},model:{value:e.form.prince,callback:function(t){e.$set(e.form,"prince",t)},expression:"form.prince"}})],1),a("el-form-item",{attrs:{label:"声明:",prop:"declaration"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.form.declaration,callback:function(t){e.$set(e.form,"declaration",t)},expression:"form.declaration"}})],1),a("el-form-item",{staticClass:"text_right"},[a("el-button",{on:{click:function(t){e.dialog.show=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form")}}},[e._v("提  交")])],1)],1)],1)])],1)}),xe=[],Ce={name:"logfound",props:{dialog:Object,form:Object},data:function(){return{form_rules:{name:[{required:!0,message:"游戏名字不能为空！",trigger:"blur"}],size:[{required:!0,message:"游戏大小不能为空！",trigger:"blur"}],versions:[{required:!0,message:"游戏版本不能为空！",trigger:"blur"}],studio:[{required:!0,message:"游戏工作室不能空！",trigger:"blur"}],date:[{required:!0,message:"游戏更新日期不能空！",trigger:"blur"}],prince:[{required:!0,message:"游戏价格不能为空",trigger:"blur"}],declaration:[{required:!0,message:"游戏声明不能为",trigger:"blur"}]}}},methods:{onSubmit:function(e){var t=this;this.$refs[e].validate(function(e){e&&W(t.form.id,t.form).then(function(e){e&&t.$message({message:"保存成功！",type:"success"}),t.dialog.show=!1,t.$emit("update")})})}}},$e=Ce,ke=Object(d["a"])($e,ye,xe,!1,null,null,null),Se=ke.exports,Ee=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"logFund"},[a("el-dialog",{attrs:{title:e.dialog.title,visible:e.dialog.show,"close-on-click-modal":!1,"close-on-press-escape":!1,"modal-append-to-body":!1},on:{"update:visible":function(t){return e.$set(e.dialog,"show",t)}}},[a("div",{staticClass:"form"},[a("el-form",{ref:"form",staticStyle:{margin:"10px",width:"auto"},attrs:{model:e.form,rules:e.form_rules,"label-width":"120px"}},[a("el-form-item",{attrs:{prop:"name",label:"游戏名字:"}},[a("el-input",{attrs:{type:"name"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),a("el-form-item",{attrs:{prop:"url1",label:"完整版地址:"}},[a("el-input",{attrs:{type:"url1"},model:{value:e.form.url1,callback:function(t){e.$set(e.form,"url1",t)},expression:"form.url1"}})],1),a("el-form-item",{attrs:{prop:"password1",label:"完整版密码:"}},[a("el-input",{attrs:{type:"password1"},model:{value:e.form.password1,callback:function(t){e.$set(e.form,"password1",t)},expression:"form.password1"}})],1),a("el-form-item",{attrs:{prop:"url2",label:"独立版地址"}},[a("el-input",{attrs:{type:"url2"},model:{value:e.form.url2,callback:function(t){e.$set(e.form,"url2",t)},expression:"form.url2"}})],1),a("el-form-item",{attrs:{prop:"password2",label:"独立版密码"}},[a("el-input",{attrs:{type:"password2"},model:{value:e.form.password2,callback:function(t){e.$set(e.form,"password2",t)},expression:"form.password2"}})],1),a("el-form-item",{staticClass:"text_right"},[a("el-button",{on:{click:function(t){e.dialog.show=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.onSubmit("form")}}},[e._v("提  交")])],1)],1)],1)])],1)},Te=[],Ue={name:"downfound",props:{dialog:Object,form:Object},data:function(){return{form_rules:{name:[{required:!0,message:"游戏名字不能为空！",trigger:"blur"}]}}},methods:{onSubmit:function(e){var t=this;this.$refs[e].validate(function(e){e&&(console.log(t.form),X(t.form.id,t.form).then(function(e){e&&t.$message({message:"保存成功！",type:"success"}),t.dialog.show=!1,t.$emit("update")}))})}}},je=Ue,ze=Object(d["a"])(je,Ee,Te,!1,null,null,null),De=ze.exports,Oe={name:"fundList",components:{moduleName:Se,Dpdatedown:De},data:function(){return{search_data:{startTime:"",endTime:""},paginations:{page_index:1,total:0,page_size:5,page_sizes:[5,10,15,20],layout:"total,sizes,prev,pager,next,jumper"},gameData:[],allTableData:[],filterTableData:[],dialog:{show:!1,title:"",option:"edit"},diadown:{show:!1,title:"",option:"edit"},form:{}}},created:function(){this.getProfile()},computed:{user:function(){return this.$store.getters.user}},methods:{getProfile:function(){var e=this;Q().then(function(t){e.gameData=t.data,e.allTableData=t.data,e.filterTableData=t.data,e.setPaginations()})},onEditBasic:function(e,t){this.dialog={show:!0,title:"修改游戏基本信息",option:"edit"},this.form={id:t._id,author:t.basics.author,size:t.basics.size,versions:t.basics.versions,date:t.basics.date,studio:t.basics.studio,prince:t.basics.prince,declaration:t.basics.declaration,name:t.name}},onEditDown:function(e,t){this.diadown={show:!0,title:"修改游戏基本信息",option:"edit"},this.form={id:t._id,name:t.name,url1:t.install.url1,password1:t.install.password1,url2:t.install.url2,password2:t.install.password2}},handleDelete:function(e,t){var a=this;V(t._id).then(function(e){e.data&&(a.$message("删除成功"),a.getProfile())})},onAddMoney:function(){this.dialog={show:!0,title:"添加资金信息",option:"add"},this.form={type:"",describe:"",income:"",expend:"",cash:"",remarkn:"",id:""}},setPaginations:function(){var e=this;this.paginations.total=this.allTableData.length,this.paginations.page_index=1,this.paginations.page_size=5,this.gameData=this.allTableData.filter(function(t,a){return a<e.paginations.page_size})},handleSizeChange:function(e){this.paginations.page_index=1,this.paginations.page_size=e,this.gameData=this.allTableData.filter(function(t,a){return a<e})},handleCurrentChange:function(e){for(var t=this.paginations.page_size*(e-1),a=this.paginations.page_size*e,r=[],s=t;s<a;s++)this.allTableData[s]&&r.push(this.allTableData[s]),this.gameData=r}}},Ie=Oe,qe=(a("e36c"),Object(d["a"])(Ie,we,_e,!1,null,"4eab1fb5",null)),Ae=qe.exports;r["default"].use(h["a"]);var Ne=new h["a"]({mode:"hash",base:"",routes:[{path:"/",redirect:"/index"},{path:"/index",component:F,children:[{path:"/",component:me},{path:"/home",name:"home",component:me},{path:"/infoshow",name:"InfoShow",component:ve},{path:"/foundlist",name:"Foundlist",component:Ae}]},{path:"/register",name:"register",component:oe},{path:"/login",name:"login",component:te},{path:"*",name:"/404",component:y}]});Ne.beforeEach(function(e,t,a){var r=!!localStorage.eleToken;"/login"==e.path||"/register"==e.path||"/home"==e.path?a():r?a():a("/login")});var Pe,Fe=Ne,Me=a("bd86"),Re=a("2f62");r["default"].use(Re["a"]);var Le,Be={SET_IS_AUTNENTIATED:"SET_IS_AUTNENTIATED",SET_USER:"SET_USER"},He={isAutnenticated:!1,user:{}},Je={isAutnenticated:function(e){return e.isAutnenticated},user:function(e){return e.user}},Ge=(Pe={},Object(Me["a"])(Pe,Be.SET_IS_AUTNENTIATED,function(e,t){e.isAutnenticated=t||!1}),Object(Me["a"])(Pe,Be.SET_USER,function(e,t){e.user=t||{}}),Pe),Ke={setIsAutnenticated:function(e,t){var a=e.commit;a(Be.SET_IS_AUTNENTIATED,t)},setUser:function(e,t){var a=e.commit;a(Be.SET_USER,t)},clearCurrentState:function(e){var t=e.commit;t(Be.SET_IS_AUTNENTIATED,!1),t(Be.SET_USER,null)}},Qe=new Re["a"].Store({state:He,getters:Je,mutations:Ge,actions:Ke}),Ve=a("795b"),We=a.n(Ve),Xe=a("5c96"),Ye=a.n(Xe);function Ze(){Le=Xe["Loading"].service({lock:!0,text:"...拼命加载中",background:"rgba(0,0,0,0,7)"})}function et(){Le.close()}B.a.interceptors.request.use(function(e){return Ze(),localStorage.eleToken&&(e.headers.Authorization=localStorage.eleToken),e},function(e){return We.a.reject(e)}),B.a.interceptors.response.use(function(e){return et(),e},function(e){et(),Xe["Message"].error(e.response.data);var t=e.status;return 401==t&&(Xe["Message"].error("token失效，请重新登录"),localStorage.removeItem("eleToken"),Fe.push("/login")),We.a.reject(e)});var tt=B.a;a("0fae");r["default"].config.productionTip=!1,r["default"].use(Ye.a),r["default"].prototype.$axios=tt,new r["default"]({router:Fe,store:Qe,render:function(e){return e(g)}}).$mount("#app")},"63e2":function(e,t,a){},"64a9":function(e,t,a){},"6dec":function(e,t,a){"use strict";var r=a("63e2"),s=a.n(r);s.a},"700f":function(e,t,a){"use strict";var r=a("82f9"),s=a.n(r);s.a},"775f":function(e,t,a){"use strict";var r=a("4039"),s=a.n(r);s.a},7866:function(e,t,a){"use strict";var r=a("c78f"),s=a.n(r);s.a},"7fc3":function(e,t,a){},"82f9":function(e,t,a){},"945c":function(e,t,a){},"9cf3":function(e,t,a){},a43d:function(e,t,a){"use strict";var r=a("009a"),s=a.n(r);s.a},af95:function(e,t,a){},c78f:function(e,t,a){},cf05:function(e,t,a){e.exports=a.p+"img/logo.c43f32ce.png"},dacb:function(e,t,a){"use strict";var r=a("9cf3"),s=a.n(r);s.a},e36c:function(e,t,a){"use strict";var r=a("7fc3"),s=a.n(r);s.a}});
//# sourceMappingURL=index.790cf51e.js.map