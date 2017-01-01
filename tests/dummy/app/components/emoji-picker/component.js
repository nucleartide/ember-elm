import Ember from 'ember'
import hbs from 'htmlbars-inline-precompile'

export default Ember.Component.extend({
  // https://github.com/wedgies/jquery-emoji-picker/blob/667392f2a32370bcaad31c0780edb7cc6885f4bd/js/jquery.emojipicker.js#L266
  layout: hbs`
  <input value={{value}} onkeyup={{action onChange value="target.value"}}>
  {{log value}}
  `,
  classNames: 'EmojiPicker',
  value: '',
  onChange: null,

  didInsertElement() {
    this._super(...arguments)
    this.$('input').emojiPicker()
  },

  willDestroyElement() {
    this._super(...arguments)
    this.$('input').emojiPicker('destroy')
  }
})
