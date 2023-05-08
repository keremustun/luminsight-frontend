<script>
import { mapMutations } from 'vuex';
import HB  from '../components/headerbar/HB.vue';

export default {
    data() {
        return {
            account: undefined,
            containers: [],
        };
    },
    created() {
        this.$emitter.on('login', (account) => {
            this.account = account;
            console.log(this.account);
        });
        this.$emitter.on('logout', () => {
            console.log('logging out');
            this.account = undefined;
        });
    },
    methods: {
        ...mapMutations(['setAccessToken']),
    },

    components:{ HB }
}
</script>
  
<template>
   <HB></HB>
   <div class="content-container">
        <div class="section content-title-group">
            <h2 class="title">Welcome to the Azure AD + Storage app with Vue.js</h2>
        </div>
        <div v-if="account">
            <div class="level">
                <div class="level-item title">
                    You are logged in as {{ account.name }}
                </div>
            </div>
        </div>
        <div v-else>You need to authenticate to access your Azure Storage data</div>
    </div>
</template>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}</style>