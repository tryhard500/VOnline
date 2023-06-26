<script>
export default {
    methods: {
        goProfile() {
            this.$router.push({
                name: 'profile'
            }); 
        },
        goFeed() {
            this.$router.push({
                name: 'feed'
            }); 
        },
        goMesenger() {
            this.$router.push({
                name: 'messenger'
            }); 
        },
        goFriends() {
            this.$router.push({
                name: 'friends'
            }); 
        }
    }
}
</script>

<template>
    <div class="container">
        <header class="d-flex flex-wrap justify-content-center py-3">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <img src="../assets/icon.png" width="34" height="34">
                <span class="ms-3 fs-4">VOnline</span>
            </a>

            <ul class="nav nav-pills">
                <li class="nav-item">
                    <a
                        class="nav-link"
                        :class="{
                        'active': $route.name == 'profile'
                        }"
                        @click="goProfile"
                    >
                        Профиль
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        :class="{
                        'active': $route.name == 'feed'
                        }"
                        @click="goFeed"
                    >
                        Новости
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        :class="{
                        'active': $route.name == 'messenger'
                        }"
                        @click="goMesenger"
                    >
                        Месенджер
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        :class="{
                        'active': $route.name == 'friends'
                        }"
                        @click="goFriends"
                    >
                        Друзья
                    </a>
                </li>
            </ul>
        </header>
    </div>
</template>

<style scoped>
.container {
    background-color: #e4e4e4;
    margin-bottom: 20px;
    box-shadow: 0 0 10px 5px #e4e4e4;
}

.container li {
    cursor: pointer;
}

header {
    border-bottom: 1px solid;
    border-color: rgba(110, 107, 107, 0.46);
    width: 80%;
    margin: 0 auto;
    margin-bottom: 10px;
}

.title {
    font-size: 30px;
    font-weight: 400;
}
</style>