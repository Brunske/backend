import { NavLink, Outlet } from "react-router-dom";
import "./MainLayout.scss";

export default function HomeLayout() {
  return (
    <div className="page-wrapper">
      <div className="sticky-header-container">
        <header className="top-navigation">
          <div className="container">
            <div className="top-navigation-wrap">
              <NavLink className={"logo-link"} to="/">
                <a className="logo">Žiniukas</a>
              </NavLink>
            </div>
          </div>
        </header>
      </div>
      <div className="main-wrapper">
        <main className="main-content">
          <div className="main-page-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
