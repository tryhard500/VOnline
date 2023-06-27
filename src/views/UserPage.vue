<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {

            // Данные загружены?
            isReady: false,

            // Данные с сервера
            user: null,
            posts: [],

            // Новый пост
            postContent: ''
        }
    },

    mounted() {
        this.loadData();
    },
    watch: {
        $route() {
            this.loadData();
        }
    },

    methods: {
        async loadData() {
            this.isReady = false;
            await this.loadUser();
            await this.loadPosts();
            this.isReady = true;
        },

        async loadUser() {
            let response;
            if (this.$route.name == 'profile') {
                response = await axios.get('/profile');
            } else {
                response = await axios.get('/user', {
                    params: {
                        username: this.$route.params.username
                    }
                });
            }
            this.user = response.data;
        },

        async loadPosts() {
            let response = await axios.get('/user/posts', {
                params: {
                    id: this.user._id
                }
            });
            this.posts = response.data;
        },

        async createPost(evt) {
            evt.preventDefault();
            await axios.post('/post/create', {
                content: this.postContent
            });
            this.postContent = '';
            this.loadPosts();
        },

        getRelativeDate(date) {
            let day = dayjs(date);
            return day.fromNow();
        }
    }
}
</script>


<template>
    <div class="user-page">
        <div v-if="!isReady" class="loader">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="user-container" v-if="isReady">
            <!-- Карточка пользователя -->
            <div class="user-info">
                <div class="container mb-3">
                    <div class="row g-3">
                        <div class="col-md-4 p-0 card info">
                            <img :src="'/src/avatars/' + user.avatar" class="img-fluid rounded-start">
                        </div>
                        <div class="col-md-8">
                            <div class="card info p-3">
                                <h5 class="card-title">
                                    {{ user.firstName }} {{ user.lastName }}
                                </h5>
                                <p class="card-text text-muted">{{ user.info }}</p>
                                <hr>
                                <p class="card-text m-0">
                                    <span class="text-muted">Телефон:</span>
                                    {{ user.phone }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Стена пользователя -->
            <div class="user-wall">
                <!-- Cоздание нового поста-->
                <form @submit="createPost" class="post-form my-3">
                    <textarea v-model="postContent" class="form-control" rows="2"
                        placeholder="Что у вас нового?"></textarea>
                    <button type="submit" class="btn btn-primary">
                        Отправить
                    </button>
                </form>

                <!-- Посты -->
                <div v-for="(item, index) in posts" class="user-post card mb-3">
                    <div class="card-body">
                        <div class="user-post-time">
                            {{ getRelativeDate(item.createdAt) }}
                        </div>
                        <p class="card-text">
                            {{ item.content }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
.user-page {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: center;
}

.user-page .loader {
    margin-top: 200px;
}

.user-page .info {
    height: 400px;
}

.user-page img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.post-form {
    display: flex;
    gap: 10px;
}

.user-post-time {
    font-size: 14px;
    color: #6c757d;
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid lightgray;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: lightgray transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>