<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="/">logo</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/products" class="nav-link" aria-current="page" >Products</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/sendInfo" class="nav-link" aria-current="page" >SendInfo</router-link>
        </li>
      </ul>
      <span>前台</span>
    </div>
  </div>
</nav>
    <router-view></router-view>
</template>
