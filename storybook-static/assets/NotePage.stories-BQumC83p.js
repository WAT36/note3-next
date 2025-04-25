import{j as r}from"./jsx-runtime-PiJMfoGl.js";import{L as u,H as g}from"./Layout-C7V-7Vr-.js";import{C as p}from"./Container-CjeT4Uae.js";import{T as l}from"./constants-BdejMs2_.js";import{P as c}from"./PostHeader-dItP5MUM.js";import{P as d}from"./PostBody-DSBNnwYj.js";import{R as y}from"./ProgrammingLanguage-hXMIcifR.js";import"./jsx-runtime-BFFKb4md.js";import"./index-CGK2Dwi3.js";import"./Footer-wAr7x01j.js";import"./BarLinkGroup-CgsyJPnl.js";import"./link-co_09vmz.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./add-base-path-CPKosFUQ.js";import"./Header-Dmh63Owk.js";import"./index-B4_Evt-t.js";import"./index-D_Ss_HUe.js";import"./index-D63KRqJ_.js";import"./SubHeader-WuKvRGNY.js";import"./BreadCrumb-CAy2KcTn.js";import"./index-BBkCy-B-.js";import"./ProgrammingLanguageSelector-B1-kQSQ3.js";import"./__vite-browser-external-DVYdme3K.js";import"./Avatar-Bnb9-xsK.js";import"./DateFormatter-D75ksp8x.js";import"./CoverImage-CSkMIGCk.js";import"./PostTitle-DvbDXChF.js";import"./markdown-styles.module-BZRQXmSZ.js";import"./index-BmQQ4wML.js";import"./index-Bdewl5Tg.js";const o=({note:e})=>{var n;return r.jsx(u,{canChangeProgrammingLanguage:!0,children:r.jsx(p,{children:r.jsxs("article",{className:"mb-32",children:[r.jsxs(g,{children:[r.jsxs("title",{children:[e.title," | ",l]}),e.ogImage?r.jsx("meta",{property:"og:image",content:e.ogImage.url}):r.jsx(r.Fragment,{}),((n=e.link)==null?void 0:n.css)&&e.link.css.map(m=>r.jsx("link",{rel:"stylesheet",type:"text/css",href:m}))]}),r.jsx(c,{title:e.title,coverImage:e.coverImage,date:e.date,author:e.author}),r.jsx(d,{content:e.content})]})})})};o.__docgenInfo={description:"",methods:[],displayName:"NotePage",props:{note:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  slug: string;
  title: string;
  date: string;
  link?: {
    css?: string[];
    javascript?: string[];
  };
  programming?: string[];
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  isDir?: boolean;
}`,signature:{properties:[{key:"slug",value:{name:"string",required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"date",value:{name:"string",required:!0}},{key:"link",value:{name:"signature",type:"object",raw:`{
  css?: string[];
  javascript?: string[];
}`,signature:{properties:[{key:"css",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"javascript",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}}]},required:!1}},{key:"programming",value:{name:"Array",elements:[{name:"string"}],raw:"string[]",required:!1}},{key:"coverImage",value:{name:"string",required:!0}},{key:"author",value:{name:"signature",type:"object",raw:`{
  name: string;
  picture: string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"picture",value:{name:"string",required:!0}}]},required:!0}},{key:"excerpt",value:{name:"string",required:!0}},{key:"ogImage",value:{name:"signature",type:"object",raw:`{
  url: string;
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}}]},required:!0}},{key:"content",value:{name:"string",required:!0}},{key:"isDir",value:{name:"boolean",required:!1}}]}},description:""}}};const K={title:"Pages/NotePage",component:o,decorators:[e=>r.jsxs(y,{children:[e()," "]})],parameters:{layout:"centered"},tags:["autodocs"]},t={args:{note:{slug:"/",title:"note-title",date:"2000-01-01",coverImage:"",author:{name:"author name",picture:"/blog/authors/WAT.jpg"},excerpt:"excerpt",ogImage:{url:""},content:"content"}}};var a,i,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    note: {
      slug: "/",
      title: "note-title",
      date: "2000-01-01",
      coverImage: "",
      author: {
        name: "author name",
        picture: "/blog/authors/WAT.jpg"
      },
      excerpt: "excerpt",
      ogImage: {
        url: ""
      },
      content: "content"
    }
  }
}`,...(s=(i=t.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const Q=["Main"];export{t as Main,Q as __namedExportsOrder,K as default};
