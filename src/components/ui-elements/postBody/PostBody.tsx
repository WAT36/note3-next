import { useEffect, useRef } from "react";
import markdownStyles from "../../markdown-styles.module.css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      // JXG が必要な記事の場合に備えて、存在を確認
      if (typeof (window as any).JXG === "undefined") {
        // 少し待って再試行（最大数は簡易制御）
        setTimeout(run, 30);
        return;
      }

      const scripts = Array.from(container.querySelectorAll("script"));
      for (const oldScript of scripts) {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        if (oldScript.textContent) {
          newScript.textContent = oldScript.textContent;
        }
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [content]);

  return (
    <div className="max-w-2xl mx-auto">
      <div
        ref={containerRef}
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default PostBody;
