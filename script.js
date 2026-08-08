// ========================================
// みんなのお題箱
// ========================================

console.log("お題箱 JavaScript 起動");

// ========================================
// HTML要素
// ========================================

const topicInput = document.getElementById("topicInput");
const charCount = document.getElementById("charCount");
const postButton = document.getElementById("postButton");

const topicList = document.getElementById("topicList");
const emptyMessage = document.getElementById("emptyMessage");

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const toast = document.getElementById("toast");

// ========================================
// HTML要素の確認
// ========================================

console.log("topicInput =", topicInput);
console.log("charCount =", charCount);
console.log("postButton =", postButton);
console.log("topicList =", topicList);

// ========================================
// データ
// ========================================

let topics = [];

// ========================================
// 保存されているデータを読み込む
// ========================================

try {

```
const savedData =
    localStorage.getItem("odaibako_topics");

if (savedData) {

    topics = JSON.parse(savedData);

}
```

} catch (error) {

```
console.error(
    "保存データの読み込みエラー:",
    error
);

topics = [];
```

}

// ========================================
// 文字数カウント
// ========================================

topicInput.addEventListener("input", function () {

```
const length =
    topicInput.value.length;


charCount.textContent =
    length + " / 200";


// 入力があれば投稿ボタンを有効化

if (length > 0) {

    postButton.disabled = false;

} else {

    postButton.disabled = true;

}
```

});

// ========================================
// 投稿ボタン
// ========================================

postButton.addEventListener("click", function () {

```
console.log("投稿ボタンが押されました");


const text =
    topicInput.value.trim();


// 空欄

if (text === "") {

    alert("お題を入力してください。");

    return;

}


// ====================================
// 現在時刻
// ====================================

const now = new Date();


const year =
    now.getFullYear();


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


// ====================================
// ID
// ====================================

let id = 1;


if (topics.length > 0) {

    id =
        Math.max(
            ...topics.map(
                topic => topic.id
            )
        ) + 1;

}


// ====================================
// 新しい投稿
// ====================================

const newTopic = {

    id: id,

    text: text,

    date: date

};


// 一番上に追加

topics.unshift(newTopic);


// ====================================
// ブラウザに保存
// ====================================

try {

    localStorage.setItem(
        "odaibako_topics",
        JSON.stringify(topics)
    );

} catch (error) {

    console.error(
        "保存エラー:",
        error
    );

}


// ====================================
// 入力欄をリセット
// ====================================

topicInput.value = "";

charCount.textContent =
    "0 / 200";

postButton.disabled = true;


// ====================================
// 一覧更新
// ====================================

renderTopics();


// ====================================
// 完了メッセージ
// ====================================

showToast();


console.log(
    "投稿完了:",
    newTopic
);
```

});

// ========================================
// お題一覧を表示
// ========================================

function renderTopics() {

```
// 一覧を空にする

topicList.innerHTML = "";


// ====================================
// 検索
// ====================================

const keyword =
    searchInput.value
        .trim()
        .toLowerCase();


let filteredTopics =
    topics.filter(function (topic) {

        return topic.text
            .toLowerCase()
            .includes(keyword);

    });


// ====================================
// 並び順
// ====================================

if (sortSelect.value === "new") {

    filteredTopics.sort(
        function (a, b) {

            return b.id - a.id;

        }
    );

} else {

    filteredTopics.sort(
        function (a, b) {

            return a.id - b.id;

        }
    );

}


// ====================================
// 投稿がない場合
// ====================================

if (filteredTopics.length === 0) {

    emptyMessage.style.display =
        "block";

    return;

}


emptyMessage.style.display =
    "none";


// ====================================
// 投稿カードを作成
// ====================================

filteredTopics.forEach(function (topic) {


    const card =
        document.createElement("article");

    card.className =
        "topic-card";


    // 番号

    const number =
        document.createElement("div");

    number.className =
        "topic-number";

    number.textContent =
        "TOPIC #" +
        String(topic.id)
            .padStart(3, "0");


    // お題

    const text =
        document.createElement("div");

    text.className =
        "topic-text";

    text.textContent =
        topic.text;


    // 日付

    const date =
        document.createElement("div");

    date.className =
        "topic-date";

    date.textContent =
        "投稿日時：" +
        topic.date;


    // カードに追加

    card.appendChild(number);

    card.appendChild(text);

    card.appendChild(date);


    // 一覧に追加

    topicList.appendChild(card);

});
```

}

// ========================================
// 検索
// ========================================

searchInput.addEventListener(
"input",
function () {

```
    renderTopics();

}
```

);

// ========================================
// 並び替え
// ========================================

sortSelect.addEventListener(
"change",
function () {

```
    renderTopics();

}
```

);

// ========================================
// 投稿完了通知
// ========================================

function showToast() {

```
toast.classList.add("show");


setTimeout(function () {

    toast.classList.remove("show");

}, 2500);
```

}

// ========================================
// 最初の状態
// ========================================

postButton.disabled = true;

renderTopics();

console.log(
"お題箱 JavaScript 正常終了"
);
