import { Bio } from "../components/bio";
import Container from "../components/container";
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
          <p>自己紹介</p>
          <h1>HN</h1>
          <p>
            <b>WAT</b>
          </p>
          <p>
            昔から使っているHNのWATで通しています。Github等一部のSNSではTatsuroh
            Wakasugiの名を使っていますが、念のため言うと本名ではありません。どちらも由来は本名のスペルから来ております。
          </p>
          <p>
            本職は某IT企業に勤務しているエンジニアです。現在はフルスタックエンジニアという名で従事していますが、まだまだ修行中です。。個人では資格取得、競技プログラミング(Atcoder,AOJ,Leetcode)、CTF等にも興味があり取り組んでおります。本ブログには日頃の業務及び業務外で得た知見などについてを書き記して行きます。
          </p>
          <h2>SNS等</h2>
          <ul>
            <li>
              <a href="https://twitter.com/tilliadu">Twitter</a>
            </li>
          </ul>
          <p>細々と呟いてます</p>
          <ul>
            <li>
              <a href="https://qiita.com/T_Wakasugi">Qiita</a>
            </li>
          </ul>
          <p>
            基本このブログに書いているものと内容は同じです。こっちに載せても良さそうな記事があったら載せています
          </p>
          <ul>
            <li>
              <a href="https://github.com/WAT36">GitHub</a>
            </li>
          </ul>
          <p>このブログもあります</p>
          <ul>
            <li>
              <a href="https://atcoder.jp/users/T_Wakasugi">AtCoder</a>
            </li>
          </ul>
          <p>緑で停滞中。最近伸び悩んでます</p>
          <ul>
            <li>
              <a href="https://leetcode.com/t_wakasugi/">LeetCode</a>
            </li>
          </ul>
          <p>緑で停滞中。最近伸び悩んでます</p>
          <ul>
            <li>
              <a href="https://lapras.com/public/S0RAG84">LAPRAS</a>
            </li>
          </ul>
          <p>
            ポートフォリオ自動作成サービス。色んなSNSからデータを取ってきてくれて面白い
          </p>

          <h2>利用経験のある言語・技術</h2>
          <ul>
            <li>Java</li>
            <li>C</li>
            <li>Python</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>Swift</li>
            <li>VBA</li>
            <li>Shell(bash)</li>
            <li>SQL</li>
            <li>Javascript</li>
            <li>Typescript</li>
          </ul>

          <h2>保有資格</h2>
          <ul>
            <li>基本情報技術者</li>
            <li>応用情報技術者</li>
            <li>Oracle Certified Java Programmer, Silver SE 8</li>
            <li>LPIC Level 1</li>
            <li>AWS Cloud Practitioner</li>
            <li>AWS Solution Architect Professional</li>
            <li>AWS Developer Associate</li>
            <li>HTML5プロフェッショナル認定試験 レベル1</li>
            <li>TOEIC 720</li>
            <li>普通自動車第一種免許</li>
          </ul>

          <p>他に何書こうか・・</p>
        </Container>
      </Layout>
    </>
  );
}
