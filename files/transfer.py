# coding=utf-8
import sys
import os
import json
from openpyxl import load_workbook

def get_value(value):
	if value == None:
		return ""
	return str(value)

path = sys.argv[1]

print("正在读取工作表...")

try:
	wb = load_workbook(path)

except:
	print("读取失败，请检查选取的文件！")
	os.system('pause')

else:
	print("读取成功！")

	general = wb["总体"]
	index = wb["主页"]
	introduce = wb["关于我们"]
	product = wb["产品介绍"]
	contact = wb["联系我们"]

	zh = {"title": {}, "footer": {}, "index":{}, "introduce":{}, "product":{}}
	en = {"title": {}, "footer": {}, "index":{}, "introduce":{}, "product":{}}

	print("读取工作簿[总体]")

	for i in range(1, len(general["A"])):
		keys = general["A" + str(i + 1)].value.split('.')
		rz = zh
		re = en
		for j in range(0, len(keys) - 1):
			if keys[j] not in rz:
				rz[keys[j]] = {}
			if keys[j] not in re:
				re[keys[j]] = {}
			rz = rz[keys[j]]
			re = re[keys[j]]
		rz[keys[-1]] = get_value(general["C" + str(i + 1)].value);
		re[keys[-1]] = get_value(general["D" + str(i + 1)].value);

	print("读取工作簿[联系我们]")

	for i in range(1, len(contact["A"])):
		keys = contact["A" + str(i + 1)].value.split('.')
		rz = zh["contact"]
		re = en["contact"]
		for j in range(0, len(keys) - 1):
			if keys[j] not in rz:
				rz[keys[j]] = {}
			if keys[j] not in re:
				re[keys[j]] = {}
			rz = rz[keys[j]]
			re = re[keys[j]]
		rz[keys[-1]] = get_value(contact["C" + str(i + 1)].value);
		re[keys[-1]] = get_value(contact["D" + str(i + 1)].value);

	zh["index"]["list"] = []
	en["index"]["list"] = []

	print("读取工作簿[主页]")

	for i in range(1,max(len(index["A"]), len(index["B"]), len(index["C"]), len(index["D"]))):
		if index["A" + str(i + 1)].value != "" or index["C" + str(i + 1)].value != "":
			tz = {"text": get_value(index["A" + str(i + 1)].value), "img": get_value(index["C" + str(i + 1)].value)}
			zh["index"]["list"].append(tz)
		if index["B" + str(i + 1)].value != "" or index["D" + str(i + 1)].value != "":
			te = {"text": get_value(index["B" + str(i + 1)].value), "img": get_value(index["D" + str(i + 1)].value)}
			en["index"]["list"].append(te)

	zh["introduce"]["list"] = []
	en["introduce"]["list"] = []

	print("读取工作簿[关于我们]")

	for i in range(1,max(len(introduce["A"]), len(introduce["B"]))):
		if introduce["A" + str(i + 1)].value != "":
			tz = {"type": get_value(introduce["A" + str(i + 1)].value),"title": get_value(introduce["C" + str(i + 1)].value), "img": get_value(introduce["E" + str(i + 1)].value), "text": get_value(introduce["G" + str(i + 1)].value)}
			zh["introduce"]["list"].append(tz)
		if introduce["B" + str(i + 1)].value != "":
			te = {"type": get_value(introduce["B" + str(i + 1)].value),"title": get_value(introduce["D" + str(i + 1)].value), "img": get_value(introduce["F" + str(i + 1)].value), "text": get_value(introduce["H" + str(i + 1)].value)}
			en["introduce"]["list"].append(te)

	zh["product"]["list"] = []
	en["product"]["list"] = []

	print("读取工作簿[产品介绍]")

	for i in range(1,max(len(product["A"]), len(product["B"]))):
		if product["A" + str(i + 1)].value != "":
			tz = {"id": str(i), "name": get_value(product["A" + str(i + 1)].value), "img": get_value(product["C" + str(i + 1)].value), "description": get_value(product["E" + str(i + 1)].value)}
			zh["product"]["list"].append(tz)
		if product["B" + str(i + 1)].value != "":
			te = {"id": str(i), "name": get_value(product["B" + str(i + 1)].value), "img": get_value(product["D" + str(i + 1)].value), "description": get_value(product["F" + str(i + 1)].value)}
			en["product"]["list"].append(te)

	if not os.path.exists("./lang"):
		os.makedirs("./lang")

	with open('./lang/zh.json', 'w' , encoding="utf8") as f:
		f.write(json.dumps(zh,ensure_ascii=False))

	with open('./lang/en.json', 'w', encoding="utf8") as f:
		f.write(json.dumps(en,ensure_ascii=False))

	print("文件转换完成，请检查同目录下的lang文件夹")

	os.system('pause')