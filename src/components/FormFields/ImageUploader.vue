<template>
  <div class="upload-example">
    <div class="profile_image image_uploader" v-if="!image" :class="{has_image: this.value}">
        <img :src="this.value" v-if="this.value">
    </div>
    <div class="upload-icon-container">
        <span class="icon-upload"></span>
        <label class="button">
            <input type="file" ref="file" accept="image/*" @change="uploadImage">
            <span>Upload Profile Image</span>
        </label>
    </div>
    <transition name="fade" mode="out-in">
        <div v-if="image" class="image-cropper">
            <Cropper
                class="upload-example-cropper"
                :src="image"
                ref="cropper"
                :stencilComponent="Stencil"
            />

            <div class="button-wrapper">
                <button v-if="image" class="btn center" @click="crop">Save</button>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import Stencil from "../Stencil";
import Pica from "pica";

export default {
    name: "ImageUploader",
    data() {
        return {
            image: '',
            newImage: false,
            Stencil,
            coordinates: {
                width: 0,
                height: 0,
                left: 0,
                top: 0
            },
        };
    },
    props: ['name', 'value'],
    components: { Cropper },
    methods: {
        async crop() {
            const pica = new Pica();
            const maxWidth = 256;
            const maxHeight = 256;

            const { canvas } = this.$refs.cropper.getResult();
            console.log(this.$refs.cropper.getResult());
            const resultCanvas = document.createElement("canvas");

            const ratio = canvas.width / canvas.height;

            if (ratio > 1) {
                resultCanvas.width = Math.min(canvas.width, maxWidth);
                resultCanvas.height = resultCanvas.width / ratio;
            } else {
                resultCanvas.height = Math.min(canvas.height, maxHeight);
                resultCanvas.width = resultCanvas.height * ratio;
            }

            await pica.resize(canvas, resultCanvas, {
                unsharpAmount: 25,
                unsharpRadius: 1,
                unsharpThreshold: 1,
                quality: 3,
            });

            this.image = null;

            this.setProfileImage(resultCanvas.toDataURL("image/jpeg"));

            this.newImage = false;

            this.handleInput(resultCanvas.toDataURL("image/jpeg"));
        },
        uploadImage(event) {
            const input = event.target;

            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.image = e.target.result;
                    this.newImage = true;
                };
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },
        setProfileImage(image) {
            this.value = image;
        },
        handleInput(payload) {
           this.$emit("update-" + this.name, payload);
        }
    }
};
</script>

<style lang="less">
    .upload-example-cropper {
        min-height: 300px;
        height: 300px;
        max-height: 300px;
        width: 100%;
        max-width: 400px;
    }
    .profile-uploader .upload-example-cropper {
        max-width: 300px;
        min-height: 280px;
    }
    .profile-uploader {
        .image-cropper {
            position: absolute;
        }
    }
    .upload-example {
        margin: 1rem auto;
        display: flex;
        align-items: center;
        .image-cropper {
            background: #f5f5f5;
            padding: 40px 0;
            border-radius: 14px;
            padding: 40px 0;
            border-radius: 14px;
            position: fixed;
            left: 0;
            width: 100%;
            z-index: 3;
            top: 0;
            .vue-advanced-cropper__background, .vue-advanced-cropper__foreground {
                background: #f5f5f5;
            }
        }
        .profile_image {
            border-radius: 100px;
            height: 80px;
            width: 80px;
            margin: 10px auto;
            overflow: hidden;
            position: relative;
            img {
                border-radius: 100px;
                border: 0;
                height: 80px;
                width: 80px;
                overflow: hidden;
                position: relative;
            }
            &.has_image {
                overflow: visible;
                position: relative;
                border: none;
            }
        }
        .image_uploader {
            cursor: pointer;
            background-color: rgba(0,0,0,0.24);
            background-image: url(https://gabbwireless.com/wp-content/uploads/2021/12/upload-image-account.png);
            background-size: cover;
            &.has_image {
                margin: 0 auto 0 0;
            }
        }
        .upload-icon-container {
            flex: 1;
            padding-left: 20px;
            span {
                color:#236CD8;
                font-size: 14px;
                font-family: gotham;
                font-weight: 400;
                text-decoration: underline;
            }
        }

        .instructions {
            margin-bottom: 1rem;
        }

        .upload-example-cropper {
            min-height: 300px;
            height: 300px;
            max-height: 300px;
            width: 100%;
            margin: 0 auto;
        }
        .vue-advanced-cropper__image-wrapper {
            display: none;
        }
        .btn {
            margin-top: 40px;
        }

        .button input {
            display: none;
        }
    }
</style>
