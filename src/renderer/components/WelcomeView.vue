<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex
        xs2
        v-for="image in images"
        :key="image.id"
        @click="loadImage(image)"
      >
        <v-card flat tile>
          <v-card-media
            :src="image.previewUrl"
            height="200px"
          >
          </v-card-media>
        </v-card>
      </v-flex>
      <v-dialog v-model="dialog" max-height=1080 max-width=1920>
        <v-container v-if="!isLoaded">
          <v-layout row>
            <v-flex xs2 offset-xs5>
              <!--
                <v-progress-circular indeterminate v-bind:size="75" v-bind:width="3" color="grey lighten-4"></v-progress-circular>
              -->
              <v-progress-linear v-bind:indeterminate="true" color="grey lighten-4" height="5"></v-progress-linear>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card flat tile v-if="isLoaded">
          <v-card-media
            :src="currentImage.url"
            height=725
          >
          </v-card-media>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  var Mousetrap = require('mousetrap')
  var fs = require('fs')
  export default {
    name: 'welcome',
    methods: {
      loadImage (image) {
        this.isLoaded = false
        this.dialog = true
        let img = new Image()
        img.src = image.url
        img.addEventListener('load', () => {
          this.currentImage = image
          this.isLoaded = true
        })
      },
      onChangeImage (val) {
        if (this.dialog) {
          let nextImageIndex = (this.currentImage.id + val) < 0
            ? (this.images.length + val) % this.images.length
            : (this.currentImage.id + val) % this.images.length
          this.loadImage(this.images[nextImageIndex])
        }
      },
      loadImages () {
        for (var index = 0; index < 84; index++) {
          this.images.push({
            id: index,
            url: 'https://unsplash.it/1920/1080?image=' + index,
            previewUrl: 'https://unsplash.it/200?image=' + index
          })
        }
      },
      onCloseDialog () {
        this.dialog = false
        this.currentImage = {}
      }
    },
    data: () => ({
      dialog: false,
      currentImage: {},
      images: [],
      isLoaded: false
    }),
    mounted () {
      Mousetrap.bind('left', () => this.onChangeImage(-1), 'keyup')
      Mousetrap.bind('right', () => this.onChangeImage(1), 'keyup')
      Mousetrap.bind('esc', () => this.onCloseDialog(), 'keyup')
      this.loadImages()
      fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
        if (err) throw err
        console.log('Replaced!')
      })
    }
  }
</script>
