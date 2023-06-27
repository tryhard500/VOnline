<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            isReady: false,
            feeds: [],
            postContent: ''
        }
    },

    mounted() {
        this.loadFeeds();
    },

    methods: {
        async loadFeeds() {
            this.isReady = false
            let response = await axios.get('/feed')
            this.feeds = response.data;
            this.isReady = true
        },
        getRelativeDate(date) {
            let day = dayjs(date);
            return day.fromNow();
        },

        async createPost(evt) {
            evt.preventDefault();
            await axios.post('/post/create', {
                content: this.postContent
            });
            this.postContent = '';
            this.loadFeeds();
        },
    }
}
</script>

<template>
    <div class="feeds-page">
        <div v-if="!isReady" class="loader">
            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div v-if="isReady" class="feed-container">
            <form @submit="createPost" class="post-form my-3">
            <textarea v-model="postContent" class="form-control" rows="2" placeholder="Что у вас нового?"></textarea>
            <button type="submit" class="btn btn-primary">
                Отправить
            </button>
        </form>

        <div class="feed-post my-3">
            <div v-for="(item, index) in feeds" class="card mb-3">
                <div class="card-body">
                    <div class="user">
                        <img :src="'src/avatars/' + item.author.avatar">

                        <div class="username">
                            {{ item.author.firstName }} {{ item.author.lastName }}
                        </div>

                        <div class="feed-post-time ms-auto">
                            {{ getRelativeDate(item.createdAt) }}
                        </div>

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
.feeds-page {
    width: 80%;
}

.feed-post-time {
    font-size: 14px;
    color: #6c757d;
}

.user {
    height: 60px;
    display: flex;
    gap: 10px;
    align-items: center;
}

.user img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
    border: 1px solid #6c757d;
}

.user .username {
    font-weight: bold;
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