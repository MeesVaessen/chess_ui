
    <template>
        <div v-if="loggedIn">
            <button @click="Logout">Logout</button>
        </div>
        <div v-else>
            <GoogleLogin :callback="callback" prompt auto-login id="GoogleLogin"> </GoogleLogin>
        </div>
    </template>

  
<script>
import {decodeCredential,googleLogout} from 'vue3-google-login'
import { postData } from '../services/AuthAPIService';

export default{
     data(){
     return {
        loggedIn: localStorage.getItem('JWT-Auth') !== null,
        callback:async (response)=>{
            try {
                var credential = decodeCredential(response.credential);
                const responseData = await postData("/Authentication/login", { name: credential['name'],guid: credential['sub'] })
                localStorage.setItem('JWT-Auth', responseData["token"] );
                this.loggedIn = true; 

            } catch (error) {
                console.error('Error:', error);
            }
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
  