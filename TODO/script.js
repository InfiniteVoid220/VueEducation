let statusListComponents = {

	template:
	'<select v-model="selectedValue">'+
		'<option v-for="status in statusList">{{status}}</option>'+
	'</select>',

	props: [
		'valueList'
	],

	data: function () {
		return {
			selectedValue: null
		};
	},
	watch: {
		selectedValue: function(){
			this.$emit('update', this.selectedValue)
		}
	}
};

let todolistComponet = {

	template:
	'<div class="todo-list-wrapper">'+
		'<status-list @update="changeFilter"></status-list>'+
		'<p>{{filter}}</p>'+
		'<ul class="task-list">'+
			'<li v-for="(item, index) in todoItems" v-if="filter == item.status">'+
				'<status-list @update="changeStatus" v-bind:disabled = "isEditing(item)"></status-list>'+
				'<label v-for="value,key, labelIndex in item.textInfo">{{inputLabels[labelIndex]}}<input v-model = "item.textInfo[key]" type = "text" v-bind:readonly = "isEditing(item)"/></label>'+
				'<button  v-on:click = "setEditElement(item)">edit</button>'+
				'<button v-on:click = "deleteItem(index)">delete</button>'+
			'</li>'+
		'</ul>'+
	'</div>',

	props: [
		'todoItems'
	],

	created: function () {
		window.addEventListener("click", this.outZoneClick)
	},

	data: function () {
		return {
			inputLabels:['Task Title','Comment'],
			editElement: null,
			filter: 'Done'
		};
	},

	methods: {
		setEditElement: function (item) {
			this.editElement = !this.editElement? this.editElement: null ;
		},
		isEditing: function (item) {
			return this.editElement !== item;
		},
		deleteItem: function (index) {
			this.todoItems.splice(index,1);
		},
		changeFilter: function (filter) {
			this.filter = filter;
		},
		changeStatus: function (status) {
			this.status = status;
		},
		outZoneClick: function (e) {
			let element = e.target;
			if(!this.checkParentNode(element, 'task-list')) {
				this.editElement = null;
			}
		},
		checkParentNode: function (element, className) {
			let el = element;
			while (el.parentNode) {
				if(el.className === className){
					return true;
				}
				el = el.parentNode
			}
			return false;
		}
	},

	components:{
		"statusList": statusListComponents
	}

};

let addTodoItemComponent = {

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
			let item = this.convertLinkToData(this.itemTemplate);
			if(this.isUniqueTask(item, this.todoItems)){
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

let vm = new Vue({
	el:'#todo',

	data:{
		todoItems:[
			{
				textInfo:{
					task:"Tes1",
					comment:"Coment1"
				},
				status: "Done"
			},
			{
				textInfo:{
					task:"Tes1",
					comment:"Coment1"
				},
				status: "Done"
			},
			{
				textInfo:{
					task:"Tes1",
					comment:"Coment1"
				},
				status: "To Do"
			}
		],
		itemTemplate:{
			textInfo:{
				task:"",
				comment:""
			},
			status: ""
		},
		statusList: ["To Do", "In progress", "Done" ]
	},


	components:{
		"todoList": todolistComponet,
		"statusList": statusListComponents,
		"todoItemForm": addTodoItemComponent
	}
});