export default [
  {
    path: 'add-travis-ci',
    meta: {
      category: 'References',
      type: 'DEPLOY',
      subtitle: "为Github Page集成Travis CI"
    },
    component: () => import('../views/references/deploy/add-travis-ci.md')
  },
	{
    path: 'add-travis-icon',
    meta: {
      category: 'References',
      type: 'DEPLOY',
      subtitle: "给README加上Travis CI集成图标"
    },
    component: () => import('../views/references/deploy/add-travis-icon.md')
  },
	{
    path: 'aliyun-setup-gitlab-base-on-ecs',
    meta: {
      category: 'References',
      type: 'DEPLOY',
      subtitle: "基于ECS搭建GitLab服务"
    },
    component: () => import('../views/references/deploy/aliyun-setup-gitlab-base-on-ecs.md')
  },
	{
    path: 'aliyun-deploy-gitlab-frozen',
    meta: {
      category: 'References',
      type: 'DEPLOY',
      subtitle: "阿里云服务器搭建GItLab以后出现卡顿"
    },
    component: () => import('../views/references/deploy/aliyun-deploy-gitlab-frozen.md')
  },
	{
    path: 'xss-and-csrf',
    meta: {
      category: 'References',
      type: 'SECURITY',
      subtitle: "XSS 和 CSRF"
    },
    component: () => import('../views/references/security/xss-and-csrf.md')
  },
	{
    path: 'api-array',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "重学之JavaScript Array所有API全解密"
    },
    component: () => import('../views/references/javascript/api-array.md')
  },
	{
    path: 'api-object',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "重学之JavaScript 对象所有API解析"
    },
    component: () => import('../views/references/javascript/api-object.md')
  },
	{
    path: 'es6-new-operators',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "ES6新增好用的运算符"
    },
    component: () => import('../views/references/javascript/es6-new-operators.md')
  },
	{
    path: 'apply-and-call',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "模拟实现JS的apply&call方法"
    },
    component: () => import('../views/references/javascript/apply-and-call.md')
  },
	{
    path: 'es6-extend',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "ES6类以及继承的实现原理"
    },
    component: () => import('../views/references/javascript/es6-extend.md')
  },
	{
    path: 'how-to-achieve-symbol',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "模拟实现 Symbol 类型"
    },
    component: () => import('../views/references/javascript/how-to-achieve-symbol.md')
  },
	{
    path: 'html-element-api',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "重学之JavaScript HTML Element 常用API解析"
    },
    component: () => import('../views/references/javascript/html-element-api.md')
  },
	{
    path: 'instanceof-and-typeof',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "instanceof 和 typeof 的实现原理"
    },
    component: () => import('../views/references/javascript/instanceof-and-typeof.md')
  },
	{
    path: 'js-bind',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "模拟实现JS的bind方法"
    },
    component: () => import('../views/references/javascript/js-bind.md')
  },
	{
    path: 'js-event-loop',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "JavaScript 运行机制详解：再谈Event Loop"
    },
    component: () => import('../views/references/javascript/js-event-loop.md')
  },
	{
    path: 'js-iife',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "JavaScript 中闭包的详解"
    },
    component: () => import('../views/references/javascript/js-iife.md')
  },
	{
    path: 'js-memory',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "JavaScript 内存机制"
    },
    component: () => import('../views/references/javascript/js-memory.md')
  },
	{
    path: 'js-new',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "模拟实现JS的new操作符"
    },
    component: () => import('../views/references/javascript/js-new.md')
  },
	{
    path: 'js-float-trap',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "JavaScript 浮点数陷阱及解法"
    },
    component: () => import('../views/references/javascript/js-float-trap.md')
  },
	{
    path: 'js-object-setter-getter',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "关于Object的getter和setter"
    },
    component: () => import('../views/references/javascript/js-object-setter-getter.md')
  },
	{
    path: 'js-prototype',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "JavaScript原型和继承"
    },
    component: () => import('../views/references/javascript/js-prototype.md')
  },
	{
    path: 'js-settimeout',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "setTimeout的一些事儿"
    },
    component: () => import('../views/references/javascript/js-settimeout.md')
  },
	{
    path: 'map-parseint',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "['1', '2', '3'].map(parseInt) 解析"
    },
    component: () => import('../views/references/javascript/map-parseint.md')
  },
	{
    path: 'nine-console',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "九个Console命令，让js调试更简单"
    },
    component: () => import('../views/references/javascript/nine-console.md')
  },
	{
    path: 'promise',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "模拟实现Promise"
    },
    component: () => import('../views/references/javascript/promise.md')
  },
	{
    path: 'static-scope-and-auto-scrope',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "静态作用域与动态作用域"
    },
    component: () => import('../views/references/javascript/static-scope-and-auto-scrope.md')
  },
	{
    path: 'throttle-and-debounce',
    meta: {
      category: 'References',
      type: 'JAVASCRIPT',
      subtitle: "防抖和节流"
    },
    component: () => import('../views/references/javascript/throttle-and-debounce.md')
  }
];