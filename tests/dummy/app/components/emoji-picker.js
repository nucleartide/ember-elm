
import Ember from 'ember'
import hbs from 'htmlbars-inline-precompile'

export default Ember.Component.extend({
  classNames: 'emoji-picker',

  value: '',
  onChange: undefined,

  layout: hbs`
    <input value={{value}} onkeyup={{action onChange value="target.value"}}>
  `,

  didInsertElement() {
    this.$('input').emojiPicker()
  },

  willDestroyElement() {
    this.$('input').emojiPicker('destroy')
  }
})
