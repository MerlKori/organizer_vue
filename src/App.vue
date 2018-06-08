<template>
<div id="app">
	<router-view/>
	<app-background />
</div>
</template>

<script>
import AppBackground from '@/pages/AppBackground'
export default {
	name: 'App',
	components: {AppBackground}
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');
#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
/* reset */
*,
*::before,
*::after {
	box-sizing: border-box;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	-ms-text-size-adjust: 100%;
	-moz-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
}
html, body, div, button, span, h1, h2, h3, h4, h5, h6, p, a,img, ul, li, form, label, article, aside, footer, header, nav, section {
	margin: 0;
	padding: 0;
	border: 0;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
	display: block;
}
h1,h2,h3,h4,h5,h6 {
	font-size: 100%;
	font-weight: normal;
	line-height: 1.2 ;
}
a {text-decoration: none;}
ul {list-style: none;}
img {
	max-width: 100%;
	height: auto;
	border: 0;
}
input,
textarea,
button {
	outline: none;
	font-family: inherit;
	font-size: inherit;
	font-weight: inherit;
}
html {
	line-height: 1.15;
	font-size: 16px
}

body {
	font-family: 'Open Sans', sans-serif;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #212529;
	text-align: left;
	background-color: #fff;
	overflow-x: hidden;
}
/* автозаполнение */
input:-webkit-autofill {
	box-shadow: inset 0 0 0 80px rgba(255,255,255, 1) !important;
	color: #fff !important;
	-webkit-text-fill-color: #fff !important;
}
</style>

<style>
/* ======================  variables ================================ */
:root {
	--noActive-color: rgba(255,255,255, .7);
	--border: 1px solid var(--noActive-color);
	--text-color-whithe: rgba(255,255,255, 1);
	--text-color-dark: rgba(0,0,0, 1);
	--bg-dark: rgba(0, 0, 0, .4);
	--red: #ff3d00;
	--green: #42A645;
	--yellow: #F9C120;

}
</style>

<style>
@media screen and (max-width: 576px) {
	html {font-size: 13px;}
}
</style>
