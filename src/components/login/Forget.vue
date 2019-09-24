<template>
  <div class="register">
		<Com>
			<div class="contain">
				 <ul>
					 <li>
						 <i class="icon_one"></i><input type="text" placeholder="手机号" v-model="phone"/>
					 </li>
					 <li class="vcode">
						 <div><i class="icon_two"></i></div><input type="text" placeholder="验证码" v-model="code"/><div><Vcode :phone="phone"/></div>
					 </li>
					 <li>
					 	 <i class="icon_two"></i><input type="password" placeholder="新密码" v-model="newPsw"/>
					 </li>
				 </ul>
				 <div class="btn" @click="goConfirm">确认</div>
			</div>
		</Com>
  </div>
</template>

<script>
	import Com from '../public/Com'
	import Vcode from '../public/Vcode'
	import { Toast } from 'mint-ui';
	
export default {
  name: '',
  data () {
    return {
      phone: "",
	  code: "",
	  newPsw: ""
    }
  },
	components: {
		Com,
		Vcode
	},
	methods: {
		goConfirm() {
			if(this.phone == ""){
				Toast({
					message: '手机号不能为空！',
					duration: 1000
				});
			}else if(this.code == ""){
				Toast({
					message: '验证码不能为空！',
					duration: 1000
				});
			}else if(this.newPsw == ""){
				Toast({
					message: '新密码不能为空！',
					duration: 1000
				});
			}else if(!/^[0-9]{6,18}$/.test(this.newPsw)){
				Toast({
					message: '请输入6到18位数字！',
					duration: 1000
				});
			}else{
				this.baseJs.ajaxReq("/question/api/resetPassword",{phone:this.phone,password:this.newPsw,smsCode:this.code},"post","")
				.then(res => {
					// console.log(res)
					if(res.code != 200){
						Toast({
							message: res.sms,
							duration: 1000
						});
					}else{
						Toast({
							message: res.sms,
							duration: 1000
						});
						this.$router.push("/login");
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
	.register .contain{
		margin: 0 1.06rem;
		margin-top: .4rem;
	}
	.register .contain ul li{
		font-size: .3rem;
		border-bottom: 1px solid #f1f1f1;
		padding-bottom: .2rem;
		margin-bottom: .4rem;
	}
	.register .contain ul li i{
		display: inline-block;
		margin-bottom: -.1rem;
	}
	.register .contain ul li .icon_one{
		width: .41rem;
		height: .44rem;
		background: url(../../assets/images/public/icon_01.png) no-repeat left top;
		background-size: 100%;
	}
	.register .contain ul li .icon_two{
		width: .35rem;
		height: .46rem;
		background: url(../../assets/images/public/icon_02.png) no-repeat left top;
		background-size: 100%;
		margin-right: .06rem;
	}
	.register .contain ul li input{
		font-size: .3rem;
		margin-left: .3rem;
	}
	.register .contain ul li.vcode{
		display: flex;
	}
	.register .contain ul li.vcode input{
		width: 2.7rem;
	}
	.register .contain ul li.vcode div{
		display: inline-block;
	}
	.register .contain .btn{
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
</style>
