import Profile from './lib/profile'
import Prism from 'prismjs'
import "./css/app.scss"
import 'file?name=index.html!./index.html'

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('container').innerHTML = Profile.load()
});
