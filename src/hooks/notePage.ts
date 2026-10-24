import { useEffect, useState } from "react";
import hljs from "highlight.js";

export const useHighlightJs = (shouldRun: boolean = true) => {
  useEffect(() => {
    if (shouldRun) {
      hljs.highlightAll();
    }
  }, [shouldRun]);
};

export const useDynamicScriptsFromNote = (
  javascriptPaths?: string[] | null
) => {
  useEffect(() => {
    const jsClass = "md_link_js";
    const removeExisting = () => {
      const jsClassElement = document.getElementsByClassName(jsClass);
      if (jsClassElement.length > 0) {
        Array.from(jsClassElement).forEach((element) => {
          element.remove();
        });
      }
    };

    removeExisting();

    if (javascriptPaths && javascriptPaths.length > 0) {
      for (const jsPath of javascriptPaths) {
        const id = jsPath.split("/").pop()!.split(".").shift() + "_js";
        if (!document.getElementById(id)) {
          const body = document.getElementsByTagName("body")[0] as HTMLElement;
          const scriptUrl = document.createElement("script");
          scriptUrl.type = "text/javascript";
          scriptUrl.src = jsPath;
          scriptUrl.id = id;
          scriptUrl.className = jsClass;
          scriptUrl.defer = true;
          body.appendChild(scriptUrl);
        }
      }
    }
  }, [javascriptPaths]);
};

// 選択中のプログラミング言語に対応するセクションのみ表示する
export const useProgrammingLanguageContent = (
  language: string,
  content: string
) => {
  useEffect(() => {
    const targetId =
      "note_content_" +
      language.substring(0, 1).toUpperCase() +
      language.substring(1);
    const contents = document.getElementsByClassName(
      "note_content_by_programming_language"
    );
    Array.from(contents).forEach((element) => {
      (element as HTMLElement).style.display =
        element.id === targetId ? "block" : "none";
    });
  }, [language, content]);
};

export const useCodepenEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cpwebassets.codepen.io/assets/embed/ei.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
};

export const useClientOnly = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};
