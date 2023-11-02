import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import qr_decoder from "../function/qr_decoder";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ParsedQR from "../classes/ParsedQR";
import { Person, Coin } from "akar-icons";
import SizedBox from "../Components/SizedBox";
import MyContainer from "../Components/MyContainer";
import MyButton from "../Components/MyButton";
import PageTransition from "../Components/PageTransition";
import AccountPushPage from "../push_pages/AccountPushPage";

interface HeaderProps {
  setIsAccountPageOpen: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ setIsAccountPageOpen }) => {
  return (
    <div className={styles.header}>
      <Person
        strokeWidth={2}
        size={24}
        onClick={() => setIsAccountPageOpen(true)}
      />
    </div>
  );
};

export default function Wrapper() {
  const [isAccountPageOpen, setIsAccountPageOpen] = useState(false);
  return (
    <div
      className={styles.container}
      style={{ position: isAccountPageOpen ? "fixed" : "static" }}
    >
      <HomePage
        isAccountPageOpen={isAccountPageOpen}
        setIsAccountPageOpen={setIsAccountPageOpen}
      />
      {isAccountPageOpen && (
        <AccountPushPage setIsAccountPageOpen={setIsAccountPageOpen} />
      )}
    </div>
  );
}

interface HomePageProps {
  isAccountPageOpen: boolean;
  setIsAccountPageOpen: Dispatch<SetStateAction<boolean>>;
}

const HomePage: React.FC<HomePageProps> = ({
  isAccountPageOpen,
  setIsAccountPageOpen,
}) => {
  const [parsedQR, setParsedQR] = useState(new ParsedQR());
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
    try {
      const base64String = router.query.qr;
      const parsed = qr_decoder(base64String);
      setParsedQR(parsed);
    } catch (error) {
      console.log(error);
    }
  }, [router.query.qr]);

  return (
    <div
      style={{
        pointerEvents: isAccountPageOpen ? "none" : "auto",
      }}
    >
      <SizedBox height={30} />
      <Header setIsAccountPageOpen={setIsAccountPageOpen} />
      <SizedBox height={60} />
      <MyContainer color="yellow">
        <h1 className={styles.title}>1934</h1>
        <p className={styles.description}>points</p>
      </MyContainer>
      <SizedBox height={60} />

      <MyButton
        backgroundColor="purple"
        label="Claim Rewards"
        onClick={() => console.log("clicked")}
        icon={<Coin size={30} strokeWidth={1.5} />}
      ></MyButton>
      <main className={styles.main}>
        <p className={styles.description}>{parsedQR.toString()}</p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};
