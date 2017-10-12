var statusListComponents = {

	template:
	'<select v-model="item.status">'+
	'<option v-for="status in statusList">{{status}}</option>'+
	'</select>',

	props: [
		'item'
	],

	data: function () {
		return {
			statusList: ["To Do", "In progress", "Done" ]
		};
	}
};

var todolistComponet = {

	template:
	'<ul>'+
		'<li v-for="(item, index) in todoItems">'+
			'<status-list :item="item"></status-list>'+
			'<input v-for="value,key in item.textInfo" v-model = "item.textInfo[key]" type = "text"  v-on:click = "setEditElement(index,key)" v-bind:readonly = "isEditing(index,key)"/>'+
			'<button v-on:click = "deleteItem(index)">delete</button>'+
		'</li>'+
	'</ul>',

	props: [
		'todoItems'
	],

	data: function () {
		return {
			editElement:{
				todoItemIndex: null,
				fieldIndex: null
			}
		};
	},

	methods: {
		deleteItem: function (index) {
			this.todoItems.splice(index,1);
		},
		setEditElement: function (index,key) {
			this.editElement.todoItemIndex = index;
			this.editElement.fieldIndex = key;
		},
		isEditing: function (index,key) {
			return !(this.editElement.todoItemIndex === index && this.editElement.fieldIndex === key);
		}
	},
	components:{
		"statusList": statusListComponents
	}

};

var addTodoItemComponent = {

	template:
	'<form action="" v-on:submit.prevent = "addTodoItem">'+
		'<h1>Add new task</h1>'+
		'<label v-for="value, key in itemTemplate.textInfo">'+
			'Task name: <input v-model="itemTemplate.textInfo[key]" type="text" value=""/>'+
		'</label>'+
		'<label>'+
			'Status:'+
			'<status-list :item="itemTemplate"></status-list>'+
		'</label>'+
		'<input type="submit" value="Add"/>'+
	'</form>',

	props: [
		'itemTemplate',
		'todoItems'
	],

	methods:{
		addTodoItem: function () {
			var item = this.convertLinkToData(this.itemTemplate);
			if(this.isUniqueTask(item,this.todoItems)){
				this.pushNewItem(item);
			}
			else console.error("Task with this title already exist!");
		},
		pushNewItem:function (item) {
			this.todoItems.push(item);
			this.clearObject(this.itemTemplate);
		},
		convertLinkToData: function (obj) {
			return JSON.parse(JSON.stringify(obj));
		},
		clearObject: function (obj) {
			for(key in obj){
				if(typeof obj[key] === 'object') {
					this.clearObject(obj[key]);
				}
				obj[key]='';
			}
		},
		isUniqueTask: function (item, items) {
			for(index in items){
				if(item.textInfo.task === items[index].textInfo.task){
					return false;
				}
			}
			return true;
		}
	},
	components:{
		"statusList": statusListComponents
	}
};



var vm = new Vue({
	el:'#todo',

	data:{
		todoItems:[],
		itemTemplate:{
			textInfo:{
				task:"",
				comment:""
			},
			status: ""
		}
	},

	components:{
		"todoList": todolistComponet,
		"statusList": statusListComponents,
		"todoItemForm": addTodoItemComponent
	}
});