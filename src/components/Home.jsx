import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <main className="home-page">
      <div className="home-page-container">
        <h1 className="home-page-greet">{t("Greeting")}</h1>
      </div>
    </main>
  );
};

export default Home;
