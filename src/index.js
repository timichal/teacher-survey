//require('bootstrap');
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
let test = () => console.log("test!")

test()

window.onbeforeunload = function() {
    return 'Are you sure you want to navigate away from this page?';
};