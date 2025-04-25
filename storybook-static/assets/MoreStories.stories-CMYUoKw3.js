import{j as e}from"./jsx-runtime-PiJMfoGl.js";import{P as p}from"./PostPreview-C9a5qVwg.js";import"./jsx-runtime-BFFKb4md.js";import"./index-CGK2Dwi3.js";import"./Avatar-Bnb9-xsK.js";import"./DateFormatter-D75ksp8x.js";import"./CoverImage-CSkMIGCk.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./link-co_09vmz.js";import"./add-base-path-CPKosFUQ.js";import"./constants-BdejMs2_.js";import"./__vite-browser-external-DVYdme3K.js";const l=({pageNum:t,minPageNum:n,maxPageNum:s})=>{const i=[];for(let r=n;r<=s;r++)i.push(r);return e.jsxs("ul",{className:"flex items-center flex-row justify-center my-2",children:[t!==1&&e.jsx("li",{className:"ml-3",children:e.jsx("a",{className:"flex justify-center items-center flex-wrap w-11 h-11 bg-white border-solid border-2 border-black font-bold transition-all text-black",href:`/posts/?pageNum=${t-1}`,children:e.jsx("span",{children:"<<"})})}),i.map(r=>e.jsx("li",{className:"ml-3",children:t===r?e.jsx("span",{className:"flex justify-center items-center flex-wrap w-11 h-11 border-solid border-2 border-black font-bold transition-all bg-black text-white ",children:r}):e.jsx("a",{className:"flex justify-center items-center flex-wrap w-11 h-11 border-solid border-2 border-black font-bold transition-all bg-white text-black ",href:`/posts/?pageNum=${r}`,children:e.jsx("span",{children:r})})})),t!==s&&e.jsx("li",{className:"ml-3",children:e.jsx("a",{className:"flex justify-center items-center flex-wrap w-11 h-11 bg-white border-solid border-2 border-black font-bold transition-all text-black",href:`/posts/?pageNum=${t+1}`,children:e.jsx("span",{children:">>"})})})]})};l.__docgenInfo={description:"",methods:[],displayName:"Pagination",props:{pageNum:{required:!0,tsType:{name:"number"},description:""},minPageNum:{required:!0,tsType:{name:"number"},description:""},maxPageNum:{required:!0,tsType:{name:"number"},description:""}}};const d=({posts:t,pageNum:n})=>{let s=n-2>0?n-2:1,i=s===1?Math.min(5,Math.ceil(t.length/5)):n+2<Math.ceil(t.length/5)?n+2:Math.ceil(t.length/5);i-s<5&&(s=1);const r=s<=n&&n<=i?n:1;return e.jsxs("section",{children:[e.jsx(l,{pageNum:r,minPageNum:s,maxPageNum:i}),e.jsx("div",{className:"mb-32",children:t.slice((r-1)*5,r*5).map(a=>e.jsx(p,{title:a.title,coverImage:a.coverImage,date:a.date,author:a.author,slug:a.slug,excerpt:a.excerpt},a.slug))}),e.jsx(l,{pageNum:r,minPageNum:s,maxPageNum:i})]})};d.__docgenInfo={description:"",methods:[],displayName:"MoreStories",props:{posts:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
  ogImage: {
    url: string
  }
  content: string
}`,signature:{properties:[{key:"slug",value:{name:"string",required:!0}},{key:"title",value:{name:"string",required:!0}},{key:"date",value:{name:"string",required:!0}},{key:"coverImage",value:{name:"string",required:!0}},{key:"author",value:{name:"signature",type:"object",raw:`{
  name: string;
  picture: string;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"picture",value:{name:"string",required:!0}}]},required:!0}},{key:"excerpt",value:{name:"string",required:!0}},{key:"ogImage",value:{name:"signature",type:"object",raw:`{
  url: string
}`,signature:{properties:[{key:"url",value:{name:"string",required:!0}}]},required:!0}},{key:"content",value:{name:"string",required:!0}}]}}],raw:"Post[]"},description:""},pageNum:{required:!0,tsType:{name:"number"},description:""}}};const M={title:"Molecules/MoreStories",component:d,parameters:{layout:"centered"},tags:["autodocs"]},o={args:{posts:[],pageNum:1}};var u,c,m;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    posts: [],
    pageNum: 1
  }
}`,...(m=(c=o.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const P=["Main"];export{o as Main,P as __namedExportsOrder,M as default};
