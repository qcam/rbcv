import Profile from './lib/profile'
import Prism from 'prismjs'
import "./css/app.scss"

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('container').innerHTML = Profile.load()
});


