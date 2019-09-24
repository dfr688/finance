<template>
  <div class="simPractice">
   <PracticeDiff :lists="lists" :qid="qid" :subjects="subjects"/>
  </div>
</template>

<script>
	import PracticeDiff from '../public/PracticeDiff'
	
export default {
  name: '',
  data () {
    return {
      listId: "",
	  lists: [],
	  qid:0,
	  subjects:[]
    }
  },
	components: {
		PracticeDiff
	},
	created() {
		this.listId = this.$route.params.id;
		if(this.$route.params.qid != undefined){
			this.qid = this.$route.params.qid;
		}
		if(this.$route.params.subjects != undefined){
			this.subjects = this.$route.params.subjects;
		}
		let token = localStorage.getItem("token");
		this.baseJs.httpReq("/question/api/paper",this.listId,{},"get",token)
		.then(res => {
			// console.log(res);
			this.lists = res.data.questionInfoList;
		})
		.catch(err => {
			console.log(err);
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.simPractice{
		width: 100%;
		height: 100%;
	}
</style>
