<template>
<div>
	<!-- MsgAutorizationError -->
	<msg-autorization-error />
	<div class="authorization">
		<div class="authorization__state-desc">
			<div class="authorization__block">
				<h2 class="authorization__title">Don't have an account?</h2>
				<p class="authorization__text">It's not scary, all you need is to come up with a username and password.</p>
				<button
					@click="toogleState"
					class="authorization__btn">Sign up</button>
			</div>
			<div class="authorization__block">
				<h2 class="authorization__title">Have an account?</h2>
				<p class="authorization__text">Ok, enter and continue.</p>
				<button
					@click="toogleState"
					class="authorization__btn">Login</button>
			</div>
		</div>
		<div
			:class="{'authorization__form--login': !autorizationState, 'authorization__form--registr': autorizationState}"
			class="authorization__form">
			<div
				v-if="!autorizationState"
				:key="1"
				class="form__wrap">
				<h2 class="forms_title">sign up</h2>
				<form class="form__sing-up">
					<div class="form__input-wrap">
						<input
							v-model="registration.login"
							type="text"
							name="login">
						<label :class="{'label-focus': leLabelVisible(registration.login)}">login</label>
						<span class="form__msg-error"></span>
					</div>
					<div class="form__input-wrap">
						<input
							v-model="registration.password"
							type="password"
							name="password">
						<label :class="{'label-focus': leLabelVisible(registration.password)}">password</label>
						<span class="form__msg-error"></span>
					</div>
					<div class="form__btn-wrap">
						<button
							@click.prevent="createUser()"
							class="form__btn">sign up</button>
					</div>
				</form>
			</div>
			<div
				v-else-if="autorizationState"
				:key="2"
				class="form__wrap">
				<h2 class="forms_title">Login</h2>
				<form class="form__login">
					<div class="form__input-wrap">
						<input
							v-model="authorization.login"
							type="text"
							name="login">
						<label :class="{'label-focus': leLabelVisible(authorization.login)}">login</label>
						<span class="form__msg-error"></span>
					</div>
					<div class="form__input-wrap">
						<input
							v-model="authorization.password"
							type="password"
							name="password">
						<label :class="{'label-focus': leLabelVisible(authorization.password)}">password</label>
						<span class="form__msg-error"></span>
					</div>
					<div class="form__btn-wrap">
						<button
							@click.prevent="login()"
							class="form__btn">login</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import {routesList} from '@/router/router'
import {mapState, mapMutations} from 'vuex'
import MsgAutorizationError from '@/components/MsgAutorizationError'
import axios from 'axios'
export default {
	name: 'Authorization',
	components: {MsgAutorizationError},
	data () {
		return {
			routesList,
			autorizationState: true,
			authorization: {
				login: '',
				password: ''
			},
			registration: {
				login: '',
				password: ''
			}
		}
	},
	methods: {
		...mapMutations('accessPoint', ['setKey']),
		...mapMutations('msgError', ['showMsgError']),
		toogleState () {
			this.autorizationState = !this.autorizationState
		},
		leLabelVisible (val) {
			return val !== ''
		},
		createUser () {
			axios.post(`${this.urlServer}registration`, {
				login: this.registration.login,
				password: this.registration.password
			})
				.then((res) => {
					if (res.data !== 'error') {
						this.setKey(res.data)
						this.$router.push(this.routesList.organizer)
					} else {
						this.showMsgError('a user with that name already exists')
					}
				})
				.catch(() => console.log('err'))
		},
		login () {
			axios.post(`${this.urlServer}authentication`, {
				login: this.authorization.login,
				password: this.authorization.password
			})
				.then((res) => {
					if (res.data !== 'error') {
						this.setKey(res.data)
						this.$router.push(this.routesList.organizer)
					} else {
						this.showMsgError('user with this name is not found')
					}
				})
				.catch(() => console.log('err'))
		}
	},
	computed: {
		...mapState(['urlServer'])
	}
}
</script>

<style lang="scss" scoped>
.authorization {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 97%;
	max-width: 1200px;
	background-color: rgba(34, 34, 34, .8);
	border-radius: 4px;
}
// ================== authorization__state-desc ===================================
.authorization__state-desc {
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
}
.authorization__block {
	width: 50%;
	padding: 4.5rem 2.8rem;
}
.authorization__title {
	margin-bottom: 15px;
	font-size: 1.66rem;
	line-height: 1em;
	color: #fff;
}
.authorization__text {
	max-width: 400px;
	font-size: 0.83rem;
	line-height: 1.4em;
	color: #fff;
}
.authorization__btn {
	margin-top: 30px;
	border: 1px solid #ccc;
	border-radius: 3px;
	padding: 10px 30px;
	color: #fff;
	text-transform: uppercase;
	line-height: 1em;
	letter-spacing: 0.2rem;
	background-color: rgba(255, 255, 255, .1);
	cursor: pointer;
	transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

	&:hover {
		background-color: rgba(255, 255, 255, .6);
	}
}
// ==================== forms =======================================
$focus-color: #26a69a;
$deactive-color: rgba(0,0,0, .65);
$focus-transition-timing: .3s;
.authorization__form {
	position: absolute;
	top: 50%;
	left: 30px;
	transform: translate( 0 , -50%);
	padding: 70px 40px;
	width: calc(50% - 30px);
	background-color: #fff;
	box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
	border-radius: 4px;
	overflow: hidden;
}
.authorization__form--login {
	animation: bounceLeft 1s forwards;
}
.authorization__form--registr {
	animation: bounceRight 1s forwards;
}
.form__wrap {
	position: relative;
	transition: all .5s;
	// transform: translateX(-150px);
}
.form__input-wrap {
	position: relative;
	margin: 20px;
	padding: 20px 0;

	label {
		position: absolute;
		left: 10px;
		top: 25%;
		font-size: .9rem;
		text-transform: capitalize;
		color: $deactive-color;
		z-index: -1;
		transition: top $focus-transition-timing, font-size $focus-transition-timing, color $focus-transition-timing;
		cursor: pointer;
	}

	input {
		display: block;
		width: 100%;
		margin-bottom: 10px;
		padding: 5px 10px;
		background-color: rgba(255,255,255, 0);
		font-size: .9rem;
		color: rgba(0,0,0, .9);
		border: none;
		border-bottom: 1px solid $deactive-color;
		transition: border-bottom $focus-transition-timing, box-shadow $focus-transition-timing;
		cursor: pointer;

		&:focus {
			border-bottom: 1px solid $focus-color;
			box-shadow: 0 1px 0 0 $focus-color;

			& + label {
				top: - 10%;
				font-size: .75rem;
				color: $focus-color;
			}
		}
		& + .label-focus {
				top: - 10%;
				font-size: .75rem;
				color: $focus-color;
		}
	}
}
.forms_title {
	margin-bottom: 45px;
	font-size: 1.5rem;
	font-weight: 500;
	line-height: 1em;
	text-transform: uppercase;
	color: #e8716d;
	letter-spacing: 0.1rem;
}
.form__btn-wrap {
	text-align: right;
}
.form__btn {
	background-color: #e8716d;
	border-radius: 3px;
	padding: 10px 35px;
	font-size: 1rem;
	font-weight: 300;
	color: #fff;
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	transition: background-color 0.2s ease-in-out;
	cursor: pointer;

	&:hover {
		background-color: #e14641;
	}
}
/* ================================= Animations ======================================================= */
@keyframes bounceLeft {
  0% {
	transform: translate3d(100%, -50%, 0);
  }
  50% {
	transform: translate3d(-30px, -50%, 0);
  }
  100% {
	transform: translate3d(0, -50%, 0);
  }
}
@keyframes bounceRight {
  0% {
	transform: translate3d(0, -50%, 0);
  }
  50% {
	transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
	transform: translate3d(100%, -50%, 0);
  }
}
</style>
