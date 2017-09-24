/**
 * Documentation
 */
(function( $ ) {

    $.MyTodo = function(addNewInput, addNewBtn, todoList){
        this.$addNewInput = $(addNewInput);
        this.$addNewBtn = $(addNewBtn);
        this.$todoList = $(todoList);
        this.initTodo();
    };

    $.MyTodo.prototype = {
        addNewTodo: function(){
            var self = this;
            self.$addNewBtn.on( "click", function() {
                if(self.$addNewInput.val().length == 0)
                {
                    alert('Add a TODO!');
                }
                else
                {
                    var $todoItemWrapper = $('<div class="todo-item"></div>');
                    var $todoItem = $('<span class="todo-item-title">'+self.$addNewInput.val()+'</span>');
                    var $todoDone = $('<button type="button" class="btn btn-success pull-right todo-done">Done</button>');
                    var $todoDelete = $('<button type="button" class="btn btn-danger pull-right todo-delete">Delete</button>');
                    var $todoModify = $('<button type="button" class="btn btn-warning pull-right todo-modify">Modify</button>');
                    self.$todoList.append($todoItemWrapper);
                    $todoItemWrapper.append($todoItem).append($todoDelete).append($todoModify).append($todoDone);
                    self.$addNewInput.val('');
                }

            });

        },
        doneTodo: function(){
            var self = this;
            self.$todoList.on("click",'.todo-done',function(){
                $(this).parent().toggleClass('done');
            });
        },
        deleteTodo: function(){
            var self = this;
            self.$todoList.on("click",'.todo-delete',function(){
                $(this).parent().remove();
            });

        },
        modifyTodo: function(){

            var self = this;
            var $todoItemModifyWrapper = $('<div class="todo-item-modify-wrapper"></div>');
            var $modifyInput = $('<input type="text" class="form-control pull-left modify-input"/>');
            var $modifyBtn = $('<button type="button" class="btn btn-info pull-right todo-action-modify">Ok</button>');
            var $cancelBtn = $('<button type="button" class="btn btn-default pull-right todo-action-cancel">Cancel</button>');

            self.$todoList.on("click",'.todo-modify',function(){

                var $todoItemTitle = $(this).siblings('.todo-item-title').html();
                $(this).parent().append($todoItemModifyWrapper);
                $todoItemModifyWrapper.append($modifyInput).append($cancelBtn).append($modifyBtn);
                $modifyInput.val($todoItemTitle);

            });
        },
        actionModifyTodo: function(){
            var self = this;
            self.$todoList.on("click",'.todo-action-modify',function(){
                var alteredTodo = $(this).siblings('.modify-input').val();

                if(alteredTodo.length == 0)
                {
                    alert('Add a TODO!');
                }
                else
                {
                    $(this).parents('.todo-item').find('.todo-item-title').html(alteredTodo);
                    $(this).parent().remove();
                }
            });
        },
        actionCancelTodo: function(){
            var self = this;
            self.$todoList.on("click",'.todo-action-cancel',function(){
                $(this).parent().remove();
            });
        },
        initTodo: function(){
            this.addNewTodo();
            this.doneTodo();
            this.deleteTodo();
            this.modifyTodo();
            this.actionModifyTodo();
            this.actionCancelTodo();
        }
    };

})( jQuery );