<template>
    <div class="slides">
        <h4>We've improved your account!</h4>
        <p>Check out the exciting new features:</p>
        <transition name="fade-slide" mode="out-in">
            <div class="slide" v-if="activeSlide == 1" @touchstart="startDrag()" @touchmove="drag($event, 1)">
                <picture>
                    <img src="https://gabbwireless.com/wp-content/uploads/2022/01/new-account-nav-283x300.png">
                </picture>
                <p>Navigate your new interface with ease.</p>
            </div>
        </transition>
        <transition name="fade-slide" mode="out-in">
            <div class="slide" v-if="activeSlide == 2" @touchstart="startDrag()" @touchmove="drag($event, 2)">
                <picture>
                    <img src="https://gabbwireless.com/wp-content/uploads/2022/01/new-account-billing-283x300.png">
                </picture>
                <p>Manage your bill easier than ever.</p>
            </div>
        </transition>
        <transition name="fade-slide" mode="out-in">
            <div class="slide" v-if="activeSlide == 3" @touchstart="startDrag()" @touchmove="drag($event, 3)">
                <picture>
                    <img src="https://gabbwireless.com/wp-content/uploads/2022/01/new-account-child-account-283x300.png">
                </picture>
                <p>See your kids usage at a glance.</p>
            </div>
        </transition>
        <button class="btn arrow back-btn" @click="changeSlide(previous)"></button>
        <button class="btn arrow next-btn" @click="changeSlide(next)"></button>

        <div class="slide-nav">
            <button class="nav-btn" v-for="slide in slides" :key="slide" :class="{active: slide == activeSlide}" @click="changeSlide(slide)"></button>
        </div>
    </div>    
</template>

<script>
export default {
    name: "WelcomePopup",
    data() {
        return {
            activeSlide: 1,
            next: 2,
            previous: 3,
            slides: [1,2,3],
            prevX: -1,
            startSwipe: false,
        }
    },
    methods: {
        changeSlide(slide) {
            this.activeSlide = slide;
            if(this.activeSlide == 2) {
                this.next = 3;
                this.previous = 1;
            }
            if(this.activeSlide == 3) {
                this.next = 1;
                this.previous = 2;
            }
            if(this.activeSlide == 1) {
                this.next = 2;
                this.previous = 3;
            }
        },
        startDrag() {
            this.startSwipe = true;
        },
        drag(e, slide) {
            var nextSlide = slide+1;
            var prevSlide = slide-1;
            if(slide == 3) {
                nextSlide = 1;
            }
            if(slide == 1) {
                prevSlide = 3;
            }

            if(this.prevX == -1) {
                this.prevX = e.changedTouches[0].pageX;    
                return false;
            }
            // Swipt to Right
            if(this.prevX > e.changedTouches[0].pageX) {
                if(this.startSwipe) {
                    this.changeSlide(nextSlide)
                }
            }
            // Swipt to Left
            else if(this.prevX < e.changedTouches[0].pageX) { // dragged right
                if(this.startSwipe) {
                    this.changeSlide(prevSlide)
                }
            }

            this.prevX = e.changedTouches[0].pageX;
            this.startSwipe = false;
        }
    }
}
</script>

<style lang="less">
    .welcome_modal {
        max-width: 650px !important;
        h4, p {
            text-align: center;
        }
        img {
            pointer-events: none;
            display: table;
            margin: 0 auto;
            max-width: 70%;
        }
        .slides {
            .slide {
                p {
                    margin-top: 5px;
                }
            }
            position: relative;
            overflow: hidden;
            button.arrow {
                background: transparent;
                border: 0;
                padding: 10px;
                position: absolute;
                top: 50%;
                transform: translate(0,-50%);
                text-decoration: none !important;
                cursor: pointer;
                margin: 0 auto;
                height: 60px;
                width: 60px;
                &::after {
                    position: absolute;
                    top: 50%;
                    transform: translate(0,-50%);
                    padding: 0;
                    font-size: 60px;
                    text-decoration: none;
                    line-height: 60px;
                    margin-top: -8px;
                    color: #000000;
                }
                &.back-btn {
                    transform: translate(0,-50%) rotate(180deg);
                    left: 10px;
                }
                &.next-btn {
                    right: 10px;
                }
            }
            .slide-nav {
                display: table;
                margin: 0 auto;
                .nav-btn {
                    border: 1px solid #00B1E3;
                    background: transparent;
                    height: 10px;
                    width: 10px;
                    display: table-cell;
                    margin: 0 5px;
                    padding: 0;
                    outline: none;
                    cursor: pointer;
                    border-radius: 100%;
                    transition: all 0.2s ease-in-out 0s;
                    -moz-transition: all 0.2s ease-in-out 0s;
                    -webkit-transition: all 0.2s ease-in-out 0s;
                    &.active {
                        background: #00B1E3;
                        transition: all 0.2s ease-in-out 0s;
                        -moz-transition: all 0.2s ease-in-out 0s;
                        -webkit-transition: all 0.2s ease-in-out 0s;
                    }
                }
            }
            @media (max-width: 960px) {
                button.arrow {
                    &.back-btn {
                        left: 0px;
                    }
                    &.next-btn {
                        right: 0px;
                    }
                }
            }
        }
        @media (max-width: 960px) {
            h4 {
                max-width: 90%;
                margin: 0 auto;
                margin-top: 20px;
            }
        }
    }
</style>