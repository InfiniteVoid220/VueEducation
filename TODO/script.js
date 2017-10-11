var vm = new Vue({
	el:'#lul',
	data:{
		false: false,
		true: true,
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
			status: ""
		},
		editIndex: null
	},
	methods:{
		addTodoItem: function (e) {
			var item = this.convertLinkToData(this.itemTemplate);
			this.todoItems.push(item);
			this.clearTemplate();
		},
		deleteItem: function () {
			this.todoItems.splice(-1,1)
		},
		editItem: function (e) {
			console.log(e.target.hasAttributes("readonly"));
		},
		convertLinkToData: function (obj) {
			var result = {};
			for(key in obj){
				result[key] = obj[key];
			}
			return result;
		},
		clearTemplate: function () {
			this.itemTemplate.task='';
			this.itemTemplate.status='';
		},
		setEditElement:function (index) {
			this.editIndex = index;
		},
		isEditing:function (index) {
			return this.editIndex !== index
		}
	}
});