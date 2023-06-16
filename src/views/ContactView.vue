<template>
  <div class="contact">
  <Title :isMobile="isMobile" img="contact.banner_img" :text="$t('navigator.contact')"></Title>
  <el-card class="contact_detail_container" :mobile="isMobile">
    <div slot="header">
      <span class="contact_title">{{$t('contact.title')}}</span>
      <el-button style="float: right; padding: 8px" type="primary" @click="online_msg" :loading="token_loading">{{$t('contact.online_msg')}}</el-button>
      <el-dialog
        :visible.sync="showDialog"
        :title="$t('contact.online_msg')"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :fullscreen = "isMobile"
        :show-close="!submitting">
        <el-form :model="form">
          <el-form-item :label="$t('contact.form.name')" required>
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item :label="$t('contact.form.email')" required>
            <el-input v-model="form.email"/>
          </el-form-item>
          <el-form-item :label="$t('contact.form.phone')">
            <el-input v-model="form.phone"/>
          </el-form-item>
          <el-form-item :label="$t('contact.form.message')" required>
            <el-input v-model="form.message" type="textarea" :rows="3"/>
          </el-form-item>
          <el-form-item>
            <el-button 
              class="btn_submit" 
              type="primary" 
              style="width: 100%"
              :loading="submitting" 
              @click="onSubmit">
              {{$t('contact.form.submit')}}
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <el-descriptions 
      :column="isMobile?1:2" 
      :size="isMobile?'small':'medium'"
      labelClassName="desciption_label"
      contentClassName="desciption_content">
      <el-descriptions-item :label="$t('contact.address_title')">{{$t('contact.address')}}</el-descriptions-item>
      <el-descriptions-item :label="$t('contact.phone_title')">{{$t('contact.phone')}}</el-descriptions-item>
      <el-descriptions-item :label="$t('contact.email_title')">{{$t('contact.email')}}</el-descriptions-item>
      <el-descriptions-item :label="$t('contact.index_title')">{{$t('contact.index')}}</el-descriptions-item>
      <el-descriptions-item :label="$t('contact.qq_title')">{{$t('contact.qq')}}</el-descriptions-item>
      <el-descriptions-item :label="$t('contact.wechat_title')">{{$t('contact.wechat')}}</el-descriptions-item>
    </el-descriptions>
  </el-card>
  <baidu-map class="bmap" :center="center" :zoom="zoom">
    <bm-marker :position="center" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label :content="$t('contact.company_name')" :offset="{width: -65, height:30}"></bm-label>
    </bm-marker>
  </baidu-map>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'    
import { httpGet } from '@/utils/http'
import { sendMsg } from '@/utils/weixin'

export default {  
  name: 'ContactView',
  props: {
    isMobile: Boolean
  },
  components: {
    Title,
  },
  data() {
    return {
      center: {lng: 113.355226, lat:23.004857},
      zoom: 17,
      showDialog: false,
      form: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      submitting: false,
      token: null,
      token_loading: true,
    }
  },
  created() {
    httpGet('/res/wechat/token.json').then((res) => {
      if(res.data && res.data.errmsg == "ok") {
        this.token = res.data.access_token;
        this.token_loading = false;
      } else {
        console.error("微信token获取失败： " + res.data.errmsg)
      }
    }).catch((err) =>{
      console.error("微信token获取失败：" + err)
    })
  },
  methods:{
    online_msg: function() {
      this.showDialog = true;
    },
    onSubmit: function(e) {
      if(this.form.name === "") {
        this.$message.error(this.$t('contact.form.err_name_empty'))
      } else if(this.form.email === "") {
        this.$message.error(this.$t('contact.form.err_email_empty'))
      } else if(this.form.message === "") {
        this.$message.error(this.$t('contact.form.err_message_empty'))
      } else {
        this.submitting = true;
        this.upload_message();
      }
    },
    form_init: function() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    },
    upload_message: function() {
      let user = this.$t("contact.inform_users")

      //若获取的字符串等于字段名说明该字段有问题
      if(user == "contact.inform_users") {
        console.error("企业微信推送对象获取失败")
        this.$message.error(this.$t('contact.form.submit_fail'))
        return;
      }

      let text = `收到在线留言:<br/>` + 
                 `留言人： ${this.form.name}<br/>` +
                 `电子邮箱： ${this.form.email}<br/>` +
                 `联系电话： ${this.form.phone != "" ? this.form.phone : ""}<br/>` + 
                 `留言内容： ${this.form.message}`;

      sendMsg(this.token, user, text).then((res) => {
        if(res.status == "OK") {
          this.form_init();
          this.showDialog = false;
          this.$message.success(this.$t('contact.form.submit_success'))
        } else {
          this.$message.error(this.$t('contact.form.submit_fail') + res.errMsg)
        }

        this.submitting = false;
      })
    }
  }
}
</script>

<style>
.contact_detail_container {
  width: 90%;
  margin: 24px 5%;
}
.contact_title {
  font-size: 20px;
  font-weight: bold;
}
.desciption_label {
  font-weight: bold;
}
.bmap {
  height: 700px;
  width: 90%;
  margin: 24px 5%;
}
</style>