
    <template>
        <div v-if="loggedIn">
            <button @click="Logout">Logout</button>
        </div>
        <div v-else>
            <GoogleLogin :callback="callback" prompt auto-login> </GoogleLogin>
        </div>
    </template>

  
<script>
import {decodeCredential,googleLogout} from 'vue3-google-login'
import axios from 'axios';
const apiUrl = 'https://localhost:7080/Authentication/login';

export default{
  data(){
    return {

        loggedIn: localStorage.getItem('JWT-Auth') !== null,
        user:null,

        callback:(response)=>{
            var credential = decodeCredential(response.credential);
            axios.post(apiUrl, { name: credential['name'],guid: credential['sub'] },{
                headers : {'Content-Type': 'application/json'}
            }).then(response => {
                    // Handle the API response
                    this.loggedIn = true;
                    localStorage.setItem('JWT-Auth', response.data["token"] );
                })
                .catch(error => {
                    // Handle errors
                    console.error('Error:', error);
                });
        }
    }
  },
  methods:{
    Logout(){
        googleLogout();
        this.loggedIn = false;
        localStorage.removeItem('JWT-Auth');

    }
  }
}
</script>
  