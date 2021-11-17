<template>
  <div class="container bg-yellow-300 h-screen">
    <div class="bg-blue-700 text-white flex">
      <ul class="flex w-full space-x-1 text-lg my-2 divide-yellow-300 divide-x">
        <li class="px-3"><router-link to="/">Home</router-link></li>
        <li class="px-3"><router-link to="/about">About</router-link></li>
      </ul>
    </div>
    <div class="m-5">
      <router-view></router-view>
    </div>
  </div>
</template>