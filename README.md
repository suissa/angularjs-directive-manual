#AngularJs

##Diretivas

As directivas são marcadores em um elemento DOM (como um atributo, o nome do elemento, comentário ou classe CSS) que informam compilador HTML do AngularJS ($compile) para anexar um comportamento específico para o elemento DOM ou mesmo transformar o elemento DOM e suas filhos.

Angular vem com um conjunto de directivas internas, como `ngBind`, `ngModel` e `ngClass`. Assim como você criar *Controllers* e *Services*, você pode criar suas próprias diretivas para Angular usar.

*O que significa "compilar" um template de HTML? Para AngularJS, "compilação" significa anexar listeners de eventos no HTML para torná-lo interativo.*

###Como criar?

Já levando em consideração boas práticas esse é o código para iniciarmos a programação de uma diretiva:

```js
(function () {

  var directive = function () {
    return {

    };
  };

  angular.module('moduleName')
    .directive('directiveName', directive);

}());
```

No código anterior, a função `directive()` registra uma nova directiva em nosso módulo. O primeiro argumento para esta função é o nome da directiva. O segundo argumento é uma função que retorna um objeto de definição da directiva.

O segredo mora no que retornamos nesse objeto e para isso temos uma API para trabalhar com as diretivas.

###API

A API da directiva pode ser um pouco complexa no início, mas com o tempo os conceitos vão se enraizando e começa a ficar um pouco mais fácil, vamos ver do que é composta essa API:

```js
var myModule = angular.module('moduleName'); 
myModule.directive('directiveName', function (injectables) {
  return {
    restrict: 'ACEM',
    template: '<div></div>',
    templateUrl: 'directive.html',
    replace: false,
    priority: 0,
    transclude: false,
    scope: false,
    terminal: false,
    require: false,
    controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        post: function postLink(scope, iElement, iAttrs, controller) { ... }
      }
    },
    link: function postLink(scope, iElement, iAttrs) { ... }
  };
});
```

Ela pode assustar no começo mas nada que meses de estudo não nos ajude, vamos conhecer cada opção, porém começaremos com os mais utilizados.

Para iniciar usaremos esse exemplo simples de diretiva:

```js
(function () {

  var directive = function () {
    return {
      restrict: 'AECM',
      replace: 'true',
      template: '<h3>Hello World!!</h3>'
    };
  };

  angular.module('moduleName')
    .directive('directiveName', directive);

}());
```

####restrict

Para criar seu elemento da diretiva, no template, podemos utilizar 4 formas diferentes:

- A: via atributo
- E: via elemento
- C: via classe
- M: via comentário

##### A

```html
<div hello-world></div>
```

##### E

```html
<hello-world></hello-world>
```

##### C

```html
<div class="hello-world"></div>
```

##### M

```html
<!-- directive:hello-world  -->
```

As mais comumente utilizadas são a `A` e `E` pois as de classe e comentário podem causar confusões em pessoas que não estão acostumadas com AngularJs e na minha opinião pessoal são péssimas para demonstrar que aquele código é uma diretiva.

Exemplo: http://plnkr.co/edit/Wlnul9IGuDnZwOFjJdC3?p=preview

![eu não quero](http://memeblender.com/wp-content/uploads/2012/08/ecce-homo-jesus-painting-meme.jpg)

**Dica:** se você deseja compor um elemento com mais de um comportamento, pode por exemplo agrupar directivas do tipo `A` em um único elemento.


```js
(function () {

  var directiveSuperman = function () {
    return {
      restrict: "A",
      link: function(){
         alert("Superman ao resgate!");
       }
    },
    directiveFlash = function () {
    return {
      restrict: "A",
      link: function(){
         alert("FLASHHHHHHH!");
       }
    };
  angular.module('moduleName')
    .directive('superman', directiveSuperman)
    .directive('flash', directiveFlash);

}());
```

Exemplo: [http://plnkr.co/edit/Wlnul9IGuDnZwOFjJdC3?p=preview](http://plnkr.co/edit/Wlnul9IGuDnZwOFjJdC3?p=preview)

####replace

Usado para especificar se o template gerado irá substituir o elemento HTML em que a directiva está ligado. No caso utilizado uma directiva como `<hello-world> </ hello-world>`, a substituição é definida como `true`. Assim, após a diretiva ser compilada, o template produzido substitui <hello-world> </hello-world>. O resultado final é `<h3> Hello World!!</h3>`. Se você definir `replace` como `false`, o padrão, o template será inserido no elemento em que a directiva é invocado.

O código gerado com `replace: false`:

```html
<hello-world>
  <h3>Hello World!!</h3>
</hello-world>
```

E agora gerado com `replace: true`:

```html
<h3>Hello World!!</h3>
```

Então ele basicamente substitiu o seu elemento da diretiva pelo resultado *compilado* dela. Com o `replace` setado como `true` você necessariamente precisa ter um elemento como raíz agrupando o conteúdo do template.

Exemplo correto:

```html
<div><b>Hello</b> World!</div>
```

Exemplo errado:

```html
<b>Hello</b> World!
```

Exemplo: [http://plnkr.co/edit/0obL6YZJuGjGODh9yRLZ?p=preview](http://plnkr.co/edit/0obL6YZJuGjGODh9yRLZ?p=preview)


####template

Define o conteúdo que deve ser usado pela directiva. Pode incluir HTML, expressões de data-binding e até mesmo outras directivas.

```js
(function () {

  var directive = function () {
    return {
      restrict: 'AECM',
      template: '<h3>Hello World!!</h3>'
    };
  };

  angular.module('moduleName')
    .directive('directiveName', directive);

}());
```

Para usarmos os valores de escopo do *Controller* onde a directiva esta precisamos apenas chamar a variável como no template:

```html
 <div superman flash></div>
```

```js
(function () {

  var directiveSuperman = function () {
    return {
      restrict: "A",
      link: function(){
         alert("Superman ao resgate!");
       }
    };
  },
  directiveFlash = function () {
    return {
      restrict: "A",
      link: function(){
         alert("Superman ao resgate!");
       }
    };
  }

  angular.module('moduleName')
    .directive('superman', directiveSuperman)
    .directive('flash', directiveFlash);

}());
```

Exemplo: [http://plnkr.co/edit/FkC9H2AtUEdMtUtJGDcv?p=preview](http://plnkr.co/edit/FkC9H2AtUEdMtUtJGDcv?p=preview)

Também podemos utilizar outras directivas dentro, como por exemplo o `ng-repeat`:

```js
return {
  restrict: 'AE',
  template: '<ul><li ng-repeat="l in languages">{{ l }}</li></ul>'
  };
```

E no *Controller* precisamos apenas setar o array `languages`:

```js
  $scope.languages = ['javascript', 'php', 'python', 'ruby'];
```

Exemplo: [http://plnkr.co/edit/FkC9H2AtUEdMtUtJGDcv?p=preview](http://plnkr.co/edit/FkC9H2AtUEdMtUtJGDcv?p=preview)

####templateUrl

Fornece o caminho para o template que deve ser utilizado pela directiva. Aqui podemos tanto chamar um HTML como podemos chamar uma rota no servidor que sirva esse template renderizado, comumente utilizado em sistemas [MEAN](http://bemean.com.br/) onde o AngularJs consome uma *view* em Jade renderizada pelo Node.js e servida via Express por uma rota.

```js
return {
  restrict: 'AE',
  templateUrl: 'linguagens.html'
  };
```

Ou acessando um rota no servidor:

```js
return {
  restrict: 'AE',
  templateUrl: '/expose/linguagens'
  };
```

Vamos passar a lógica que estava no nosso `template` para um arquivo HTML:

```html
<!-- linguagens.html -->
<ul><li ng-repeat="l in languages">{{ l }}</li></ul>
```

Ou Jade:
```jade
<!-- linguagens.jade -->
ul
  li(ng-repeat="l in languages"){{ l }}
```

####priority
####transclude
####scope
####terminal
####require
####controller
####compile
####link
