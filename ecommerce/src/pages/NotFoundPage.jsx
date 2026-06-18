import { Header } from "../components/Header";
import "./NotFoundPage.css";

export function NotFoundPage({ cart }) {
  useEffect(() => {
    document.title = "404";
  }, []);
  return (
    <>
      {/* You can choose whatever title and favicon you want. */}

      {/* Remember to add the <Header> so it looks like it's
      on the same website. */}
      <Header cart={cart} />

      {/* You can style this message however you want. */}
      <div className="not-found-message">Page not found</div>
    </>
  );
}
