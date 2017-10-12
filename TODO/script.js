var todolistComponet = {

	template:
	'<ul>'+
		'<li v-for="(item, index) in todoItems">'+
			'<input v-model="item.task" type="text"  v-on:click = "setEditElement(index)" v-bind:readonly="isEditing(index)"/>'+
			'<span>{{item.status}}</span>'+
			'<span>{{item.priority}}</span>'+
			'<button v-on:click = "deleteItem(index)">delete</button>'+
		'</li>'+
	'</ul>',

	props: [
		'todoItems'
	],

	data: function () {
		return {
			editElement: null
		}
	},

	methods: {
		deleteItem: function (index) {
			this.todoItems.splice(index,1)
		},
		setEditElement:function (index) {
			this.editElement = index
		},
		isEditing:function (index) {
			return this.editElement !== index
		}
	}

};


var vm = new Vue({
	el:'#lul',
	data:{
		todoItems:[
			{
				task:"Test",
				status: "done"
			},
			{
				task:"Test",
				status: "done"
			},
			{
				task:"Test",
				status: "done"
			},
			{
				task:"Test",
				status: "done"
			}
		],
		itemTemplate:{
			task: "",
			status: "",
			priority:""
		}
	},
	components:{
		"todoList": todolistComponet
	},
	methods:{
		addTodoItem: function () {
			var item = this.convertLinkToData(this.itemTemplate);
			this.todoItems.push(item);
			this.clearObject(this.itemTemplate);
		},
		convertLinkToData: function (obj) {
			var result = {};
			for(key in obj){
				result[key] = obj[key];
			}
			return result;
		},
		clearObject: function (obj) {
			for(key in obj){
				obj[key] = '';
			}
		}
	}
});