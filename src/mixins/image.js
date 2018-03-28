export const image = {
  computed: {
    imageHeight:
      function () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            return '150px'
          case 'sm':
            return '200px'
          case 'md':
            return '250px'
          case 'lg':
            return '300px'
          case 'xl':
            return '400px'
        }
      }
  }
}
