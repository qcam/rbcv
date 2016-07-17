import Prism from 'prismjs'
import 'prismjs/components/prism-ruby'
import profileString from './profile.rb'
import AutoLinker from 'autolinker'

export default class Profile {
  constructor(attrs = {}) {
    this.name = attrs.name
    this.title = attrs.title
  }

  static load() {
    return AutoLinker.link(Prism.highlight(profileString, Prism.languages.ruby))
  }
}
