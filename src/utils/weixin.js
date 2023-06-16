import axios from "axios"

const agentId = 1000002
const url = "/wechat/cgi-bin/message/send"

export async function sendMsg(token, user, text) {
  let result = {status:"Fail", errMsg: "Unknown"}
  await axios.post(url + "?access_token=" + token, {
    touser: user,
    msgtype: "text",
    agentid: agentId,
    text: {
      content: text
    },
    safe: 0,
    enable_id_trans: 0,
    enable_duplicate_check: 1,
    duplicate_check_interval: 1800
  })
  .then((res) => {
    if(res.data.errmsg == "ok") {
      result.status = "OK";
      result.errMsg = "No Error"
    } else {
      result.errMsg = result.data.errmsg;
    }
  }).catch((err) => {
    result.errMsg = err
  })
  return result;
}