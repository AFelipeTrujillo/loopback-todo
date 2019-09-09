angular.module('todo', ['ngResource'])
  .controller('TodoController', function ($resource, $q) {
    var vm = this;
    vm.todos = [];
    vm.count = 0;
    vm.delete = __delete;
    vm.create = __create;

    var Todos = $resource('/api/todos/');
    var TodosCount = $resource('/api/todos/count');
    var Todo = $resource('/api/todos/:id', { id: '@id' });

    Todos.query().$promise.then(function (todos) {
      vm.todos = todos;
    });

    TodosCount.get().$promise.then(function (count) {
      vm.count = count.count;
    });

    function __delete(id) {
      Todo.delete({ id: id })
        .$promise.then(__refresh);;
    }

    function __create(title, description, due_date) {
      Todos.save({
        "title": title,
        "description": description,
        "due_date": due_date
      })
        .$promise.then(__refresh);
    }

    function __refresh() {
      Todos.query().$promise.then(function (todos) {
        vm.todos = todos;
      });
    }
  })
