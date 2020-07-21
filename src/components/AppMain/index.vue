<template>
    <div class="main"> 
        <app-link v-show="$route.path != '/home' "></app-link>
        <router-view></router-view>
    </div> 
</template>

<script>

import Link from "./Link"

export default {
    components: {
        'app-link': Link,
    }
}
</script>

<style scoped>



</style>