let plang_radio = document.getElementsByClassName("plang_radio");
if (plang_radio !== null && plang_radio !== undefined) {
  for (let radio of plang_radio) {
    radio.addEventListener("change", function () {
      //まず全て非表示に
      let all_contents = document.getElementsByClassName(
        "note_content_by_programming_language"
      );
      if (all_contents !== null && all_contents !== undefined) {
        for (let content of all_contents) {
          content.style.display = "none";
        }
      }

      //該当箇所のみ表示
      let content = document.getElementById("note_content_" + radio.id);
      if (content !== null && content !== undefined) {
        if (radio.checked) {
          content.style.display = "block";
        }
      }
    });
  }
}
