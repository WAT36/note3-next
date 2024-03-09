var select = document.querySelector("#programmingLanguageSelector");
var options = document.querySelectorAll("#programmingLanguageSelector option");

if (select) {
  // 初期表示
  var index = select.selectedIndex;
  var selectedLanguage = options[index].value;
  if (selectedLanguage) {
    let content = document.getElementById(
      "note_content_" +
        selectedLanguage.substring(0, 1).toUpperCase() +
        selectedLanguage.substring(1)
    );
    if (content) {
      content.style.display = "block";
    }
  }

  // プルダウン切り替え時の処理
  select.addEventListener("change", function () {
    var index = this.selectedIndex;
    var selectedLanguage = options[index].value;

    //まず全て非表示に
    let all_contents = document.getElementsByClassName(
      "note_content_by_programming_language"
    );
    if (all_contents) {
      for (let content of all_contents) {
        content.style.display = "none";
      }
    }

    //該当箇所のみ表示
    if (selectedLanguage) {
      let content = document.getElementById(
        "note_content_" +
          selectedLanguage.substring(0, 1).toUpperCase() +
          selectedLanguage.substring(1)
      );
      if (content) {
        content.style.display = "block";
      }
    }
  });
}
