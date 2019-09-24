<template>
  <div class="login">
   <Com>
		<div class="contain">
			 <ul>
				 <li>
					 <i class="icon_one"></i><input type="text" placeholder="账号" v-model="phone"/>
				 </li>
				 <li>
					 <i class="icon_two"></i><input type="password" placeholder="密码" v-model="psw"/>
				 </li>
			 </ul>
			 <div class="btn" @click="goLogin">确认登录</div>
			 <div class="register_forget">
			 	<router-link to="/register">注册账号</router-link><router-link to="/forget">忘记密码</router-link>
			 </div>
		</div>
	 </Com>
  </div>
</template>

<script>
	import Com from '../public/Com'
	import { Toast } from 'mint-ui';
export default {
  name: '',
  data () {
    return {
      phone: "",
	  psw: ""
    }
  },
	components: {
		Com
	},
	methods: {
		goLogin() {
				  if(this.phone == ""){
					  Toast({
					  	message: '手机号不能为空',
					  	duration: 1000
					  });
				  }else{
				  	this.baseJs.ajaxReq("/question/api/signIn",{phone:this.phone,password:this.psw},'post',"")
				  	.then(res => {
				  		// console.log(res);
				  		if(res.code != 200){
							Toast({
								message: res.sms,
								duration: 1000
							});
				  		}else{
							// 缓存token
							localStorage.setItem("token",res.data);
							// 缓存手机号
							localStorage.setItem("phone",this.phone);
							Toast({
								message: res.sms,
								duration: 1000
							});
				  			this.$router.push("/my");
				  		}
				  	})
				  	.catch(err => {
				  		console.log(err);
				  	})
				  }
		}
	}
}
</script>


<style scoped>
	.login .contain{
		margin: 0 1.06rem;
		margin-top: .4rem;
	}
	.login .contain ul li{
		font-size: .3rem;
		border-bottom: 1px solid #f1f1f1;
		padding-bottom: .2rem;
		margin-bottom: .4rem;
	}
	.login .contain ul li i{
		display: inline-block;
		margin-bottom: -.1rem;
	}
	.login .contain ul li .icon_one{
		width: .41rem;
		height: .44rem;
		background: url(../../assets/images/public/icon_01.png) no-repeat left top;
		background-size: 100%;
	}
	.login .contain ul li .icon_two{
		width: .35rem;
		height: .46rem;
		background: url(../../assets/images/public/icon_02.png) no-repeat left top;
		background-size: 100%;
		margin-right: .06rem;
	}
	.login .contain ul li input{
		font-size: .3rem;
		margin-left: .3rem;
	}
	.login .contain .btn{
		width: 5.6rem;
		height: 1.15rem;
		background: url(../../assets/images/public/btn.png) no-repeat left top;
		background-size: 100%;
		margin: 0 auto;
		font-size: .36rem;
		color: #fff;
		text-align: center;
		line-height: .9rem;
		margin-top: .7rem;
	}
	.login .contain .register_forget{
		display: flex;
		font-size: .24rem;
		margin-top: .6rem;
	}
	.login .contain .register_forget a{
		flex: 1;
		color: #333;
	}
	.login .contain .register_forget a:last-child{
		text-align: right;
	}
</style>
