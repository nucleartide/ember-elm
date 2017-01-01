import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  classNames: 'EmojiPicker',
  value: '',

  init() {
    this._super(...arguments)
    this.onInput = this.onInput.bind(this)
  },

  didInsertElement() {
    this._super(...arguments)
    this.$('input').emojiPicker({
      height: '300px',
      width: '450px'
    })
    console.log(this.$('input').length)
    this.$('#emoji-input').on('keyup', this.onInput)
  },

  willDestroyElement() {
    this._super(...arguments)
    this.$('#emoji-input').off('keyup', this.onInput)
    this.$('input').emojiPicker('destroy')
    this.onInput = null
  },

  onInput() {
    console.log('on input', this.$('#emoji-input').val())
  },

  input() {
    console.log('input')
  },

  actions: {
    updateValue(v) {
      console.log('update value')
      //debugger
      this.set('value', v)
    }
  }
});
