
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

export default{
  data(){
    return {

        loggedIn:false,
        user:null,

        callback:(response)=>{
            this.loggedIn = true;
            console.log(response);
            var credential = decodeCredential(response.credential);
        }
    }
  },
  methods:{
    Logout(){
        googleLogout();
        this.loggedIn = false;
    }
  }
}
</script>
  