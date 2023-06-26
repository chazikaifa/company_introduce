import requests
import json
import os

APPID = "wxa58acfffad344004"
APPSECRET = "kzXTZk0HlKGs4XoCf6MBuXXA1v0BCh95HW-UZGEXFeQ"
URL = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=" + APPID + "&corpsecret=" + APPSECRET

SERVER_PATH = "C:/nginx/nginx-1.24.0/html/res/"

res = requests.get(URL).json()

if not os.path.exists(SERVER_PATH + "wechat"):
  os.makedirs(SERVER_PATH + "wechat")

with open(SERVER_PATH + "wechat/token.json", 'w' , encoding="utf8") as f:
  f.write(json.dumps(res,ensure_ascii=False))

exit()
