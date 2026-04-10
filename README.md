# tw-official-holiday

台灣國定假日 Open Data Mirror，資料來源為[新北市政府開放資料平台](https://data.ntpc.gov.tw/datasets/308dcd75-6434-45bc-a95f-584da4fed251)。

## 資料格式

依年份與月份分檔儲存於 `publish/json/{YYYY}/{MM}.json`，例如：

```
publish/json/
├── 2017/
│   ├── 01.json
│   ├── 02.json
│   └── ...
├── 2018/
│   └── ...
└── 2026/
    └── ...
```

每筆資料結構如下：

```json
{
  "date": "20260404",
  "year": "2026",
  "name": "兒童節及民族掃墓節",
  "isholiday": "是",
  "holidaycategory": "放假之紀念日及節日",
  "description": "全國各機關學校放假一日，兒童節與民族掃墓節同一日，於四月三日補假一日。"
}
```

| 欄位 | 說明 |
|------|------|
| `date` | 日期（YYYYMMDD） |
| `year` | 年份 |
| `name` | 節日名稱（可為 null） |
| `isholiday` | 是否放假（`是`） |
| `holidaycategory` | 分類（放假之紀念日及節日、補假、星期六、星期日、調整放假日等） |
| `description` | 說明（可為 null） |

## 使用方式

需要 Node.js 18+（內建 `fetch`）。

```bash
node fetch.mjs
```

執行後會從 API 抓取所有資料並輸出至 `publish/json/` 目錄。

## 資料來源

- API：`https://data.ntpc.gov.tw/api/datasets/308dcd75-6434-45bc-a95f-584da4fed251/json`
- 資料集頁面：https://data.ntpc.gov.tw/datasets/308dcd75-6434-45bc-a95f-584da4fed251

## License

資料依據[政府資料開放授權條款](https://data.gov.tw/license)提供。
