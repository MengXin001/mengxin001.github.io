import{d as u,r as k,o as s,c as r,F as g,a as x,b as i,w as l,e as m,t as y,p as L,f as S,g as o,_ as f,h as d,i as p,n as P,u as C,j as R,T}from"./app-xtvO_iNw.js";import{_ as I}from"./SakuraDate.vue_vue_type_script_setup_true_lang-0tb3X7H7.js";import{b as h}from"./route-block-zudrvJp0.js";const B=e=>(L("data-v-a90e523c"),e=e(),S(),e),N={class:"tags"},V=B(()=>o("div",{"i-fa-tag":""},null,-1)),j=u({__name:"SakuraPostTags",props:{tags:{}},setup(e){return(t,c)=>{const a=k("RouterLink");return s(),r("div",N,[(s(!0),r(g,null,x(t.tags,n=>(s(),i(a,{key:n,to:{path:"/tags/",query:{tag:n}},class:"inline-flex items-center"},{default:l(()=>[V,m(" "+y(n),1)]),_:2},1032,["to"]))),128))])}}}),A=f(j,[["__scopeId","data-v-a90e523c"]]),D=e=>(L("data-v-ec602fbf"),e=e(),S(),e),F={key:0,class:"h-auto overflow-hidden h-full <md:rounded-3"},H=["src"],M={class:"m-4 w-100"},q={class:"inline-flex items-center"},z=D(()=>o("div",{"i-fa-clock-o":"",class:"mr-1"},null,-1)),E={class:"title my-2"},G=["innerHTML"],J=u({__name:"SakuraArticleCard",props:{post:{},imagePosition:{type:Boolean}},setup(e){return(t,c)=>{const a=k("RouterLink"),n=I,v=A;return s(),r("article",{class:P(t.imagePosition&&t.post.cover&&"flex-row-reverse"||t.post.cover&&"md:text-right")},[t.post.cover?(s(),r("div",F,[d(a,{to:t.post.path||""},{default:l(()=>[o("img",{class:"object-cover h-210px w-full transition-400",src:t.post.cover,alt:"cover","hover:transform":"scale-120"},null,8,H)]),_:1},8,["to"])])):p("v-if",!0),o("div",M,[o("div",q,[z,m(" 发布于 "),d(n,{date:t.post.date},null,8,["date"])]),d(a,{to:t.post.path||""},{default:l(()=>[o("div",E,y(t.post.title),1),o("div",{innerHTML:t.post.excerpt},null,8,G)]),_:1},8,["to"]),t.post.tags?(s(),i(v,{key:0,tags:t.post.tags},null,8,["tags"])):p("v-if",!0),p(` <div
      v-if="post.excerpt"
      class="prose max-w-none text-gray-500"
      v-html="post.excerpt"
    />
    <div class="space-y-5 xl:col-span-3">
      <div class="text-base leading-6 font-medium">
        <RouterLink class="link" aria-label="read more" :to="post.path || ''">
          Read more →
        </RouterLink>
      </div>
    </div> `)])],2)}}}),K=f(J,[["__scopeId","data-v-ec602fbf"]]),O={class:"max-w-800px m-auto"},Q=o("div",{class:"pt-24px px-20px flex items-center"},[o("div",{class:"i-fa-book mr-1 text-[#333]"}),m(" 文章列表 ")],-1),U=o("hr",null,null,-1),W=u({__name:"SakuraPostList",props:{type:{},posts:{},curPage:{default:1}},setup(e){const t=e,c=C({type:t.type||""}),a=R(()=>t.posts||c.value);return(n,v)=>{const $=K;return s(),r("div",O,[Q,U,(s(!0),r(g,null,x(a.value,(_,b)=>(s(),i(T,{key:_.path,name:"fade"},{default:l(()=>[_?(s(),i($,{key:0,"image-position":b%2===1,post:_},null,8,["image-position","post"])):p("v-if",!0)]),_:2},1024))),128))])}}}),w={};function X(e,t){const c=W;return s(),i(c)}typeof h=="function"&&h(w);const et=f(w,[["render",X]]);export{et as default};
