alert("JavaScriptが動いています！");

// ================================
// お題箱 JavaScript
// ================================

console.log("script.js が読み込まれました");

// -------------------------------
// 初期データ
// -------------------------------

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

// -------------------------------
// 保存データを取得
// -------------------------------

let topics;

try {

```
const saved =
    localStorage.getItem("odaibako_topics");

if (saved) {
    topics = JSON.parse(saved);
} else {
    topics = defaultTopics;
}
```

} catch (error) {

```
console.error(
    "保存データの読み込みに失敗しました",
    error
);

topics = defaultTopics;
```

}

// -------------------------------
// HTML要素を取得
// -------------------------------

const topicInput =
document.getElementById("topicInput");

const postButton =
document.getElementById("postButton");

const charCount =
document.getElementById("charCount");

const topicList =
document.getElementById("topicList");

const emptyMessage =
document.getElementById("emptyMessage");

const searchInput =
document.getElementById("searchInput");

const sortSelect =
document.getElementById("sortSelect");

const toast =
document.getElementById("toast");

// -------------------------------
// HTML要素が取得できたか確認
// -------------------------------

console.log("topicInput:", topicInput);
console.log("postButton:", postButton);
console.log("charCount:", charCount);

// -------------------------------
// 文字数カウント
// -------------------------------

if (topicInput) {

```
topicInput.addEventListener("input", function () {

    const length = topicInput.value.length;

    if (charCount) {
        charCount.textContent =
            `${length} / 200`;
    }

    // 空欄なら投稿ボタンを無効化
    if (postButton) {

        postButton.disabled =
            topicInput.value.trim().length === 0;

    }

});
```

}

// -------------------------------
// 投稿ボタン
// -------------------------------

if (postButton) {

```
postButton.addEventListener("click", function () {

    console.log("投稿ボタンが押されました");


    // 入力内容
    const text =
        topicInput.value.trim();


    // 空欄チェック
    if (!text) {

        alert("お題を入力してください。");

        return;

    }


    // 200文字制限
    if (text.length > 200) {

        alert("お題は200文字以内で入力してください。");

        return;

    }


    // ---------------------------
    // 日付
    // ---------------------------

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


    // ---------------------------
    // ID
    // ---------------------------

    let id = 1;

    if (topics.length > 0) {

        id =
            Math.max(
                ...topics.map(topic => topic.id)
            ) + 1;

    }


    // ---------------------------
    // 新しい投稿
    // ---------------------------

    const newTopic = {

        id: id,

        text: text,

        date: date

    };


    // 先頭に追加

    topics.unshift(newTopic);


    // ---------------------------
    // 保存
    // ---------------------------

    try {

        localStorage.setItem(
            "odaibako_topics",
            JSON.stringify(topics)
        );

        console.log(
            "投稿を保存しました",
            newTopic
        );

    } catch (error) {

        console.error(
            "投稿の保存に失敗しました",
            error
        );

    }


    // ---------------------------
    // 入力欄をリセット
    // ---------------------------

    topicInput.value = "";

    if (charCount) {

        charCount.textContent =
            "0 / 200";

    }

    postButton.disabled = true;


    // ---------------------------
    // 一覧を更新
    // ---------------------------

    renderTopics();


    // ---------------------------
    // 完了メッセージ
    // ---------------------------

    showToast();


    // ---------------------------
    // 投稿一覧へ移動
    // ---------------------------

    setTimeout(function () {

        const topicsSection =
            document.getElementById("topics");

        if (topicsSection) {

            topicsSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    }, 300);

});
```

}

// -------------------------------
// お題一覧を表示
// -------------------------------

function renderTopics() {

```
if (!topicList) {
    return;
}


// 検索文字

let keyword = "";

if (searchInput) {

    keyword =
        searchInput.value
            .trim()
            .toLowerCase();

}


// 検索

let filteredTopics =
    topics.filter(function (topic) {

        return topic.text
            .toLowerCase()
            .includes(keyword);

    });


// ---------------------------
// 並び替え
// ---------------------------

if (sortSelect) {

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

}


// ---------------------------
// 一覧を空にする
// ---------------------------

topicList.innerHTML = "";


// ---------------------------
// 投稿がない場合
// ---------------------------

if (filteredTopics.length === 0) {

    if (emptyMessage) {
        emptyMessage.style.display = "block";
    }

    return;

}


if (emptyMessage) {
    emptyMessage.style.display = "none";
}


// ---------------------------
// 投稿を生成
// ---------------------------

filteredTopics.forEach(function (topic) {

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

    // textContentなので安全に表示される

    text.textContent =
        topic.text;


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

// -------------------------------
// 検索
// -------------------------------

if (searchInput) {

```
searchInput.addEventListener(
    "input",
    renderTopics
);
```

}

// -------------------------------
// 並び替え
// -------------------------------

if (sortSelect) {

```
sortSelect.addEventListener(
    "change",
    renderTopics
);
```

}

// -------------------------------
// 完了通知
// -------------------------------

function showToast() {

```
if (!toast) {
    return;
}


toast.classList.add("show");


setTimeout(function () {

    toast.classList.remove("show");

}, 2500);
```

}

// -------------------------------
// 初期状態
// -------------------------------

if (postButton) {

```
postButton.disabled = true;
```

}

// -------------------------------
// 最初のお題を表示
// -------------------------------

renderTopics();

console.log("お題箱のJavaScriptが正常に起動しました！");
