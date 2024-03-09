import AboutList from "../components/about/about-list";
import AboutSection from "../components/about/about-section";
import { Bio } from "../components/bio";
import Container from "../components/ui-elements/container/Container";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { ADMINISTRATOR } from "../lib/constants";

export default function About() {
  return (
    <>
      <Layout>
        <Container>
          <Intro title={"About"} />
          <Bio admin={ADMINISTRATOR} />
          <AboutSection
            title={"HN"}
            description={
              <>
                <p className="text-3xl font-bold">WAT</p>
                <p>
                  昔から使っているHNのWATで通しています。Github等一部のSNSではTatsuroh
                  Wakasugiの名を使っていますが、念のため言うと本名ではありません。どちらも由来は本名のスペルから来ております。
                </p>
                <br />
                <p>
                  本職は某IT企業に勤務しているエンジニアです。現在はフルスタックエンジニアという名で従事していますが、まだまだ修行中です。。個人では資格取得、競技プログラミング(Atcoder,AOJ,Leetcode)、CTF等にも興味があり取り組んでおります。本ブログには日頃の業務及び業務外で得た知見などについてを書き記して行きます。
                </p>
              </>
            }
          />
          <AboutSection
            title={"SNS等"}
            description={
              <>
                <AboutList
                  title={"Twitter"}
                  href={"https://twitter.com/tilliadu"}
                  description={"細々と呟いてます"}
                />
                <AboutList
                  title={"Qiita"}
                  href={"https://qiita.com/T_Wakasugi"}
                  description={
                    "基本このブログに書いているものと内容は同じです。こっちに載せても良さそうな記事があったら載せています"
                  }
                />
                <AboutList
                  title={"GitHub"}
                  href={"https://github.com/WAT36"}
                  description={"このブログもあります"}
                />
                <AboutList
                  title={"AtCoder"}
                  href={"https://atcoder.jp/users/T_Wakasugi"}
                  description={"緑で停滞中。最近伸び悩んでます"}
                />
                <AboutList
                  title={"LeetCode"}
                  href={"https://leetcode.com/t_wakasugi/"}
                  description={"最近やってなし。。"}
                />
                <AboutList
                  title={"LAPRAS"}
                  href={"https://lapras.com/public/S0RAG84"}
                  description={
                    "ポートフォリオ自動作成サービス。色んなSNSからデータを取ってきてくれて面白い"
                  }
                />
              </>
            }
          />
          <AboutSection
            title={"利用経験のある言語・技術"}
            description={
              <>
                <AboutList title={"Java"} />
                <AboutList title={"C"} />
                <AboutList title={"Python"} />
                <AboutList title={"HTML"} />
                <AboutList title={"CSS"} />
                <AboutList title={"Swift"} />
                <AboutList title={"VBA"} />
                <AboutList title={"Shell(bash)"} />
                <AboutList title={"SQL"} />
                <AboutList title={"Javascript"} />
                <AboutList title={"Typescript"} />
              </>
            }
          />
          <AboutSection
            title={"保有資格"}
            description={
              <>
                <AboutList title={"基本情報技術者"} />
                <AboutList title={"応用情報技術者"} />
                <AboutList
                  title={"Oracle Certified Java Programmer, Silver SE 8"}
                />
                <AboutList title={"LPIC Level 1"} />
                <AboutList title={"AWS Cloud Practitioner"} />
                <AboutList title={"AWS Solution Architect Professional"} />
                <AboutList title={"AWS Developer Associate"} />
                <AboutList title={"HTML5プロフェッショナル認定試験 レベル1"} />
                <AboutList title={"TOEIC 720"} />
                <AboutList title={"JSTQB Foundation Level"} />
                <AboutList title={"普通自動車第一種免許"} />
              </>
            }
          />
          <p>
            <br />
            他に何書こうか・・
            <br />
          </p>
        </Container>
      </Layout>
    </>
  );
}
