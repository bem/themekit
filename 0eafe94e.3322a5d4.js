(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{59:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return a})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return p})),r.d(t,"default",(function(){return s}));var n=r(2),o=r(6),i=(r(0),r(91)),a={id:"whitepaper-color",title:"whitepaper/color",sidebar_label:"whitepaper/color"},c={unversionedId:"filters/whitepaper-color",id:"filters/whitepaper-color",isDocsHomePage:!1,title:"whitepaper/color",description:"Filter marks token as color group.",source:"@site/docs/filters/whitepaper-color.mdx",slug:"/filters/whitepaper-color",permalink:"/themekit/docs/filters/whitepaper-color",editUrl:"https://github.com/bem/themekit/edit/master/website/docs/filters/whitepaper-color.mdx",version:"current",sidebar_label:"whitepaper/color",sidebar:"sidebar",previous:{title:"css/whitepaper",permalink:"/themekit/docs/formats/css-whitepaper"},next:{title:"whitepaper/root",permalink:"/themekit/docs/filters/whitepaper-root"}},p=[{value:"Usage",id:"usage",children:[]}],l={rightToc:p};function s(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Filter marks token as color group."),Object(i.b)("h2",{id:"usage"},"Usage"),Object(i.b)("p",null,"Configure tool:"),Object(i.b)("pre",null,Object(i.b)("code",Object(n.a)({parentName:"pre"},{className:"language-json",metastring:'title="themekit.config.json" {13}',title:'"themekit.config.json"',"{13}":!0}),'{\n  "entry": {\n    "default": "./themes/default.theme.json"\n  },\n  "output": {\n    "css": {\n      "transforms": ["name/cti/kebab"],\n      "buildPath": "./themes",\n      "files": [\n        {\n          "destination": "[entry]/color.css",\n          "format": "css/whitepaper",\n          "filter": "whitepaper/color"\n        }\n      ]\n    }\n  }\n}\n')))}s.isMDXComponent=!0},91:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return b}));var n=r(0),o=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=o.a.createContext({}),s=function(e){var t=o.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=s(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,a=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),u=s(r),m=n,b=u["".concat(a,".").concat(m)]||u[m]||f[m]||i;return r?o.a.createElement(b,c(c({ref:t},l),{},{components:r})):o.a.createElement(b,c({ref:t},l))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,a=new Array(i);a[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:n,a[1]=c;for(var l=2;l<i;l++)a[l]=r[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);