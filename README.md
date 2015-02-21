#AngularJs

##Diretivas

As directivas são marcadores em um elemento DOM (como um atributo, o nome do elemento, comentário ou classe CSS) que informam compilador HTML do AngularJS ($compile) para anexar um comportamento específico para o elemento DOM ou mesmo transformar o elemento DOM e suas filhos.

Angular vem com um conjunto de directivas internas, como `ngBind`, `ngModel` e `ngClass`. Assim como você criar *Controllers* e *Services*, você pode criar suas próprias diretivas para Angular usar.

*O que significa **"compilar"** um template de HTML? Para AngularJS, "compilação" significa anexar listeners de eventos no HTML para torná-lo interativo.*

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

####templateUrl

####priority
####transclude
####scope
####terminal
####require
####controller
####compile
####link
