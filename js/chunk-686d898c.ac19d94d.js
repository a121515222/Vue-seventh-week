(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-686d898c"],{"60b0":function(e,t,c){},"6da8":function(e,t,c){"use strict";c.r(t);var a=c("7a23"),n={class:"container"},l={class:"row"},i={class:"from-group d-flex justify-content-end"},o={class:"col-12"},r={class:"card"},s=Object(a["createElementVNode"])("div",{class:"card-header bg-primary text-light"},[Object(a["createElementVNode"])("h3",null,"文章列表")],-1),d={class:"card-body"},u={class:"table"},b=Object(a["createElementVNode"])("thead",null,[Object(a["createElementVNode"])("tr",null,[Object(a["createElementVNode"])("th",null,"發布日期"),Object(a["createElementVNode"])("th",null,"文章標題"),Object(a["createElementVNode"])("th",null,"作者"),Object(a["createElementVNode"])("th",null,"是否公開"),Object(a["createElementVNode"])("th",null,"標籤"),Object(a["createElementVNode"])("th",null,"編輯與詳細內容"),Object(a["createElementVNode"])("th",null,"刪除")])],-1),m=["onClick"],p={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},h=Object(a["createTextVNode"])(" 編輯文章 "),g=["onClick"],O={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},j=Object(a["createTextVNode"])(" 刪除文章 ");function f(e,t,c,f,V,N){var v=Object(a["resolveComponent"])("VueLoading"),E=Object(a["resolveComponent"])("PaginationComponent"),k=Object(a["resolveComponent"])("AdminArticleModal");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",n,[Object(a["createVNode"])(v,{active:V.isLoadingPage,"z-index":1060},null,8,["active"]),Object(a["createElementVNode"])("div",l,[Object(a["createElementVNode"])("div",i,[Object(a["createElementVNode"])("button",{class:"btn btn-primary",type:"button",onClick:t[0]||(t[0]=function(e){V.isNew=!0,N.openModal()})}," 新增文章 ")]),Object(a["createElementVNode"])("div",o,[Object(a["createElementVNode"])("div",r,[s,Object(a["createElementVNode"])("div",d,[Object(a["createElementVNode"])("table",u,[b,Object(a["createElementVNode"])("tbody",null,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(V.articles,(function(e){return Object(a["openBlock"])(),Object(a["createElementBlock"])("tr",{key:e.id},[Object(a["createElementVNode"])("td",null,Object(a["toDisplayString"])(N.showTime(0|e.create_at)),1),Object(a["createElementVNode"])("td",null,Object(a["toDisplayString"])(e.title),1),Object(a["createElementVNode"])("td",null,Object(a["toDisplayString"])(e.author),1),Object(a["createElementVNode"])("td",{class:Object(a["normalizeClass"])({"text-success":e.isPublic,"text-danger":!1===e.isPublic})},Object(a["toDisplayString"])(N.articleStatus(e.isPublic)),3),Object(a["createElementVNode"])("td",null,[(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(e.tag,(function(e,t){return Object(a["openBlock"])(),Object(a["createElementBlock"])("span",{key:e+t,class:"badge bg-primary mx-1"},Object(a["toDisplayString"])(e),1)})),128))]),Object(a["createElementVNode"])("td",null,[Object(a["createElementVNode"])("button",{class:"btn btn-outline-secondary",type:"button",onClick:function(t){V.postId=e.id,V.isNew=!1,N.editArticle()}},[V.isLoading?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",p)):Object(a["createCommentVNode"])("",!0),h],8,m)]),Object(a["createElementVNode"])("td",null,[Object(a["createElementVNode"])("button",{class:"btn btn-outline-dark",type:"button",onClick:function(t){V.postId=e.id,N.deleteArticle()}},[V.isLoading?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",O)):Object(a["createCommentVNode"])("",!0),j],8,g)])])})),128))])])])]),Object(a["createVNode"])(E,{pagination:V.pagination},null,8,["pagination"])])]),Object(a["createVNode"])(k,{ref:"adminArticleModal","get-article":V.tempArticle,"is-new":V.isNew,onSendArticle:N.sendArticle},null,8,["get-article","is-new","onSendArticle"])])}var V=c("5530"),N=(c("99af"),c("a4d3"),c("e01a"),c("0d03"),c("2a53")),v={class:"modal fade",ref:"articleModal",id:"articleModal",tabindex:"-1","aria-hidden":"true"},E={class:"modal-dialog modal-xl"},k={class:"modal-content"},y={class:"modal-header"},w={class:"modal-title"},M={class:"modal-body"},C={class:"row row-cols-2"},x={class:"from-group py-2"},A=Object(a["createElementVNode"])("label",{for:"articleTitle",class:"form-label"},"文章標題",-1),L={class:"from-group py-2"},B=Object(a["createElementVNode"])("label",{for:"articleDescription",class:"form-label"},"文章描述",-1),T={class:"from-group py-2"},D=Object(a["createElementVNode"])("label",{for:"articleAuthor",class:"form-label"},"文章作者",-1),P={class:"from-group py-2"},S=Object(a["createElementVNode"])("label",{for:"articleDate",class:"form-label"},"文章日期",-1),I={class:"from-group py-2"},$=Object(a["createElementVNode"])("label",{for:"articleImg",class:"form-label"},"文章圖片",-1),_={class:"from-group py-2 d-flex gap-3"},U=Object(a["createElementVNode"])("label",{for:"articleIsenable",class:"form-label"},"文章發布",-1),J={class:"from-group py-2"},z=["src","alt"],F={class:"row pt-2"},R={class:"from-group d-flex gap-2"},q=Object(a["createElementVNode"])("label",{class:"form-label"},"文章標籤",-1),G=["onUpdate:modelValue"],H=["onClick","disabled"],K={key:0,class:"spinner-border spinner-border-sm",role:"status","aria-hidden":"true"},Q=Object(a["createTextVNode"])(" 刪除 "),W={class:"row pt-2"},X={class:"from-group"},Y=Object(a["createElementVNode"])("label",{class:"form-label",for:"articleContent"},"文章內容",-1),Z={class:"modal-footer"};function ee(e,t,c,n,l,i){var o,r,s=Object(a["resolveComponent"])("SwitchClick"),d=Object(a["resolveComponent"])("ckeditor");return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",v,[Object(a["createElementVNode"])("div",E,[Object(a["createElementVNode"])("div",k,[Object(a["createElementVNode"])("div",y,[Object(a["createElementVNode"])("h5",w,Object(a["toDisplayString"])(!0===c.isNew?"新增文章":"編輯文章"),1),Object(a["createElementVNode"])("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:t[0]||(t[0]=function(e){return i.closeModal()})})]),Object(a["createElementVNode"])("div",M,[Object(a["createElementVNode"])("div",C,[Object(a["createElementVNode"])("div",x,[A,Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{class:"form-control",type:"text",id:"articleTitle",placeholder:"請輸入文章標題","onUpdate:modelValue":t[1]||(t[1]=function(e){return l.article.title=e})},null,512),[[a["vModelText"],l.article.title]])]),Object(a["createElementVNode"])("div",L,[B,Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{class:"form-control",type:"text",id:"articleDescription",placeholder:"請輸入文章描述","onUpdate:modelValue":t[2]||(t[2]=function(e){return l.article.description=e})},null,512),[[a["vModelText"],l.article.description]])]),Object(a["createElementVNode"])("div",T,[D,Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{class:"form-control",type:"text",id:"articleAuthor",placeholder:"請輸入作者","onUpdate:modelValue":t[3]||(t[3]=function(e){return l.article.author=e})},null,512),[[a["vModelText"],l.article.author]])]),Object(a["createElementVNode"])("div",P,[S,Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{class:"form-control",type:"date",id:"articleDate",placeholder:"請選擇文章日期","onUpdate:modelValue":t[4]||(t[4]=function(e){return l.article.create_at=e})},null,512),[[a["vModelText"],l.article.create_at]])]),Object(a["createElementVNode"])("div",I,[$,Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{class:"form-control",type:"text",id:"articleImg",placeholder:"請輸入圖片網址","onUpdate:modelValue":t[5]||(t[5]=function(e){return l.article.image=e})},null,512),[[a["vModelText"],l.article.image]])]),Object(a["createElementVNode"])("div",_,[U,Object(a["createVNode"])(s,{id:"articleIsenable",info:l.article.id,enabled:!0===l.article.isPublic?1:0,onSendEnable:i.getActive},null,8,["info","enabled","onSendEnable"])]),Object(a["createElementVNode"])("div",J,[Object(a["createElementVNode"])("img",{class:"img-fluid",src:l.article.image,alt:l.article.title},null,8,z)])]),Object(a["createElementVNode"])("div",F,[Object(a["createElementVNode"])("div",R,[q,(Object(a["openBlock"])(!0),Object(a["createElementBlock"])(a["Fragment"],null,Object(a["renderList"])(l.article.tag,(function(e,t){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",{class:"input-group w-15",key:t},[Object(a["withDirectives"])(Object(a["createElementVNode"])("input",{class:"form-control",type:"text","onUpdate:modelValue":function(e){return l.article.tag[t]=e}},null,8,G),[[a["vModelText"],l.article.tag[t]]]),Object(a["createElementVNode"])("button",{class:Object(a["normalizeClass"])(["input-group-text",{buttonDisabledCursor:!0===l.isLoading}]),type:"button",onClick:function(e){return i.deleteTag(t)},disabled:!0===l.isLoading},[!0===l.isLoading?(Object(a["openBlock"])(),Object(a["createElementBlock"])("span",K)):Object(a["createCommentVNode"])("",!0),Q],10,H)])})),128)),(null===(o=l.article.tag)||void 0===o?void 0:o.length)<5?Object(a["withDirectives"])((Object(a["openBlock"])(),Object(a["createElementBlock"])("input",{key:0,class:"input-group w-10",type:"text",placeholder:"請輸入標籤","onUpdate:modelValue":t[6]||(t[6]=function(e){return l.tempTag=e})},null,512)),[[a["vModelText"],l.tempTag]]):Object(a["createCommentVNode"])("",!0),(null===(r=l.article.tag)||void 0===r?void 0:r.length)<5?(Object(a["openBlock"])(),Object(a["createElementBlock"])("button",{key:1,class:"btn btn-outline-primary",type:"button",onClick:t[7]||(t[7]=function(){return i.addTag&&i.addTag.apply(i,arguments)})}," 增加標籤 ")):Object(a["createCommentVNode"])("",!0)])]),Object(a["createElementVNode"])("div",W,[Object(a["createElementVNode"])("div",X,[Y,Object(a["createVNode"])(d,{placeholder:"請輸入文章內容",id:"articleContent",editor:l.editor,config:l.editorConfig,modelValue:l.article.content,"onUpdate:modelValue":t[8]||(t[8]=function(e){return l.article.content=e})},null,8,["editor","config","modelValue"])])])]),Object(a["createElementVNode"])("div",Z,[Object(a["createElementVNode"])("button",{class:"btn btn-secondary",type:"button",onClick:t[9]||(t[9]=function(e){return i.closeModal()})}," 關閉 "),Object(a["createElementVNode"])("button",{class:"btn btn-primary",type:"button",onClick:t[10]||(t[10]=function(){return i.editArticle&&i.editArticle.apply(i,arguments)})}," 確定 ")])])])],512)}c("e9c4"),c("a434"),c("ac1f"),c("1276"),c("accc");var te=c("7c2b"),ce=c.n(te),ae=c("803a"),ne=c("fb3d"),le=c.n(ne),ie={props:["getArticle","isNew"],data:function(){return{bsModal:"",isLoading:!1,article:{tag:[],isPublic:!1},editor:le.a,editorConfig:{toolbar:["heading","bold","italic","|","link"]},tempTag:""}},components:{SwitchClick:ae["a"]},watch:{getArticle:{handler:function(e){this.article=JSON.parse(JSON.stringify(e)),this.article.create_at=this.getTime(this.article.create_at)},deep:!0}},methods:{addTag:function(){""===this.article.tag?(this.article.tag=[],this.article.tag.push(this.tempTag)):this.article.tag.push(this.tempTag),this.tempTag=""},deleteTag:function(e){this.article.tag.splice(e,1)},getTime:function(e){var t=new Date(1e3*e).toISOString().split("T");return t[0]},editArticle:function(){this.$emit("sendArticle",this.article)},getActive:function(e){1===e?this.article.isPublic=!0:0===e&&(this.article.isPublic=!1)},openModal:function(){this.bsModal.show()},closeModal:function(){this.article={title:"",description:"",image:"",tag:"",create_at:null,author:"",isPublic:!1,content:""},this.bsModal.hide()}},mounted:function(){this.bsModal=new ce.a(this.$refs.articleModal)}},oe=c("6b0d"),re=c.n(oe);const se=re()(ie,[["render",ee]]);var de=se,ue=c("1c55"),be=c("be92"),me=c("674f"),pe={data:function(){return{articles:[],tempArticle:{title:"",description:"",image:"",tag:[],create_at:null,author:"",isPublic:!1,content:""},pagination:{},isLoading:!1,isLoadingPage:!1,postId:"",bsModal:"",isNew:!0}},components:{AdminArticleModal:de,PaginationComponent:N["a"]},methods:Object(V["a"])(Object(V["a"])({},Object(be["c"])(me["a"],["addMessage"])),{},{deleteArticle:function(){var e=this,t=confirm("確定刪除文章?");this.isLoading=!0,!0===t?this.$http["delete"]("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("chun-chia","/admin/article/").concat(this.postId)).then((function(t){e.getArticle(),e.addMessage({title:"刪除文章結果",style:"success",content:t.data.message}),e.isLoading=!1}))["catch"]((function(t){console.dir(t.response.data.message),e.addMessage({title:"刪除文章結果",style:"danger",content:t.response.data.message}),e.isLoading=!1})):!1===t&&(this.addMessage({title:"刪除文章結果",style:"success",content:"已取消刪除"}),this.isLoading=!1)},editArticle:function(){this.getArticleContent(),this.openModal()},sendArticle:function(e){var t=this;this.isLoading=!0;var c={data:{title:e.title,description:e.description,image:e.image,tag:e.tag,create_at:Math.floor(new Date(e.create_at)/1e3),author:e.author,isPublic:e.isPublic,content:e.content}};!0===this.isNew?this.$http.post("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("chun-chia","/admin/article"),c).then((function(e){t.getArticle(),t.addMessage({title:"新增文章/編輯結果",style:"success",content:e.data.message}),t.isLoading=!1,t.tempArticle={title:"",description:"",image:"",tag:[],create_at:null,author:"",isPublic:!1,content:""}}))["catch"]((function(e){t.addMessage({title:"新增文章/編輯結果",style:"danger",content:e.response.data.message}),t.isLoading=!1})):!1===this.isNew&&(this.isLoading=!0,this.$http.put("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("chun-chia","/admin/article/").concat(this.postId),c).then((function(e){t.getArticle(),t.closeModal(),t.addMessage({title:"新增文章/編輯結果",style:"success",content:e.data.message}),t.isLoading=!1}))["catch"]((function(e){t.addMessage({title:"新增文章/編輯結果",style:"danger",content:e.response.data.message}),t.isLoading=!1})))},articleStatus:function(e){return!1===e?"不公開":"公開"},showTime:function(e){return Object(ue["a"])(e)},openModal:function(){this.$refs.adminArticleModal.openModal()},closeModal:function(){this.$refs.adminArticleModal.closeModal()},getArticleContent:function(){var e=this;this.isLoading=!0,this.$http.get("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("chun-chia","/admin/article/").concat(this.postId)).then((function(t){e.tempArticle=t.data.article,e.isLoading=!1}))["catch"]((function(t){console.dir(t.response.data.message),e.addMessage({title:"取得文章失敗",style:"danger",content:t.response.data.message}),e.isLoading=!1}))},getArticle:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.isLoadingPage=!0,this.$http.get("".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("chun-chia","/admin/articles?page=").concat(t)).then((function(t){e.articles=t.data.articles,e.pagination=t.data.pagination,e.isLoadingPage=!1}))["catch"]((function(t){console.dir(t.response.data.message),e.addMessage({title:"取得文章列表失敗",style:"danger",content:t.response.data.message}),e.isLoading=!1}))}}),mounted:function(){this.getArticle()}};const he=re()(pe,[["render",f]]);t["default"]=he},"803a":function(e,t,c){"use strict";var a=c("7a23"),n={class:"switch"},l=["id","checked"],i=["for"],o=Object(a["createElementVNode"])("span",{class:"switch-txt",turnOn:"是",turnOff:"否"},null,-1),r=Object(a["createElementVNode"])("span",{class:"switch-Round-btn"},null,-1),s=[o,r];function d(e,t,c,o,r,d){return Object(a["openBlock"])(),Object(a["createElementBlock"])("div",n,[Object(a["createElementVNode"])("input",{class:"switch-checkbox",type:"checkbox",name:"switch-checkbox",id:c.info||"tempID",checked:1===r.active,onClick:t[0]||(t[0]=function(t){d.activeChange(),e.$emit("send-enable",r.active)})},null,8,l),Object(a["createElementVNode"])("label",{class:"switch-label",for:c.info||"tempID"},s,8,i)])}var u={props:["info","enabled"],data:function(){return{active:0}},methods:{activeChange:function(){0===this.active?this.active=1:1===this.active&&(this.active=0)}},watch:{enabled:function(e){this.active=e}},mounted:function(){this.active=this.enabled||0}},b=(c("b665"),c("6b0d")),m=c.n(b);const p=m()(u,[["render",d]]);t["a"]=p},b665:function(e,t,c){"use strict";c("60b0")}}]);
//# sourceMappingURL=chunk-686d898c.ac19d94d.js.map