class TodoList {
    constructor() {
        this.todos = this.loadTodos();
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        const addBtn = document.getElementById('addBtn');
        const todoInput = document.getElementById('todoInput');
        const clearAllBtn = document.getElementById('clearAllBtn');

        // 添加待办事项
        addBtn.addEventListener('click', () => this.addTodo());
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // 清空所有
        clearAllBtn.addEventListener('click', () => this.clearAll());
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (text === '') {
            alert('请输入待办事项内容！');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.todos.push(todo);
        this.saveTodos();
        this.render();
        
        input.value = '';
        input.focus();
    }

    deleteTodo(id) {
        if (confirm('确定要删除这个待办事项吗？')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveTodos();
            this.render();
        }
    }

    clearAll() {
        if (this.todos.length === 0) {
            alert('当前没有待办事项！');
            return;
        }

        if (confirm('确定要清空所有待办事项吗？此操作不可撤销！')) {
            this.todos = [];
            this.saveTodos();
            this.render();
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        
        if (this.todos.length === 0) {
            todoList.innerHTML = '<div class="empty-state">暂无待办事项，添加一个吧！</div>';
            return;
        }

        todoList.innerHTML = this.todos.map(todo => `
            <li class="todo-item" data-id="${todo.id}">
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <button class="btn-delete" onclick="todoApp.deleteTodo(${todo.id})">
                    删除
                </button>
            </li>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        if (saved) {
            return JSON.parse(saved);
        }
    }
}

// 初始化应用
const todoApp = new TodoList();