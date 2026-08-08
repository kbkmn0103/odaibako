/* =========================
お題箱 JavaScript
========================= */

/* -------------------------
初期データ
------------------------- */

const defaultTopics = [
{
id: 3,
text: "最近ハマっていることを教えて！",
date: "2026/08/08 20:30"
},
{
id: 2,
text: "今一番行ってみたい場所は？",
date: "2026/08/08 18:10"
},
{
id: 1,
text: "最近買ってよかったものは？",
date: "2026/08/07 21:00"
}
];

/* -------------------------
データ取得
------------------------- */

let topics = JSON.parse(
localStorage.getItem("odaibako_topics")
) || defaultTopics;

/* -------------------------
DOM取得
------------------------- */

const topicInput = document.getElementById("topicInput");
const postButton = document.getElementById("postButton");
const charCount = document.getElementById("charCount");

const topicList = document.getElementById("topicList");
const emptyMessage = document.getElementById("emptyMessage");

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const toast = document.getElementById("toast");

/* -------------------------
文字数カウント
------------------------- */

topicInput.addEventListener("input", () => {

```
const length = topicInput.value.length;

charCount.textContent = `${length} / 200`;

postButton.disabled =
    topicInput.value.trim().length === 0;
```

});

/* -------------------------
投稿
------------------------- */

postButton.addEventListener("click", () => {

```
const text = topicInput.value.trim();

if (!text) {
    return;
}


/* 現在時刻 */

const now = new Date();

const year = now.getFullYear();

const month =
    String(now.getMonth() + 1)
        .padStart(2, "0");

const day =
    String(now.getDate())
        .padStart(2, "0");

const hour =
    String(now.getHours())
        .padStart(2, "0");

const minute =
    String(now.getMinutes())
        .padStart(2, "0");


const date =
    `${year}/${month}/${day} ${hour}:${minute}`;


/* ID */

const id =
    topics.length > 0
        ? Math.max(...topics.map(topic => topic.id)) + 1
        : 1;


/* 新しいお題 */

const newTopic = {
    id: id,
    text: text,
    date: date
};


topics.unshift(newTopic);


/* 保存 */

localStorage.setItem(
    "odaibako_topics",
    JSON.stringify(topics)
);


/* フォームをリセット */

topicInput.value = "";

charCount.textContent = "0 / 200";

postButton.disabled = true;


/* 表示更新 */

renderTopics();


/* 完了通知 */

showToast();


/* 投稿一覧へスクロール */

setTimeout(() => {

    document
        .getElementById("topics")
        .scrollIntoView({
            behavior: "smooth"
        });

}, 300);
```

});

/* -------------------------
お題表示
------------------------- */

function renderTopics() {

```
const keyword =
    searchInput.value
        .trim()
        .toLowerCase();


let filteredTopics =
    topics.filter(topic => {

        return topic.text
            .toLowerCase()
            .includes(keyword);

    });


/* 並び順 */

if (sortSelect.value === "new") {

    filteredTopics.sort(
        (a, b) => b.id - a.id
    );

} else {

    filteredTopics.sort(
        (a, b) => a.id - b.id
    );

}


topicList.innerHTML = "";


/* お題がない場合 */

if (filteredTopics.length === 0) {

    emptyMessage.style.display = "block";

    return;

}


emptyMessage.style.display = "none";


/* お題生成 */

filteredTopics.forEach(topic => {

    const card =
        document.createElement("article");

    card.className = "topic-card";


    const number =
        document.createElement("div");

    number.className = "topic-number";

    number.textContent =
        `TOPIC #${String(topic.id).padStart(3, "0")}`;


    const text =
        document.createElement("div");

    text.className = "topic-text";

    /*
     * innerHTMLではなくtextContentを使用。
     * ユーザーがHTMLを書いても
     * HTMLとして実行されないようにする。
     */

    text.textContent = topic.text;


    const date =
        document.createElement("div");

    date.className = "topic-date";

    date.textContent =
        `投稿日時：${topic.date}`;


    card.appendChild(number);
    card.appendChild(text);
    card.appendChild(date);


    topicList.appendChild(card);

});
```

}

/* -------------------------
検索
------------------------- */

searchInput.addEventListener(
"input",
renderTopics
);

/* -------------------------
並び替え
------------------------- */

sortSelect.addEventListener(
"change",
renderTopics
);

/* -------------------------
トースト通知
------------------------- */

function showToast() {

```
toast.classList.add("show");


setTimeout(() => {

    toast.classList.remove("show");

}, 2500);
```

}

/* -------------------------
初期表示
------------------------- */

postButton.disabled = true;

renderTopics();
