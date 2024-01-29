import{d as y,o as s,c as o,g as t,i as n,t as p,v as A,l as I,u as N,j as x,r as g,h as i,x as r,b as k,s as V,w as u,e as f,p as B,f as C,_ as w}from"./app-xtvO_iNw.js";import{_ as P}from"./SakuraPageHeader-_HfH-A4G.js";import"./SakuraDate.vue_vue_type_script_setup_true_lang-0tb3X7H7.js";const R={class:"pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200"},L=t("dt",{class:"sr-only"}," Authors ",-1),j={class:"flex justify-center xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-8"},T={class:"flex items-center space-x-2"},D=["src"],E={class:"text-sm font-medium leading-5 whitespace-nowrap"},F=t("dt",{class:"sr-only"}," Name ",-1),H={class:"st-text"},q={key:0,class:"sr-only"},z={key:1},G=["href"],J=y({__name:"StarterAuthor",props:{frontmatter:{}},setup(a){return(e,l)=>(s(),o("dl",R,[L,t("dd",null,[t("ul",j,[t("li",T,[e.frontmatter.gravatar?(s(),o("img",{key:0,src:`https://gravatar.com/avatar/${e.frontmatter.gravatar}`,alt:"author image",class:"w-10 h-10 rounded-full"},null,8,D)):n("v-if",!0),t("dl",E,[F,t("dd",H,p(e.frontmatter.author),1),e.frontmatter.twitter?(s(),o("dt",q," Twitter ")):n("v-if",!0),e.frontmatter.twitter?(s(),o("dd",z,[t("a",{href:`https://twitter.com/${e.frontmatter.twitter}`,target:"_blank",rel:"noopnener noreferrer",class:"link"},p(e.frontmatter.twitter),9,G)])):n("v-if",!0)])])])])]))}}),$=a=>(B("data-v-7a218ea8"),a=a(),C(),a),K={class:"divide-y xl:divide-y-0 divide-gray-200 dark:divide-gray-700 pb-16 mx-8 md:mx-15 lg:mx-60 xl:mx-100",style:{"grid-template-rows":"auto 1fr"}},M={class:"divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2"},O={class:"text-sm font-medium leading-5 divide-y divide-gray-200 dark:divide-gray-700 xl:col-start-1 xl:row-start-2"},Q={key:0,class:"py-8"},U=$(()=>t("h2",{class:"text-xs tracking-wide uppercase text-gray-500"}," Next Article ",-1)),W={class:"link"},X={key:1,class:"py-8"},Y=$(()=>t("h2",{class:"text-xs tracking-wide uppercase text-gray-500"}," Previous Article ",-1)),Z={class:"link"},tt={class:"pt-8"},et=y({__name:"SakuraArticle",setup(a){const e=A(),l=I(),c=N();function v(){return c.value.findIndex(m=>m.path===l.path)}const d=x(()=>c.value[v()-1]),_=x(()=>c.value[v()+1]);return(m,rt)=>{const b=P,S=J,h=g("RouterLink");return s(),o("article",null,[i(b,{title:r(e).title,cover:r(e).cover,author:r(e).author,date:r(e).date},null,8,["title","cover","author","date"]),t("div",K,[r(e).author?(s(),k(S,{key:0,frontmatter:r(e)},null,8,["frontmatter"])):n("v-if",!0),t("div",M,[V(m.$slots,"default",{},void 0,!0)]),t("footer",O,[d.value&&d.value.path?(s(),o("div",Q,[U,t("div",W,[i(h,{to:d.value.path},{default:u(()=>[f(p(d.value.title),1)]),_:1},8,["to"])])])):n("v-if",!0),_.value&&_.value.path?(s(),o("div",X,[Y,t("div",Z,[i(h,{to:_.value.path},{default:u(()=>[f(p(_.value.title),1)]),_:1},8,["to"])])])):n("v-if",!0),t("div",tt,[i(h,{class:"link",to:"/"},{default:u(()=>[f(" ← Back to the blog ")]),_:1})])])])])}}}),st=w(et,[["__scopeId","data-v-7a218ea8"]]),ot={};function at(a,e){const l=g("RouterView"),c=st;return s(),k(c,null,{default:u(()=>[i(l)]),_:1})}const lt=w(ot,[["render",at]]);export{lt as default};
